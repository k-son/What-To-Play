import React from 'react';
import styled from "styled-components";

/*
let barColor;
function barColor(props) {
  if (props.progress > 66) {
    barColor =  (props.theme) => props.theme.color.yellow;
  } else if (props.progress > 33 && props.progress <= 66) {
    barColor =  (props.theme) => props.theme.color.orange;
  } else {
    barColor =  (props.theme) => props.theme.color.red;
  }
  console.log(barColor);
}
*/

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
`;

const Text = styled.span`
  color: #999;
  margin-left: 8px;
`;

function SongsLeft(props) {
  return (
    <Wrapper>
      <Number>{props.songsLeft}</Number>
      <Text>songs left</Text>
    </Wrapper>
  );
}

export default SongsLeft;



//import './SongsLeft.css';
/*

function SongsLeft ({ color, songsLeft }) {
  return (
    <div className="SongsLeft">
      <span style={{color: color}}>
        {songsLeft}
      </span>
      <span> songs left</span>
    </div>
  );
}

export default SongsLeft;

*/