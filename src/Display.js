import React, {Component} from 'react';
import './Display.css';

class Display extends Component {
  render() {
    return(
      <div className="Display">
        <span>{this.props.song}</span>
      </div>
    );
  }
}

export default Display;