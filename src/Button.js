import React, {Component} from 'react';
import './Button.css';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="Button-container">
        <button type='button' className="Button" id={this.props.id} onClick={this.props.action}>
          <span className="Button-middleBox">
            <span className="Button-coloredBox">
              <span className="Button-innerBox">
                <span className="Button-iconBox">{this.props.icon}</span> 
              </span>
            </span>
          </span>
        </button>
        <p className="Button-description">{this.props.description}</p>
      </div>
    );
  }
}

export default Button;