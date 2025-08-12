import React, { useState, useEffect } from "react";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
};

const starContainerStyle = {
  display: "flex",
};

const StarRating = ({
  max = 5,
  size = 15,
  color = "#fcc419",
  onSetRate,
  defaultRate = 0,
  read,
}) => {
  const [rate, setRate] = useState(defaultRate);
  const [mouseOverRate, setMouseOverRate] = useState(0);

  const textStyle = {
    fontSize: `${size / 1.5}px`,
    margin: "0",
    lineHeight: "1",
    color,
  };

  const onClick = (r) => {
    setRate(r);
    onSetRate(r);
  };

  // defaultRate prop이 바뀔 때마다 rate 값도 동기화
  useEffect(() => {
    setRate(defaultRate);
  }, [defaultRate]);

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: max }, (_, i) => (
          <Star
            key={i}
            size={size}
            color={color}
            filled={mouseOverRate ? mouseOverRate >= i + 1 : rate >= i + 1}
            onClick={() => onClick(i + 1)}
            onMouseEnter={() => setMouseOverRate(i + 1)}
            onMouseLeave={() => setMouseOverRate(0)}
            pointerEvents={read ? "none" : "auto"}
          />
        ))}
      </div>
      {/* <p style={textStyle}>{mouseOverRate ? mouseOverRate : rate}</p> */}
    </div>
  );
};

export default StarRating;
