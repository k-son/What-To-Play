import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

    this.TestBtn = React.createRef();
  }

  componentDidUpdate() {
    this.TestBtn.current.focus();
  }

  render() {
    const { progress, btnReload, songs, chooseSong, removeSong, confirmDialog } = this.props;
    return (
      <div className={`Choice ${confirmDialog === 'open' && 'padding-right-20'}`}>
        <div className="Choice-buttons">
          {progress < 100 && 
            <button 
              className="button-reload" 
              onClick={btnReload} 
              title="Reload full setlist" 
              aria-label="Reaload full setlist"
              tabIndex={confirmDialog === 'open' ? -1 : 0}
            >
              <IconRefresh />
            </button>
          }
          <Link
            exact to="/" 
            tabIndex="-1"
            className="Choice-btn-close"
          >
            <button 
              className="button-close" 
              title="Close choice view" 
              aria-label="Close choice view"
              tabIndex={confirmDialog === 'open' ? -1 : 0}
              ref={this.TestBtn}
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