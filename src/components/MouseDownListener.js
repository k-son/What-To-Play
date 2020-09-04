import React, {Component} from 'react';
import './eventListeners.css';

class MouseDownListener extends Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.props.onMouseDown);
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.props.onMouseDown);
  }
  render() {
    return null;
  }
}

export default MouseDownListener;