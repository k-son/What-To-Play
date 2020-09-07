import React, {Component} from 'react';
import './eventListeners.css';

class KeyDownListener extends Component {
  constructor(props) {
    super();
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.props.onKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.props.onKeyDown);
  }
  render() {
    return null;
  }
}

export default KeyDownListener;