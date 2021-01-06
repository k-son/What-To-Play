import React, {Component} from 'react';

// Adds outline to buttons when accessing by keyboard 
class KeyDownListener extends Component {
  componentDidMount() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.remove('intent-mouse');
      }
    });
  }

  render() {
    return null;
  }
}

export default KeyDownListener;