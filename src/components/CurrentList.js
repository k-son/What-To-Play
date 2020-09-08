import React, {Component} from 'react';
import './CurrentList.css';

class CurrentList extends Component {
  render() {
    return(
      <div className="CurrentList">
        <ul className="CurrentList-list">
          {this.props.songs
            .sort((a, b) => a > b ? 1 : -1)
            .map(item => <li key={item}><span className="CurrentList-dot">&bull;</span>{item}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default CurrentList;