import React from 'react';
import './ProgressRing.css';

const ProgressRing = ({ sqSize, strokeWidth, percentage, songsLeft }) => {
  
  // Size of the enclosing square
  const size = sqSize;
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (sqSize - strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${size} ${size}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - dashArray * percentage / 100;
  // Stroke color 
  let barCol;
  if (percentage > 66) {
    barCol = 'var(--btn-color-yellow)'
  } else if (percentage > 33 && percentage <= 66) {
    barCol = 'var(--btn-color-orange)'
  } else {
    barCol = 'var(--btn-color-red)'
  }

  return (
    <figure className="ProgressRing">
      <svg
          width={sqSize}
          height={sqSize}
          viewBox={viewBox}>
          <circle
            className="ProgressRing-backgroundCircle"
            cx={sqSize / 2}
            cy={sqSize / 2}
            r={radius}
            strokeWidth={`${strokeWidth}px`} 
            style={{
              fill: "none"
            }}
            />
          <circle
            className="ProgressRing-progressCircle"
            cx={sqSize / 2}
            cy={sqSize / 2}
            r={radius}
            strokeWidth={`${strokeWidth}px`}
            // Start progress marker at 12 O'Clock
            transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
            style={{
              fill: "none",
              strokeDasharray: dashArray,
              strokeDashoffset: dashOffset,
              stroke: barCol,
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }} />
      </svg>
      <div className="ProgressRing-text">
        <p style={{color: barCol}}>{songsLeft}</p>
        <p style={{color: barCol}}>({percentage}%)</p>
        <p>songs left</p>
      </div>
    </figure>
  );
}

export default ProgressRing;