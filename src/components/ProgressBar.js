import React from 'react';
import './ProgressBar.css';
import SongsLeft from './SongsLeft';

function ProgressBar({ progress, songsLeft }) {
  let barColor;
    if (progress > 66) {
      barColor = 'var(--btn-color-yellow)';
    } else if (progress > 33 && progress <= 66) {
      barColor = 'var(--btn-color-orange)';
    } else {
      barColor = 'var(--btn-color-red)';
    }

    return (
      <div className="ProgressBar">
        <SongsLeft 
          songsLeft={songsLeft} 
          color={barColor} 
        />
        <div className="ProgressBar-bar">
          <div style={{width: progress + '%', backgroundColor: barColor}}></div>
          <span className="ProgressBar-count" style={{left: progress + '%', color: barColor}}>{progress}%</span>
        </div>
      </div>
    );
}

export default ProgressBar;