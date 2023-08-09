import React, { useCallback, useEffect, useRef, useState } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';

import { setupHotKeys } from '../../common/utils/hotKeys';
import { getFrame, loadImage } from '../../common/utils/helpers';
import styles from './VideoPlayer.module.scss';

import 'shaka-player/dist/controls.css';

type Props = {
  videoUrl: string;
};

const VideoPlayer: React.FC<Props> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const timeLineRef = useRef<HTMLDivElement>(null);
  const [hoveredTime, setHoveredTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [canvasX, setCanvasX] = useState(0);
  const [frameImage, setFrameImage] = useState<HTMLImageElement | null>(null);
  const [cursorX, setCursorX] = useState(0);

  const initPlayer = useCallback(async () => {
    try {
      await shaka.polyfill.installAll();
      const localPlayer = new shaka.Player(videoRef.current);

      const ui = new shaka.ui.Overlay(
        localPlayer,
        videoContainerRef.current as HTMLElement,
        videoRef.current as HTMLMediaElement
      );

      const controls = ui.getControls();

      const player = controls?.getPlayer();
      const video = controls?.getVideo();

      controls?.setEnabledShakaControls(false);

      const overflowMenuButtons = [
        'play_pause',
        'quality',
        'language',
        'captions',
        'picture_in_picture',
        'playback_rate',
        'airplay',
      ];

      ui.configure({
        controls: true,
        overflowMenuButtons: overflowMenuButtons,
        seekBarColors: {
          base: 'rgba(255, 255, 255, 0.3)',
          buffered: 'rgba(255, 255, 255, 0.54)',
          played: 'rgb(255, 0, 0)',
        },
      });

      await player?.load(videoUrl);
      setupHotKeys(videoRef.current);
    } catch (error) {
      console.error('error', error);
    }
  }, [videoUrl]);

  useEffect(() => {
    document.addEventListener('shaka-ui-loaded', initPlayer);
  }, [initPlayer]);

  useEffect(() => {
    if (frameImage) {
      const ctx = previewRef.current?.getContext('2d');
      if (ctx) {
        const canvasWidth = 200;
        const canvasHeight = 100;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);

        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.fillText(timeFormat(hoveredTime), 5, canvasHeight - 5);

        if (frameImage && canvasX >= 0 && canvasX <= canvasWidth) {
          const frameWidth = frameImage.width;
          const frameHeight = frameImage.height;

          const sourceX =
            canvasX < frameWidth / 2 ? 0 : canvasX - frameWidth / 2;
          const sourceY = 0;
          const sourceWidth = Math.min(frameWidth, canvasWidth - canvasX);
          const sourceHeight = frameHeight;

          const destX = canvasX < frameWidth / 2 ? frameWidth / 2 - canvasX : 0;
          const destY = 0;

          ctx.drawImage(
            frameImage,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            destX,
            destY,
            sourceWidth,
            sourceHeight
          );
        }
      }
    }
  }, [frameImage, hoveredTime, canvasX]);

  const timeFormat = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleTimelineMouseMove = async (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (timeLineRef.current && videoRef.current) {
      const timeLineRect = timeLineRef.current.getBoundingClientRect();
      const offsetX = event.clientX - timeLineRect.left;
      setCursorX(offsetX);

      const videoDuration = videoRef.current.duration || 0;
      const time = videoDuration * (offsetX / timeLineRect.width);
      setHoveredTime(time);
      setIsHovering(true);

      const frame = await getFrame(time); // TODO: get frame

      if (frame) {
        const frameImage = await loadImage(frame.url);
        console.log(frame.url);
        setFrameImage(frameImage);
        const canvasWidth = 100;
        const canvasX = offsetX - canvasWidth / 2;
        setCanvasX(canvasX);
      }
    }
  };

  const handleTimelineMouseLeave = () => {
    setIsHovering(false);
  };

  const previewContainerStyle = {
    display: isHovering ? 'flex' : 'none',
    left: `${cursorX - 65}px`,
    bottom: '30px',
  };

  const handleVideoInteraction = () => {
    const videoElement = videoRef.current;

    if (videoElement?.paused) {
      videoElement.play();
    } else {
      videoElement?.pause();
    }
  };

  return (
    <div className={styles.videoContainer} ref={videoContainerRef}>
      <div className={styles.previewСontainer} style={previewContainerStyle}>
        <canvas
          ref={previewRef}
          width={100}
          height={50}
          className={styles.canvas}
        />
        <span className={styles.previewTime}>{timeFormat(hoveredTime)}</span>
      </div>
      <div className={styles.videoControls}>
        <video
          ref={videoRef}
          autoPlay={true}
          muted={true}
          className={styles.videoPlayer}
          onClick={handleVideoInteraction}
        ></video>
        {
          <div
            className={styles.timeLine}
            ref={timeLineRef}
            onMouseMove={handleTimelineMouseMove}
            onMouseLeave={handleTimelineMouseLeave}
          ></div>
        }
      </div>
    </div>
  );
};

export default VideoPlayer;
