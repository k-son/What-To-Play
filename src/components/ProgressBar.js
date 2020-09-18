import React, {Component} from 'react';
import './ProgressBar.css';
import SongsLeft from './SongsLeft';

class ProgressBar extends Component {
  constructor(props) {
    super();
  }
  render() {
    let barCol;
    if (this.props.progress > 66) {
      barCol = 'var(--btn-color-yellow)'
    } else if (this.props.progress > 33 && this.props.progress <= 66) {
      barCol = 'var(--btn-color-orange)'
    } else {
      barCol = 'var(--btn-color-red)'
    }
    return(
      <div className="ProgressBar">
        <SongsLeft songsLeft={this.props.songsLeft} color={barCol} />
        <div className="ProgressBar-bar">
          <div style={{width: this.props.progress + '%', backgroundColor: barCol}}></div>
          <span className="ProgressBar-count" style={{left: this.props.progress + '%', color: barCol}}>{this.props.progress}%</span>
        </div>
      </div>
    );
  }
}

export default ProgressBar;