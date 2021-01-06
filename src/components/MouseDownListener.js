import React, {Component} from 'react';

// Removes outline from buttons on mouse click 
class MouseDownListener extends Component {
  componentDidMount() {
    document.addEventListener('mousedown', () => document.body.classList.add('intent-mouse'));
  }

  render() {
    return null;
  }
}

export default MouseDownListener;