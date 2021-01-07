import React from 'react';
import styled from "styled-components";
import RotatingDice from './RotatingDice';


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => theme.logoHeight};
  padding: 16px;
`;

const Logotype = styled.h1`
  position: relative;
  font-size: 24px;
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
  color: #777;
  text-shadow: -1px 0px 0 #222;
  margin-right: 16px;
  transform: translateX(7px);

    span {
    position: relative;
    display: inline-block;
    letter-spacing: -2px;

      &:nth-of-type(even) {
        color: #999;
        font-size: 24px;
      }

      /* t */
      &:nth-of-type(4) {
        transform: translateX(-1px);
      }

      /* t */
      &:nth-of-type(5) {
        transform: translateX(-3px);
      }

      /* o */
      &:nth-of-type(6) {
        transform: translateX(-3px);
      }

      /* p */
      &:nth-of-type(7) {
        transform: translateX(-3px);
      }

      /* l */
      &:nth-of-type(8) {
        transform: translateX(-4px);
      }

      /* a */
      &:nth-of-type(9) {
        transform: translateX(-5px);
      }

      /* y */
      &:nth-of-type(10) {
        transform: translateX(-7px);
      }
    }
`;


function Logo() {
  return (
    <Wrapper>
      <Logotype title="what to play ?">
        <span>w</span>
        <span>h</span>
        <span>a</span>
        <span>t</span>
        <span>t</span>
        <span>o</span>
        <span>p</span>
        <span>l</span>
        <span>a</span>
        <span>y</span>
      </Logotype>
      <RotatingDice />
    </Wrapper>
  )
};

export default Logo;