import React, {Component} from 'react';
import './DisplayMinimal.css';

class DisplayMinimal extends Component {
  constructor(props) {
    super();
  }
  render() {
    return(
      <div className="DisplayMinimal">
        <span className="DisplayMinimal-title">{this.props.song}</span>
      </div>
    );
  }
}

export default DisplayMinimal;