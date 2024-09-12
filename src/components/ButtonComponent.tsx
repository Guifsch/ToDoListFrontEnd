import React, { ReactNode } from "react";
import { Button, SxProps, Theme } from "@mui/material";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface LoadingProps {
  color?: string;
  borderRadius?: string;
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  fontWeight?: string;
  backgroundColor?: string;
  boxShadow?: string;
  text?: string;
  fontFamily?: string;
  onClick?: () => void;
  width?: string | number;
  height?: string | number;
  margin?: string;
  padding?: string;
  fontSize?: string | number;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

export default function ButtonComponent({
  color,
  borderRadius,
  backgroundColor,
  text,
  onClick,
  width,
  height,
  boxShadow,
  textTransform = "none",
  fontWeight,
  margin,
  padding,
  fontFamily,
  fontSize,
  disabled = false,
  type = "button",
  children,
  sx,
}: LoadingProps) {
  return (
    <Button
      sx={{
        backgroundColor,
        color,
        boxShadow,
        borderRadius,
        transition: "0.2s",
        textTransform,
        width,
        fontFamily: fontFamily,
        height,
        margin,
        fontWeight,
        fontSize,
        padding,
        ...sx,
        "&:hover": {
          filter: "brightness(0.8)",
          backgroundColor,
          boxShadow:
            "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
        },
      }}
      variant="contained"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children || text}
    </Button>
  );
}
