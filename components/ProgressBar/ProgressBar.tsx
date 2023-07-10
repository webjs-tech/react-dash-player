import React, { useState, useRef, useEffect } from "react";
import Icon from "../Icon/Icon";
import "./ProgressBar.scss";

type Props = {
  value: number;
  onChange: (newProgress: number) => void;
};

const ProgressBar: React.FC<Props> = ({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartValue, setDragStartValue] = useState(value);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleIconMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsDragging(true);
    setDragStartX(event.clientX);
    setDragStartValue(value);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && progressBarRef.current) {
      const progressBarRect = progressBarRef.current.getBoundingClientRect();
      const progressBarWidth = progressBarRect.width;
      const offsetX = event.clientX - progressBarRect.left;
      const progressPercentage = offsetX / progressBarWidth;

      const clampedPercentage = Math.max(0, Math.min(1, progressPercentage));
      const newValue = Math.round(clampedPercentage * 100);

      onChange(newValue);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="progress-bar"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      ref={progressBarRef}
    >
      <div className="progress-bar-track"></div>
      <div
        className="progress-bar-fill"
        style={{ width: `${value}%`, backgroundColor: "red" }}
      ></div>
      <div
        className="progress-bar-icon"
        style={{
          left: `${value}%`,
        }}
        onMouseDown={handleIconMouseDown}
      >
        <Icon className="icon-radio" variant="radio" />
      </div>
    </div>
  );
};

export default ProgressBar;
