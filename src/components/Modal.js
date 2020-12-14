import React from 'react';
import Button from './Button';
import {ReactComponent as IconRefresh} from '../icons/refresh.svg';
import {ReactComponent as IconClose} from '../icons/close.svg';
import './Modal.css';

function Modal({ modal, confirmDialog, progress, btnReload, btnClose, songs, chooseSong, removeSong }) {

  let isDialogOpen;
  if (confirmDialog === 'open') {
    isDialogOpen = -1;
  } else {
    isDialogOpen = 0;
  }
  
  return (
    <div className={`Modal-${modal} ${confirmDialog === 'open' && 'padding-right-20'}`}>
      <div className="Modal-buttons">
        {progress < 100 && 
          <Button 
            addClassName="btn-reload" 
            onClick={btnReload} 
            icon={<IconRefresh />} 
            title="Reload full setlist" 
            ariaLabel="Reaload full setlist" 
            tabIndex={isDialogOpen} 
          />
        }
        <Button 
          addClassName="btn-close" 
          onClick={btnClose} 
          icon={<IconClose />} 
          title="Close choice view" 
          ariaLabel="Close choice view" 
          tabIndex={isDialogOpen} 
        />
      </div>
      <ul className="Modal-list">
        {songs
          .sort((a, b) => a > b ? 1 : -1)
          .map(item => 
            <li key={item}>
              <button 
                className="ModalList-chooseBtn" 
                type="button" 
                onClick={chooseSong} 
                aria-label={item} 
                tabIndex={isDialogOpen}
              >
                <div className="ModalList-circle">
                  <div></div>
                </div>
                <p>{item}</p>
              </button>
              <button 
                className="ModalList-removeSongBtn" 
                type="button" 
                onClick={removeSong} 
                data-song={item} 
                title="Remove song from current list" 
                aria-label={`Remove '${item}' from current list`} 
                tabIndex={isDialogOpen}
              ></button>
            </li>
        )}
      </ul>
    </div>
  );
}

export default Modal;