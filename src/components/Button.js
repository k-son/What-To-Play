import React, {Component} from 'react';
import './Button.css';

class Button extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="Button-container" id={this.props.id}>
        <button type='button' className="Button" onClick={this.props.action} tabIndex={this.props.tabindex} aria-labelledby={this.props.labelledby}>
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