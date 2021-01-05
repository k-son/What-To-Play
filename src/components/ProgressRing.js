import React from 'react';
import styled from 'styled-components';

const Ring = styled.figure`
  position: relative;
  width: fit-content;
  margin: 0 auto;

    svg circle:first-of-type {
      fill: none;
      stroke: #666;
    }

    svg circle:last-of-type {
      fill: none;
      stroke: ${props => {
        if (props.percentage > 66) {
          return props.theme.color.yellow;
        } else if (props.percentage > 33 && props.percentage <= 66) {
          return props.theme.color.orange;
        } else {
          return props.theme.color.red;
        }
      }};
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: stroke-dashoffset .4s;
    }
`;

const TextBox = styled.div`
  position: absolute;
  left: 50%;
  top: 48%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
`;

const SongsLeftCount = styled.p`
  font-size: 32px;
  font-weight: 400;
  line-height: 1;
  color: ${props => {
    if (props.percentage > 66) {
      return props.theme.color.yellow;
    } else if (props.percentage > 33 && props.percentage <= 66) {
      return props.theme.color.orange;
    } else {
      return props.theme.color.red;
    }
  }};
`;

const PercentageLeft = styled.p`
  font-size: 14px;
  font-weight: 300;
  color: ${props => {
    if (props.percentage > 66) {
      return props.theme.color.yellow;
    } else if (props.percentage > 33 && props.percentage <= 66) {
      return props.theme.color.orange;
    } else {
      return props.theme.color.red;
    }
  }};
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 1px;
  margin-top: 8px;
  color: #999;
`;

function ProgressRing({ sqSize, strokeWidth, percentage, songsLeft }) {
  
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

  return (
    <Ring percentage={percentage}>
      <svg
        width={sqSize}
        height={sqSize}
        viewBox={viewBox}>
        <circle
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`} 
        />
        <circle
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset
          }} 
        />
      </svg>
      <TextBox>
        <SongsLeftCount percentage={percentage}>{songsLeft}</SongsLeftCount>
        <PercentageLeft percentage={percentage}>({percentage}%)</PercentageLeft>
        <Text>songs left</Text>
      </TextBox>
    </Ring>
  );
}

export default ProgressRing;