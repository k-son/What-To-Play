import React, {Component} from 'react';
import './Display.css';

class Display extends Component {
  render() {
    return(
      <div className="Display">
        <div  className="Display-inner">
          <span className="Display-title">{this.props.song}</span>
        </div>
      </div>
    );
  }
}

export default Display;