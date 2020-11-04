import React from 'react';
import './Display.css';

const Display = ({ slideTitle, song }) => {
  return(
    <div className="Display">
      <div  className="Display-inner">
        <span className={`Display-title ${slideTitle === 'on' && 'Display-title-off'}`}>{song}</span>
      </div>
    </div>
  )
};

export default Display;