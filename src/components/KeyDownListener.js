import React, {Component} from 'react';
class KeyDownListener extends Component {
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