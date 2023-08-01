import React, { useEffect, useRef, useState } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';

import 'shaka-player/dist/controls.css';
import styles from './VideoPlayer.module.scss';

type Props = {
  videoUrl: string;
};

const VideoPlayer: React.FC<Props> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [hoveredTime, setHoveredTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [canvasX, setCanvasX] = useState(0);

  // useEffect(() => {
  //   const initPlayer = async () => {
  //     try {
  //       await shaka.polyfill.installAll();
  //       const player = new shaka.Player(videoRef.current);

  //       player.configure({
  //         controlPanelElements: [],
  //       });

  //       await player.load(videoUrl);

  //       // TODO: There is no such function as `getTimeline()`

  //       // Отримуємо елементи контролів
  //       const controls = player.getControlsContainer();
  //       if (controls) {
  //         const timeline = controls.getTimeline();
  //         timeline.addEventListener('mousemove', handleTimelineMouseMove);
  //       }
  //     } catch (error) {
  //       console.error('error', error);
  //     }
  //   };

  //   initPlayer();
  // }, [videoUrl]);

  useEffect(() => {
    const player = new shaka.Player(videoRef.current);
    const ui = new shaka.ui.Overlay(
      player,
      videoContainerRef.current as any,
      videoRef.current as any
    );
    const controls = ui.getControls();
    const controlsContainer = controls?.getControlsContainer();
    const seekbar = controlsContainer?.querySelector('.shaka-seek-bar ');

    player
      .load(videoUrl)
      .then(function () {
        // This runs if the asynchronous load is successful.
        console.log('The video has now been loaded!');
      })
      .catch((error) => console.error(error)); // onError is executed if the asynchronous load fails.

    controls?.setEnabledShakaControls(false);

    console.log('seekbar', seekbar);

    console.log('controlsContainer', controlsContainer);
  }, [videoUrl]);

  const getDurationVideoMock = () => {
    return 1;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMouseMove = (e: any) => {
    const position =
      (e.offsetX / e.target?.offsetWidth) * getDurationVideoMock();
    const showSeekbarPreview = position * 1000;

    console.log(showSeekbarPreview);
  };

  useEffect(() => {
    const seekBar = videoRef.current?.querySelector('.shaka-seek-bar');
    // load the thumbnail preview when the user moves over the seekbar
    seekBar?.addEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const timeFormat = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleTimelineMouseMove = (event: MouseEvent) => {
    const timeline = event.currentTarget as HTMLElement;
    const rect = timeline.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const totalWidth = rect.width;
    const percentage = offsetX / totalWidth;
    const videoDuration = videoRef.current?.duration || 0;
    const time = videoDuration * percentage;
    setHoveredTime(time);
    setIsHovering(true);

    const canvasWidth = 100;
    const canvasHeight = 50;
    const canvasX = offsetX - canvasWidth / 2;
    setCanvasX(canvasX);
    const canvasY = rect.top - canvasHeight - 10;
    previewRef.current!.style.left = `${canvasX}px`;
    previewRef.current!.style.top = `${canvasY}px`;
  };

  return (
    <div ref={videoContainerRef} className={styles.videoContainer}>
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
