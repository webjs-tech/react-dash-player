import React from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

const Demo = () => {
  const videoUrl = '';

  return (
    <div>
      <h2>Demo Player</h2>
      <VideoPlayer videoUrl={videoUrl} />
    </div>
  );
};

export default Demo;
