import React from 'react';
import './SongsLeft.css';

function SongsLeft ({ color, songsLeft }) {
  return (
    <div className="SongsLeft">
      <span style={{color: color}}>{songsLeft}</span><span> songs left</span>
    </div>
  );
}

export default SongsLeft;