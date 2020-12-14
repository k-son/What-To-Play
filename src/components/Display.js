import React from 'react';
import './Display.css';

function Display({ slideTitle, currentSong }) {
  return (
    <div className="Display">
      <div  className="Display-inner">
        <span className={`Display-title ${slideTitle === 'on' && 'Display-title-off'}`}>{currentSong}</span>
      </div>
    </div>
  )
};

export default Display;