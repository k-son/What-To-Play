import React from 'react';
import './Dialog.css';

const Dialog = ({ isOpen, question, songTitle, onCancel, onConfirm }) => {
  return(
    <div className={`Dialog-${isOpen}`}>
      <div className="Dialog-conent">
        <div className="Dialog-text">
          <p className="Dialog-question">{question}</p>
          <p className="Dialog-songTitle">{songTitle !== ' ' && `'${songTitle}'`}</p>
        </div>
        <div className="Dialog-buttons">
          <button className="Dialog-button Dialog-cancel" type="button" onClick={onCancel}>Cancel</button>
          <button className="Dialog-button Dialog-ok" type="button" onClick={onConfirm}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;