import React from 'react';
import './CurrentList.css';

function CurrentList({ songs }) {
  return (
    <div className="CurrentList">
      <ul className="CurrentList-list">
        {songs
          .sort((a, b) => a > b ? 1 : -1)
          .map(item => <li key={item}><span className="CurrentList-dot">&bull;</span>{item}</li>
        )}
      </ul>
    </div>
  )
};

export default CurrentList;