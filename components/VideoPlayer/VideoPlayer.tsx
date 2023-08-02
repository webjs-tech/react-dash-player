import React, { useEffect, useRef, useState } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';
import 'shaka-player/dist/controls.css';
import styles from './VideoPlayer.module.scss';
import { getFrame, loadImage } from '../../common/utils/helpers';

type Props = {
  videoUrl: string;
};

const VideoPlayer: React.FC<Props> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const [hoveredTime, setHoveredTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [canvasX, setCanvasX] = useState(0);
  const [frameImage, setFrameImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const initPlayer = async () => {
      try {
        await shaka.polyfill.installAll();
        const player = new shaka.Player(videoRef.current);

        player.configure({
          controlPanelElements: [],
        });

        await player.load(videoUrl);

        const videoElement = videoRef.current;
        if (videoElement) {
          videoElement.addEventListener('mousemove', handleTimelineMouseMove);
        }
      } catch (error) {
        console.error('error', error);
      }
    };

    initPlayer();
  }, [videoUrl]);

  useEffect(() => {
    if (frameImage) {
      console.log(frameImage);
      const ctx = previewRef.current!.getContext('2d');
      if (ctx) {
        const canvasWidth = 100;
        const canvasHeight = 50;

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);

        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.fillText(timeFormat(hoveredTime), 5, canvasHeight - 5);
      }
    }
  }, [frameImage, hoveredTime]);

  const timeFormat = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleTimelineMouseMove = async (event: MouseEvent) => {
    const timeline = event.currentTarget as HTMLVideoElement;
    const rect = timeline.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;

    if (videoRef.current) {
      const videoDuration = videoRef.current.duration || 0;
      const time = videoDuration * (offsetX / rect.width);
      setHoveredTime(time);
      setIsHovering(true);

      const frame = await getFrame(time); // TODO: get frame

      if (frame) {
        const canvasWidth = 100;
        const canvasX = offsetX - canvasWidth / 2;
        setCanvasX(canvasX);
        // console.log(frame);
      }
    }
  };

  return (
    <div className={styles.videoContainer}>
      <div
        className={styles.previewСontainer}
        style={{
          display: isHovering ? 'flex' : 'none',
          left: `${canvasX + 50}px`,
          top: 130 + 'px',
        }}
      >
        <canvas
          ref={previewRef}
          width={100}
          height={50}
          className={styles.canvas}
        />
        <span className={styles.previewTime}>{timeFormat(hoveredTime)}</span>
      </div>
      <video
        ref={videoRef}
        controls={true}
        style={{ width: '600px', height: 'auto' }}
        className={styles.videoPlayer}
      ></video>
    </div>
  );
};

export default VideoPlayer;
