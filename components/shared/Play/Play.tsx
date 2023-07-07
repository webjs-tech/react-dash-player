import React, { useState } from "react";
import Icon from "../Icon/Icon";
import "./Play.module.scss";

interface PlayProps {
  onClick: () => void;
}

const Play: React.FC<PlayProps> = ({ onClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
    onClick();
  };

  return (
    <button onClick={handleTogglePlay}>
      {isPlaying ? <Icon variant="play" /> : <Icon variant="pause" />}
    </button>
  );
};

export default Play;
