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
  const [currentTime, setCurrentTime] = useState(0);

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

  const timeFormat = (currentTime: number) => {
    // Implement the timeFormat function for time formatting
    // based on the currentTime value
    // return `${Math.floor(currentTime / 60)}:${currentTime % 60}`;
    return '';
  };

  const handleMouseMove = (
    event: any /* most biggest issue: what event should be here? */
  ) => {
    // event processing currentTime
  };

  return (
    <div className={styles.videoContainer}>
      <div className={styles.previewСontainer} onMouseMove={handleMouseMove}>
        <canvas ref={previewRef} className={styles.canvas} />
        <span className={styles.previewTime}>{timeFormat(currentTime)}</span>
      </div>
      <video
        ref={videoRef}
        controls={true}
        style={{ width: '450px', height: 'auto' }}
        onMouseMoveCapture={handleMouseMove}
        className={styles.videoPlayer}
      ></video>
    </div>
  );
};

export default VideoPlayer;
