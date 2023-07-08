import React, { useState, ButtonHTMLAttributes } from "react";
import Icon from "../Icon/Icon";
import "./PlayButton.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
};

const PlayButton: React.FC<Props> = ({ onClick, ...buttonProps }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    onClick();
  };

  return (
    <button onClick={handleTogglePlay} {...buttonProps}>
      <Icon variant={isPlaying ? "play" : "pause"} />
    </button>
  );
};

export default PlayButton;
