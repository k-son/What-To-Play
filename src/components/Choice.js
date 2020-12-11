import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { ReactComponent as IconRefresh } from '../icons/refresh.svg';
import { ReactComponent as IconClose } from '../icons/close.svg';
import '../variables.css';
import './Choice.css';

//didUpdate
// select button
// np  ReactDOM.findDOMNode(this.refs.theDiv).focus();

class Choice extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { progress, btnReload, songs, chooseSong, removeSong, confirmDialog } = this.props;
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
              tabIndex={confirmDialog === 'open' ? -1 : 0}
            />
          }
          <Link
            exact to="/" 
            tabIndex="-1"
            className="Choice-btn-close"
          >
            <Button 
              addClassName="btn-close" 
              icon={<IconClose />} 
              title="Close choice view" 
              ariaLabel="Close choice view"
              tabIndex={confirmDialog === 'open' ? -1 : 0}
            />
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
                    tabIndex={confirmDialog === 'open' ? -1 : 0}
                  >
                    <div className="ChoiceList-circle">
                      <div></div>
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
                  tabIndex={confirmDialog === 'open' ? -1 : 0}
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