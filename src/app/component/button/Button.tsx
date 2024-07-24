// components/button/Button.tsx (adjust path as needed)
"use client"
import React, { FC, ButtonHTMLAttributes } from "react";
// import "./button.scss";

// Define the allowed values for buttonType
type ButtonType = "default" | "inverted" | "google";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: ButtonType;
}

const Button: FC<ButtonProps> = ({ children, buttonType = "default", ...otherProps }) => {
  // Define classes based on buttonType
  const BUTTON_TYPES_CLASSES: Record<ButtonType, string> = {
    google: "google-sign-in",
    inverted: "inverted",
    default: "",
  };

  // Ensure buttonClass is always a string when used in className
  const buttonClass = `button-container ${BUTTON_TYPES_CLASSES[buttonType]}`;

  return (
    <button
      className={buttonClass}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
