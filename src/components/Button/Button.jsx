import React from "react";
import buttonStyles from "./Button.module.css";

const Button = ({
  children = "Click",
  className,
  onClick,
  disabled = false,
  ariaLabel,
}) => {
  return (
    <button
      className={`${buttonStyles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
      ariaLabel={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
