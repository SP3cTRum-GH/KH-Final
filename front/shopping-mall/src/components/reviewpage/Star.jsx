import React from "react";

const Star = ({
  size,
  color,
  filled,
  onClick,
  onMouseEnter,
  onMouseLeave,
  pointerEvents,
}) => {
  const starStyle = {
    display: "block",
    fontSize: `${size}px`,
    height: `${size}px`,
    cursor: "pointer",
    pointerEvents: `${pointerEvents}`,
    color: "#fff650",
  };

  return (
    <span
      style={starStyle}
      role="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {filled ? "★" : "☆"}
    </span>
  );
};

export default Star;
