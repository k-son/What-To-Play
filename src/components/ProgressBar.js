import React, {Component} from 'react';
import './ProgressBar.css';

class ProgressBar extends Component {
  render() {

    let bgCol;
    if (this.props.progress > 66) {
      bgCol = 'var(--btn-color-yellow)'
    } else if (this.props.progress > 33 && this.props.progress <= 66) {
      bgCol = 'var(--btn-color-orange)'
    } else {
      bgCol = 'var(--btn-color-red)'
    }

    return(
      <div className="ProgressBar">
        <div className="ProgressBar-bar" style={{width: this.props.progress + '%', backgroundColor: bgCol}}></div>
        <span className="ProgressBar-count" style={{left: this.props.progress + '%', color: bgCol}}>{this.props.progress}%</span>
      </div>
    );
  }
}

export default ProgressBar;