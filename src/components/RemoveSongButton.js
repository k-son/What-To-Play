import React, {Component} from 'react';
import './RemoveSongButton.css';

class RemoveSongButton extends Component {
  render() {
    return(
      <button className="RemoveSongButton" type="button" aria-label="remove song from list"></button>
    );
  }
}

export default RemoveSongButton;