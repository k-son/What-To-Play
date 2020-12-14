import React from 'react';
import './Logo.css';
import Dice from './Dice';

 const Logo = () => {
  return (
    <div className="Logo">
      <h1 title="what to play ?">
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
      </h1>
      <Dice />
    </div>
  )
};

export default Logo;