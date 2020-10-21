import React, {Component} from 'react';
import Button from './Button';
import {ReactComponent as IconRefresh} from '../icons/refresh.svg';
import {ReactComponent as IconClose} from '../icons/close.svg';
import './Modal.css';


class Modal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={`Modal-${this.props.modal} ${this.props.confirmDialog === 'open' && 'padding-right-20'}`}>
        <div className="Modal-buttons">
          {this.props.progress < 100 && 
            <Button 
              addClassName="btn-reload" 
              onClick={this.props.btnReload} 
              icon={<IconRefresh />} 
              title="Reload full setlist" 
              ariaLabel="Reaload full setlist" 
              tabIndex={this.props.confirmDialog === 'open' ? -1 : 0} 
            />
          }
          <Button 
            addClassName="btn-close" 
            onClick={this.props.btnClose} 
            icon={<IconClose />} 
            title="Close choice view" 
            ariaLabel="Close choice view" 
            tabIndex={this.props.confirmDialog === 'open' ? -1 : 0} 
          />
        </div>
        <ul className="Modal-list">
          {this.props.songs
            .sort((a, b) => a > b ? 1 : -1)
            .map(item => 
              <li key={item}>
                <button 
                  className="ModalList-chooseBtn" 
                  type="button" 
                  onClick={this.props.chooseSong} 
                  aria-label={item} 
                  tabIndex={this.props.confirmDialog === 'open' ? -1 : 0}
                >
                  <div className="ModalList-circle">
                    <div></div>
                  </div>
                  <p>{item}</p>
                </button>
                <button 
                  className="ModalList-removeSongBtn" 
                  type="button" 
                  onClick={this.props.removeSong} 
                  data-song={item} 
                  title="Remove song from current list" 
                  aria-label={`Remove '${item}' from current list`} 
                  tabIndex={this.props.confirmDialog === 'open' ? -1 : 0}
                ></button>
              </li>
          )}
        </ul>
      </div>
    );
  }
}

export default Modal;