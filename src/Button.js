import React, {Component} from 'react';
import './Button.css';

class Button extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <button className="Button">
        <span className="Button-iconSpan">{this.props.icon}</span>
      </button>
    );
  }
}

export default Button;