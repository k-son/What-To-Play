import React, {Component} from 'react';
import './Logo.css';
import Dice from './Dice';

class Logo extends Component {
  constructor(props) {
    super();
  }
  render() {
    return(
      <div className="Logo">
        <h1 title="what to play ?">what to play ?</h1>
        <Dice />
      </div>
    );
  }
}

export default Logo;