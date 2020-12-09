import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { songList } from './songList';
import Draw from './components/Draw';
import Choice from './components/Choice';
import Dialog from './components/Dialog';

class App extends Component {
  static defaultProps = {
    songs: songList
  }
  constructor(props) {
    super(props);
    this.state = {
      songs: this.getCookie('currentSongList') !== false ? this.getCookie('currentSongList').split(',') : this.props.songs,
      currentSong: this.getCookie('currentSong') !== false ? this.getCookie('currentSong') : ' ',
      slideTitle: 'off', //animates song title in Display
      modal: 'closed',
      confirmDialog: 'closed',
      confirmQuestion: ' ',
      confirmTitle: ' ',
      confirmCancel: undefined,
      confirmOk: undefined
    };
    this.setCookie = this.setCookie.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.drawSong = this.drawSong.bind(this);
    this.reloadFullSongList = this.reloadFullSongList.bind(this);
    this.reloadFullSongListConfirm = this.reloadFullSongListConfirm.bind(this);
    this.putBackCurrentSong = this.putBackCurrentSong.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.chooseSong = this.chooseSong.bind(this);
    this.removeSong = this.removeSong.bind(this);
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.songs !== this.state.songs) {
      this.setCookie('currentSongList', this.state.songs, 1);
    }
    if (prevState.currentSong !== this.state.currentSong) {
      this.setCookie('currentSong', this.state.currentSong, 1);
    }
  }

  
  // Cookies
  setCookie(name, val, days, path, domain, secure) {
    if (navigator.cookieEnabled) { //czy ciasteczka są włączone
        const cookieName = encodeURIComponent(name);
        const cookieVal = encodeURIComponent(val);
        let cookieText = cookieName + "=" + cookieVal;

        if (typeof days === "number") {
            const data = new Date();
            data.setTime(data.getTime() + (days * 24*60*60*1000));
            cookieText += "; expires=" + data.toGMTString();
        }

        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }

        document.cookie = cookieText;
    }
  }

  getCookie(name) {
    if (document.cookie !== "") {
        const cookies = document.cookie.split(/; */);

        for (let i=0; i<cookies.length; i++) {
            const cookiesPart = cookies[i].split("=");
            const cookieName = cookiesPart[0];
            const cookieVal = cookiesPart[1];
            if (cookieName === decodeURIComponent(name)) {
                return decodeURIComponent(cookieVal);
            }
        }
    }
    return false;
  }


  // On Draw Button press - draw a random song from current song list
  drawSong() {
    const index = Math.floor(Math.random()*(this.state.songs.length));
    const drawnSong = this.state.songs[index];
    const filteredList = this.state.songs.filter(el => el !== drawnSong);

    this.setState({
      songs: filteredList,
      currentSong: drawnSong,
      slideTitle: 'on'
    });

    setTimeout(() => {
      this.setState({
        slideTitle: 'off'
      })
    }, 10)
  }


  // On Back Button press - move back drawn song to current song list
  putBackCurrentSong() {
    this.setState({
      songs: this.state.songs.concat(this.state.currentSong),
      currentSong: ' '
    })
  }


  // On Choose Button press - opens a modal view, then you choose song to play from current song list
  chooseSong(e) {
    const chosenSong = e.target.textContent;
    const filteredList = this.state.songs.filter(el => el !== chosenSong);

    this.setState({
      songs: filteredList,
      currentSong: chosenSong,
      modal: 'closed'
    })
  }


  // On Reload Button press - loads full setlist when you want to start all over
  reloadFullSongList() {
    this.setState({
      songs: this.props.songs,
      currentSong: ' '
    })
  }


  // Reloads full setlist - accessible in modal window when at least one song has already been drawn/chosen
  reloadFullSongListConfirm() {
    const closeConfirmDialog = () => {
      this.setState({
        confirmDialog: 'closed',
        confirmCancel: undefined,
        confirmOk: undefined
      })
      document.body.style.overflow = 'auto';
    }
    const reload = () => {
      this.reloadFullSongList();
      this.setState({
        confirmDialog: 'closed',
        confirmCancel: undefined,
        confirmOk: undefined,
        modal: 'closed'
      })
      document.body.style.overflow = 'auto';
    }

    this.setState({
      confirmQuestion: 'Reload full setlist?',
      confirmDialog: 'open',
      confirmCancel: closeConfirmDialog,
      confirmOk: reload
    })

    document.body.style.overflow = 'hidden';
  }


  // Tracks percentage of the songs left to play in current song list
  progress() {
    const percentage = Math.ceil(parseFloat(this.state.songs.length / this.props.songs.length).toFixed(2) * 100);
    return percentage;
  }


  // Opens modal view with current song list
  openModal() {
    this.setState({
      modal: 'open'
    })
  }


  // Closes modal view
  closeModal() {
    this.setState({
      modal: 'closed'
    })
  }


  // Remove song from current song list 
  removeSong(e) {
    const songToRemove = e.target.dataset.song;
    const closeConfirmDialog = () => {
      this.setState({
        confirmQuestion: ' ',
        confirmTitle: ' ',
        confirmDialog: 'closed',
        confirmCancel: undefined,
        confirmOk: undefined
      })
      document.body.style.overflow = 'auto';
    }; 
    const remove = () => {
      const filteredList = this.state.songs.filter(el => el !== songToRemove);
      this.setState({
        songs: filteredList,
        confirmQuestion: ' ',
        confirmTitle: ' ',
        confirmDialog: 'closed',
        confirmCancel: undefined,
        confirmOk: undefined
      })
      if (this.state.songs.length === 1) {
        this.setState({
          modal: 'closed'
        })
      }
      document.body.style.overflow = 'auto';
    }
    
    this.setState({
      confirmQuestion: 'Remove song from current list?',
      confirmTitle: songToRemove,
      confirmDialog: 'open',
      confirmCancel: closeConfirmDialog,
      confirmOk: remove
    })

    document.body.style.overflow = 'hidden';
  }


  // Adds outline to buttons when accessing by keyboard 
  handleKeyDown() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
          document.body.classList.remove('intent-mouse')
      }
    });
  }


  // Removes outline from buttons on mouse click 
  handleMouseDown() {
    document.addEventListener('mousedown', () =>
    document.body.classList.add('intent-mouse') 
    );
  }

  render() {
    return(
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Draw 
              songs={this.state.songs}
              song={this.state.currentSong}
              progress={this.progress()}
              songsLeft={this.state.songs.length}
              slideTitle={this.state.slideTitle}
              drawSong={this.drawSong}
              reloadFullSongList={this.reloadFullSongList}
              putBackCurrentSong={this.putBackCurrentSong}
              confirmDialog={this.state.confirmDialog}
              confirmQuestion={this.state.confirmQuestion}
              confirmTitle={this.state.confirmTitle}
              confirmCancel={this.state.confirmCancel}
              confirmOk={this.state.confirmOk}
            />
          </Route>
          <Route exact path="/choice">
            <Choice 
              confirmDialog={this.state.confirmDialog}
              songs={this.state.songs}
              progress={this.progress()}
              btnReload={this.reloadFullSongListConfirm}
              btnClose={this.closeModal}
              chooseSong={this.chooseSong}
              removeSong={this.removeSong}
              reloadFullSongList={this.reloadFullSongList}
            />
          </Route>
        </Switch>
      {/* Confirm dialog. Out of the normal document flow. */}
      <Dialog 
        isOpen={this.state.confirmDialog} 
        question={this.state.confirmQuestion} 
        songTitle={this.state.confirmTitle} 
        onCancel={this.state.confirmCancel} 
        onConfirm={this.state.confirmOk} 
      />
      </div>
    );
  }
} 

export default App;