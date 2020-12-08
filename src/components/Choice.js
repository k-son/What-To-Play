import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import {ReactComponent as IconRefresh} from '../icons/refresh.svg';
import {ReactComponent as IconClose} from '../icons/close.svg';
import '../variables.css';
import './Choice.css';

const Choice = ({ confirmDialog, progress, btnReload, btnClose, songs, chooseSong, removeSong }) => {
  return (
    <div className="Choice">
      <div className="Choice-buttons">
        {progress < 100 && 
          <Button 
            addClassName="btn-reload" 
            onClick={btnReload} 
            icon={<IconRefresh />} 
            title="Reload full setlist" 
            ariaLabel="Reaload full setlist" 
          />
        }
        <Button 
          addClassName="btn-close" 
          onClick={btnClose} 
          icon={<IconClose />} 
          title="Close choice view" 
          ariaLabel="Close choice view" 
        />
      </div>
      <ul className="Choice-list">
        {songs
          .sort((a, b) => a > b ? 1 : -1)
          .map(item => 
            <li key={item}>
              <button 
                className="ChoiceList-chooseBtn" 
                type="button" 
                onClick={chooseSong} 
                aria-label={item} 
                tabIndex={confirmDialog === 'open' ? -1 : 0}
              >
                <div className="ChoiceList-circle">
                  <div></div>
                </div>
                <p>{item}</p>
              </button>
              <button 
                className="ChoiceList-removeSongBtn" 
                type="button" 
                onClick={removeSong} 
                data-song={item} 
                title="Remove song from current list" 
                aria-label={`Remove '${item}' from current list`} 
                tabIndex={confirmDialog === 'open' ? -1 : 0}
              ></button>
            </li>
        )}
      </ul>
    </div>
  );
}

export default Choice;