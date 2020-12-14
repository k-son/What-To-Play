import React from 'react';
import './Button.css';

function Button({ additionalClassName, onClick, icon, description }) {
    return (
      <div className={`Button-container ${additionalClassName}`}>
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