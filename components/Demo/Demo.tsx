import React from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

const Demo = () => {
  const videoUrl =
    'https://s3.amazonaws.com/_bc_dml/example-content/sintel_dash/sintel_vod.mpd';

  return (
    <div>
      <h2>Demo Player</h2>
      <VideoPlayer videoUrl={videoUrl} />
    </div>
  );
};

export default Demo;
