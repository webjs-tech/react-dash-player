import React from "react";
import classNames from "classnames";

import "./Icon.module.scss";

type VariantType =
  | "information"
  | "fullscreen"
  | "dots-triple"
  | "play"
  | "pause"
  | "volume-high"
  | "volume-medium"
  | "volume-low"
  | "volume-mute"
  | "radio";

type Props = {
  variant: VariantType;
  className?: string;
};

const Icon: React.FC<Props> = ({ variant, className }) => {
  const iconClass = `icon-${variant}`;
  return (
    <i className={classNames(iconClass, className)} aria-hidden={true}></i>
  );
};

export default Icon;
