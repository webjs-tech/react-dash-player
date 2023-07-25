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
  const [hoveredTime, setHoveredTime] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [canvasX, setCanvasX] = useState(0);

  useEffect(() => {
    const initPlayer = async () => {
      try {
        await shaka.polyfill.installAll();
        const player = new shaka.Player(videoRef.current);

        player.configure({
          controlPanelElements: [],
        });

        await player.load(videoUrl);
      } catch (error) {
        console.error('error', error);
      }
    };

    initPlayer();
  }, [videoUrl]);

  const timeFormat = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const handleVideoMouseMove = (event: React.MouseEvent<HTMLVideoElement>) => {
    const videoElement = event.currentTarget;
    const rect = videoElement.getBoundingClientRect();
    const offsetX = event.nativeEvent.offsetX;
    const totalWidth = rect.width;
    const percentage = offsetX / totalWidth;
    const videoDuration = videoElement.duration;
    const time = videoDuration * percentage;
    setHoveredTime(time);
    setIsHovering(true);

    const canvasWidth = 100;
    const canvasHeight = 50;
    const canvasX = event.pageX - rect.left - canvasWidth / 2;
    setCanvasX(canvasX);
    const canvasY = event.pageY - rect.top - rect.height - canvasHeight - 10;
    previewRef.current!.style.left = `${canvasX}px`;
    previewRef.current!.style.top = `${canvasY}px`;
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
        onMouseMove={handleVideoMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      ></video>
    </div>
  );
};

export default VideoPlayer;
