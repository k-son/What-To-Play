import React from 'react';
import './Button.css';

const Button = ({ addClassName, onClick, icon, description }) => {
    return (
      <div className={`Button-container ${addClassName}`}>
        <button 
          className="Button" 
          onClick={onClick} 
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