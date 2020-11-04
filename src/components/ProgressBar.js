import React from 'react';
import './ProgressBar.css';
import SongsLeft from './SongsLeft';

const ProgressBar = ({ progress, songsLeft }) => {
  let barCol;
    if (progress > 66) {
      barCol = 'var(--btn-color-yellow)'
    } else if (progress > 33 && progress <= 66) {
      barCol = 'var(--btn-color-orange)'
    } else {
      barCol = 'var(--btn-color-red)'
    }

    return(
      <div className="ProgressBar">
        <SongsLeft 
          songsLeft={songsLeft} 
          color={barCol} 
        />
        <div className="ProgressBar-bar">
          <div style={{width: progress + '%', backgroundColor: barCol}}></div>
          <span className="ProgressBar-count" style={{left: progress + '%', color: barCol}}>{progress}%</span>
        </div>
      </div>
    );
}

export default ProgressBar;