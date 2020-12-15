import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as IconRefresh } from '../icons/refresh.svg';
import { ReactComponent as IconClose } from '../icons/close.svg';
import '../variables.css';
import './Choice.css';

class Choice extends Component {
  constructor(props) {
    super(props);
    this.getFocus = React.createRef();
  }

  componentDidUpdate() {
    this.getFocus.current.focus();
  }

  render() {
    const { progress, reloadSetlist, songs, chooseSong, removeSong, confirmDialog, redirect } = this.props;

    if (songs.length === 0) {
      redirect();
    }
    
    let isDialogOpen;
    if (confirmDialog === 'open') {
      isDialogOpen = -1;
    } else {
      isDialogOpen = 0;
    }
    
    return (
      <div className={`Choice ${confirmDialog === 'open' && 'padding-right-20'}`}>
        <div className="Choice-buttons">
          {progress < 100 && 
            <button 
              className="button-reload" 
              onClick={reloadSetlist} 
              title="Reload full setlist" 
              aria-label="Reaload full setlist"
              tabIndex={isDialogOpen}
            >
              <IconRefresh />
            </button>
          }
          <Link
            exact to="/" 
            tabIndex="-1"
          >
            <button 
              className="button-close" 
              title="Close choice view" 
              aria-label="Close choice view"
              tabIndex={isDialogOpen}
              ref={this.getFocus}
            >
              <IconClose />
            </button>
          </Link>
        </div>
        <ul className="Choice-list">
          {songs
            .sort((a, b) => a > b ? 1 : -1)
            .map(item => 
              <li key={item}>
                <Link 
                  exact to="/"
                  tabIndex="-1"
                >
                  <button 
                    className="ChoiceList-chooseBtn" 
                    type="button" 
                    onClick={chooseSong} 
                    aria-label={item} 
                    tabIndex={isDialogOpen}
                  >
                    <div className="ChoiceList-circle">
                      <div />
                    </div>
                    <p>{item}</p>
                  </button>
                </Link>
                <button 
                  className="ChoiceList-removeSongBtn" 
                  type="button" 
                  onClick={removeSong} 
                  data-song={item} 
                  title="Remove song from current list" 
                  aria-label={`Remove '${item}' from current list`} 
                  tabIndex={isDialogOpen}
                />
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default Choice;