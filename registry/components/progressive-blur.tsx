import React from "react";

type ProgressiveBlurProps = {
  className?: string;
  backgroundColor?: string;
  position?: "top" | "bottom";
  height?: string;
  blurAmount?: string;
  blurEnabled?: boolean;
};

const ProgressiveBlur = ({
  className = "",
  backgroundColor = "var(--background)",
  position = "top",
  height = "150px",
  blurAmount = "4px",
  blurEnabled = true,
}: ProgressiveBlurProps) => {
  const isTop = position === "top";

  return (
    <div
      className={`pointer-events-none absolute left-0 w-full select-none ${className}`}
      style={{
        [isTop ? "top" : "bottom"]: 0,
        height,
        background: isTop
          ? `linear-gradient(to top, transparent, ${backgroundColor})`
          : `linear-gradient(to bottom, transparent, ${backgroundColor})`,
        maskImage: isTop
          ? `linear-gradient(to bottom, ${backgroundColor} 50%, transparent)`
          : `linear-gradient(to top, ${backgroundColor} 50%, transparent)`,
        ...(blurEnabled && {
          WebkitBackdropFilter: `blur(${blurAmount})`,
          backdropFilter: `blur(${blurAmount})`,
        }),
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    />
  );
};

export default ProgressiveBlur;