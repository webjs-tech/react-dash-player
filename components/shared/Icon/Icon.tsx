import React from "react";
import classNames from "classnames";

import styles from "./Icon.module.scss";

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
  return (
    <i
      className={classNames(style.icon, style[`icon-${variant}`], className)}
      aria-hidden={true}
    ></i>
  );
};

export default Icon;
