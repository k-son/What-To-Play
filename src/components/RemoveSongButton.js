import React, {Component} from 'react';
import './RemoveSongButton.css';

class RemoveSongButton extends Component {
  constructor(props) {
    super();
  }
  render() {
    return(
      <button className="RemoveSongButton" type="button" aria-label="remove song from list"></button>
    );
  }
}

export default RemoveSongButton;