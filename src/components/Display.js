import React from 'react';
import styled, { keyframes } from 'styled-components';

const Frame = styled.div`
  grid-row: 4 / 5;
  align-self: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 86%;
  max-width: 640px;
  margin: 20px auto;
  background-color: #2e2e2e;
  border: 1px solid #333;
  border-radius: 45px;
  z-index: 2;

  &::before {
    display: block;
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(15deg, transparent 60%, #3e3e3e 70%, #717171);
    border-radius: 45px;
    z-index: -1;
  }

  &::after {
    display: block;
    content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(35deg, #151515 3%, #272727 30%, transparent);
    border-radius: 45px;
    z-index: -1;

    @media only screen and (min-width: 710px) {
      background-image: linear-gradient(15deg, #222 3%, #272727 30%, transparent);
    }
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 68px;
  width: calc(100% - 12px);
  max-width: 600px;
  padding: 12px 24px;
  background-color: #3f3f3f;
  border-radius: 35px;
  overflow: hidden;
`;

const expandText = keyframes`
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`;

const Text = styled.span`
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 1px;
  line-height: 1.4;
  text-align: center;
  animation: ${expandText} .4s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
`;

const Title = styled(Text)`
  display: ${props => props.animate === 'on' ? 'none' : 'inline'};
  text-transform: capitalize;
  color: #c9c9c9;

  @media only screen and (min-width: 600px) {
    font-size: 18px;
  }

  @media only screen and (min-width: 900px) {
    font-size: 21px;
  }
`;

const TitleSubstitution = styled(Text)`
  color: #999;
`;


function Display({ slideTitle, currentSong }) {
  return (
    <Frame>
      <Box>
        {currentSong !== ' ' ?  
        <Title animate={slideTitle}>{currentSong}</Title>
        :
        <TitleSubstitution>song to play</TitleSubstitution>}
      </Box>
    </Frame>
  )
};

export default Display;