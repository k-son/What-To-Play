import React, {Component} from 'react';
import './SongsLeft.css';

class SongsLeft extends Component {
  constructor(props) {
    super();
  }
  render() {
    return(
        <div className="SongsLeft">
          <span style={{color: this.props.color}}>{this.props.songsLeft}</span><span> songs left</span>
        </div>
      );
  }
}

export default SongsLeft;