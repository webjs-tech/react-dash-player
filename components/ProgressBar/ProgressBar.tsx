import React, { useState, useRef } from "react";
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

  const handleIconMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsDragging(true);
    setDragStartX(event.clientX);
    setDragStartValue(value);
  };

  const calculatePinPosition = (event: React.MouseEvent<HTMLDivElement>) => {
    const progressBarRect = progressBarRef.current?.getBoundingClientRect();
    if (!progressBarRect) {
      return;
    }
    const { left, width } = progressBarRect;

    const offsetX = event.clientX - left;
    const progressPercentage = offsetX / width;
    const clampedPercentage = Math.max(0, Math.min(1, progressPercentage));
    const newValue = Math.round(clampedPercentage * 100);

    return newValue;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !progressBarRef.current) {
      return;
    }

    const pinPosition = calculatePinPosition(event);
    if (!pinPosition) return;

    onChange(pinPosition);
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
