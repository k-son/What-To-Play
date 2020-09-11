import React, {Component} from 'react';
import './Dialog.css';

class Dialog extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className={`Dialog-${this.props.isOpen}`}>
        <div className="Dialog-conent">
          <div className="Dialog-text">
            <p className="Dialog-question">{this.props.question}</p>
            <p className="Dialog-songTitle">{this.props.songTitle}</p>
          </div>
          <div className="Dialog-buttons">
            <button className="Dialog-button Dialog-cancel" onClick={this.props.onCancel}>Cancel</button>
            <button className="Dialog-button Dialog-ok" onClick={this.props.onConfirm}>OK</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Dialog;