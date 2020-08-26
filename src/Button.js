import React, {Component} from 'react';
import './Button.css';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <button type='button' className="Button" id={this.props.id} onClick={this.props.action}>
        <span className="Button-middleBox">
          <span className="Button-coloredBox">
            <span className="Button-innerBox">
              <span className="Button-iconBox">{this.props.icon}</span> 
            </span>
          </span>
        </span>
      </button>
    );
  }
}

export default Button;