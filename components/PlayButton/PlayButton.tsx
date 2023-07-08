import React, { useState, ButtonHTMLAttributes } from "react";
import Icon from "../Icon/Icon";
import "./PlayButton.module.scss";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const PlayButton: React.FC<Props> = ({ onClick, ...rest }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleTogglePlay = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button onClick={handleTogglePlay} {...rest}>
      <Icon variant={isPlaying ? "play" : "pause"} />
    </button>
  );
};

export default PlayButton;
