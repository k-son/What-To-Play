import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 68%;
  max-width: 400px;
  margin: 24px auto 40px;
  font-size: 18px;
  font-weight: 300;
`;

const Number = styled.span`
  font-weight: 400;
  color: ${props => {
    if (props.progress > 66) {
      return props.theme.color.yellow;
    } else if (props.progress > 33 && props.progress <= 66) {
      return props.theme.color.orange;
    } else {
      return props.theme.color.red;
    }
  }};
`;

const Text = styled.span`
  color: #999;
  margin-left: 8px;
`;

function SongsLeft(props) {
  return (
    <Wrapper>
      <Number progress={props.progress}>{props.songsLeft}</Number>
      <Text>songs left</Text>
    </Wrapper>
  );
}

export default SongsLeft;