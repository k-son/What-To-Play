import React from 'react';
import './Button.css';

const Button = ({ addClassName, onClick, tabindex, ariaLabelledby, ariaLabel, title, icon, description }) => {
  return(
    <div className={`Button-container ${addClassName}`}>
      <button type="button" className="Button" 
        onClick={onClick} 
        tabIndex={tabindex} 
        aria-labelledby={ariaLabelledby} 
        aria-label={ariaLabel} 
        title={title}
      >
        <span className="Button-middleBox">
          <span className="Button-coloredBox">
            <span className="Button-innerBox">
              <span className="Button-iconBox">{icon}</span> 
            </span>
          </span>
        </span>
      </button>
      <p className="Button-description" id={description}>{description}</p>
    </div>
  );
}

export default Button;