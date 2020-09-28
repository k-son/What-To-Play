import React, {Component} from 'react';
import './Button.css';

class Button extends Component {
  constructor(props) {
    super();
  }
  render() {
    return(
      <div className={`Button-container ${this.props.addClassName}`}>
        <button type="button" className="Button" onClick={this.props.onClick} tabIndex={this.props.tabindex} aria-labelledby={this.props.ariaLabelledby} aria-label={this.props.ariaLabel} title={this.props.title}>
          <span className="Button-middleBox">
            <span className="Button-coloredBox">
              <span className="Button-innerBox">
                <span className="Button-iconBox">{this.props.icon}</span> 
              </span>
            </span>
          </span>
        </button>
        <p className="Button-description" id={this.props.description}>{this.props.description}</p>
      </div>
    );
  }
}

export default Button;