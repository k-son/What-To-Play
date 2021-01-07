import React from 'react';
import styled, { keyframes } from "styled-components";
import { theme } from '../styles/theme';


const diceSide = theme.diceSide;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${diceSide};
  height: ${diceSide};
  perspective: 1000px;
  perspective-origin: top right;
`;

const rotation = keyframes`
  from { 
    transform: rotateY(0deg) rotateX(720deg) rotateZ(0deg);
  }
  to { 
    transform: rotateY(360deg) rotateX(0deg) rotateZ(360deg);
  }
`;

const Dice = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: ${rotation} 10s linear infinite;
`;

const Side = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  width: 100%;
  height: 100%;
  padding: 10%;
  border-radius: 3px;
  background-color: #aaa;

    span {
      display: block;
      align-self: center;
      justify-self: center;
      width: calc(${diceSide} * 0.15);
      height: calc(${diceSide} * 0.15);
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background-color: #222;
    }
`;

const Front = styled(Side)`
  grid-template-columns: repeat(3, 33.33333%);
  grid-template-rows: repeat(3, 33.33333%);
  transform: translateZ(calc(${diceSide} / 2));

    span:nth-of-type(1) {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }

    span:nth-of-type(2) {
      grid-column: 3 / 4;
      grid-row: 1 / 2;
    }

    span:nth-of-type(3) {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }

    span:nth-of-type(4) {
      grid-column: 1 / 2;
      grid-row: 3 / 4;
    }

    span:nth-of-type(5) {
      grid-column: 3 / 4;
      grid-row: 3 / 4;
    }
`;

const Back = styled(Side)`
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(2, 50%);
  transform: translateZ(calc(-1 * (${diceSide} / 2)));

    span:nth-of-type(1) {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }

    span:nth-of-type(2) {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }
`;

const Left = styled(Side)`
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(3, 33.33333%);
  transform: rotateY(90deg) translateZ(calc(-1 * (${diceSide} / 2)));

    span:nth-of-type(1) {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }

    span:nth-of-type(2) {
      grid-column: 2 / 3;
      grid-row: 1 / 2;
    }

    span:nth-of-type(3) {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }

    span:nth-of-type(4) {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }

    span:nth-of-type(5) {
      grid-column: 1 / 2;
      grid-row: 3 / 4;
    }

    span:nth-of-type(6) {
      grid-column: 2 / 3;
      grid-row: 3 / 4;
    }
`;

const Right = styled(Side)`
  transform: rotateY(90deg) translateZ(calc(${diceSide} / 2));
`;

const Top = styled(Side)`
  grid-template-columns: repeat(3, 33.33333%);
  grid-template-rows: repeat(3, 33.33333%);
  transform: rotateX(90deg) translateZ(calc(${diceSide} / 2));

    span:nth-of-type(1) {
      grid-column: 3 / 4;
      grid-row: 1 / 2;
    }

    span:nth-of-type(2) {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }

    span:nth-of-type(3) {
      grid-column: 1 / 2;
      grid-row: 3 / 4;
    }
`;

const Bottom = styled(Side)`
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(2, 50%);
  transform: rotateX(90deg) translateZ(calc(-1 * (${diceSide} / 2)));
`;


function RotatingDice() {
  return (
    <Wrapper>
      <Dice>
        <Front>
          <span />
          <span />
          <span />
          <span />
          <span />
        </Front>
        <Back>
          <span />
          <span />
        </Back>
        <Left>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </Left>
        <Right>
          <span />
        </Right>
        <Top>
          <span />
          <span />
          <span />
        </Top>
        <Bottom>
          <span />
          <span />
          <span />
          <span />
        </Bottom>
      </Dice>
    </Wrapper>
  );
}

export default RotatingDice;