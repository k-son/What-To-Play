import React, {Component} from 'react';
import './Dice.css';
import '../variables.css';

class Dice extends Component {
  constructor(props) {
    super();
  }
  render() {
    return(
      <div class="Dice-container">
        <div class="Dice">
          <div class="Dice-side front">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="Dice-side back">
            <span></span>
            <span></span>
          </div>
          <div class="Dice-side left">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="Dice-side right">
            <span></span>
          </div>
          <div class="Dice-side top">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="Dice-side bottom">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }
}

export default Dice;