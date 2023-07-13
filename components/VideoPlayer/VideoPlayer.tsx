import React, { useEffect, useRef } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui';
import 'shaka-player/dist/controls.css';

type Props = {
  videoUrl: string;
};

const VideoPlayer: React.FC<Props> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <div>
      <video ref={videoRef} controls={true}></video>
    </div>
  );
};

export default VideoPlayer;
