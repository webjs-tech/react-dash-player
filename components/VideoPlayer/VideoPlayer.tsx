import React, { useEffect, useRef, useState } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';
import 'shaka-player/dist/controls.css';
import styles from './VideoPlayer.module.scss';

type Props = {
  videoUrl: string;
};

const VideoPlayer: React.FC<Props> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const [videoDuration, setVideoDuration] = useState(0);

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
        console.log('The video has now been loaded!');
      })
      .catch((error) => console.error(error));

    controls?.setEnabledShakaControls(false);

    console.log('seekbar', seekbar);

    console.log('controlsContainer', controlsContainer);
  }, [videoUrl]);

  const getDurationVideoMock = () => {
    return videoRef.current?.duration || 0;
  };

  useEffect(() => {
    const handleMetadataLoaded = () => {
      const duration = getDurationVideoMock();
      setVideoDuration(duration);
    };

    videoRef.current?.addEventListener('loadedmetadata', handleMetadataLoaded);

    return () => {
      videoRef.current?.removeEventListener(
        'loadedmetadata',
        handleMetadataLoaded
      );
    };
  }, []);

  const handleMouseMove = (event: Event) => {
    // handleMouseMove...
    // ...
  };

  const timeFormat = (time: number) => {
    //  timeFormat...
    // ...
  };

  return (
    <div className={styles.videoContainer} ref={videoContainerRef}>
      <div className={styles.previewСontainer}>
        <canvas></canvas>
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
