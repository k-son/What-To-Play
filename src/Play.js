import React, {Component} from 'react';
import Button from './components/Button';
import Display from './components/Display';
import Logo from './components/Logo';
import ProgressBar from './components/ProgressBar';
import KeyDownListener from './components/KeyDownListener';
import MouseDownListener from './components/MouseDownListener';
import {ReactComponent as IconBackArrow} from './icons/back-arrow.svg';
import {ReactComponent as IconChoice} from './icons/one.svg';
import {ReactComponent as IconDices} from './icons/dices.svg';
import {ReactComponent as IconRefresh} from './icons/refresh.svg';
import {songList} from './songList';
import './Play.css';
import './variables.css'


class Play extends Component {
  static defaultProps = {
    songs: songList
  }

  constructor(props) {
    super(props);
    this.state = {
      songs: this.props.songs,
      currentSong: ' ',
      modal: 'hidden'
    };
    this.drawSong = this.drawSong.bind(this);
    this.reloadFullSongList = this.reloadFullSongList.bind(this);
    this.putBackCurrentSong = this.putBackCurrentSong.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.chooseSong = this.chooseSong.bind(this);
  }

  drawSong() {
    const index = Math.floor(Math.random()*(this.state.songs.length));
    const drawnSong = this.state.songs[index];
    const filteredList = this.state.songs.filter(el => el !== drawnSong);
    this.setState({
      songs: filteredList,
      currentSong: drawnSong
    });
  }

  reloadFullSongList() {
    this.setState({
      songs: this.props.songs,
      currentSong: ' '
    })
  }

  putBackCurrentSong() {
    this.setState({
      songs: this.state.songs.concat(this.state.currentSong),
      currentSong: ' '
    })
  }

  openModal() {
    this.setState({
      modal: 'visible'
    })
  }

  closeModal() {
    this.setState({
      modal: 'hidden'
    })
  }

  chooseSong(e) {
    const chosenSong = e.target.textContent;
    const filteredList = this.state.songs.filter(el => el !== chosenSong);
    this.setState({
      songs: filteredList,
      currentSong: chosenSong,
      modal: 'hidden'
    })
  }

  progress() {
    const percentage = Math.ceil(parseFloat(this.state.songs.length / this.props.songs.length).toFixed(2) * 100);
    return percentage;
  }

  // add outline to buttons when accessing by keyboard 
  handleKeyDown() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
          document.body.classList.remove('intent-mouse')
      }
    });
  }

  // removes outline from buttons when accessing by mouse click 
  handleMouseDown() {
    document.addEventListener('mousedown', () =>
    document.body.classList.add('intent-mouse') 
    );
  }

  render() {
    return(
      <div className="Play">
        <KeyDownListener onKeyDown={this.handleKeyDown} />
        <MouseDownListener onMouseDown={this.handleMouseDown} />
        <Logo />
        <div className="Play-listContainer">
          <ul className="Play-list">
            {this.state.songs
              .sort((a, b) => a > b ? 1 : -1)
              .map(item => <li key={item}><span className="Play-dot">&bull;</span>{item}</li>
            )}
          </ul>
        </div>
        <div className="Play-box">
          <ProgressBar progress={this.progress()} />
          <Display song={this.state.currentSong} />
          <div className="Play-buttons">
            {this.state.songs.length > 0 ? 
              <Button id="btn-draw" action={this.drawSong} icon={<IconDices />} tabindex="1" labelledby="Draw" description="Draw" /> : 
              <Button id="btn-reload" action={this.reloadFullSongList} icon={<IconRefresh />} tabindex="1" labelledby="Reload" description="Reload" />}
            {this.state.songs.length > 0 && this.state.currentSong !== ' ' ? 
              <Button id="btn-arrow" action={this.putBackCurrentSong} icon={<IconBackArrow />} tabindex="2" labelledby="Back" description="Back" /> : 
              null }
            {this.state.songs.length > 0 && <Button id="btn-choice" action={this.openModal} icon={<IconChoice />} tabindex="2" labelledby="Choose" description="Choose" />}
          </div>
        </div>
        <div className={`Play-modal-${this.state.modal}`}>
          <button type="button" className="Play-modal-closeBtn" onClick={this.closeModal}>
            <span className="xBar xBar-1">
              <span className="circle circle-left"></span>
              <span className="circle circle-right"></span>
            </span>
            <span className="xBar xBar-2">
              <span className="circle circle-left"></span>
              <span className="circle circle-right"></span>
            </span>
          </button>
          <ul className="Play-modal-list">
            {this.state.songs
              .sort((a, b) => a > b ? 1 : -1)
              .map(item => 
                <li key={item}>
                  <button type="button" onClick={this.chooseSong} aria-labelledby={item}>
                    <div className="Play-circle">
                      <div></div>
                    </div>
                    <p id={item}>{item}</p>
                  </button>
                </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Play;
