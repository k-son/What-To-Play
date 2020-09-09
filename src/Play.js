import React, {Component} from 'react';
import Button from './components/Button';
import Display from './components/Display';
import Logo from './components/Logo';
import CurrentList from './components/CurrentList';
import ProgressBar from './components/ProgressBar';
import ProgressRing from './components/ProgressRing';
import KeyDownListener from './components/KeyDownListener';
import MouseDownListener from './components/MouseDownListener';
import {ReactComponent as IconBackArrow} from './icons/back-arrow.svg';
import {ReactComponent as IconChoice} from './icons/one.svg';
import {ReactComponent as IconDices} from './icons/dices.svg';
import {ReactComponent as IconRefresh} from './icons/refresh.svg';
import {ReactComponent as IconClose} from './icons/close.svg';
import {songList} from './songList';
import './Play.css';
import './variables.css'
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


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
    this.reloadFullSongListConfirm = this.reloadFullSongListConfirm.bind(this);
    this.putBackCurrentSong = this.putBackCurrentSong.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.chooseSong = this.chooseSong.bind(this);
    this.removeSong = this.removeSong.bind(this);
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

  reloadFullSongListConfirm() {
    if (window.confirm('Reload full setlist?')) {
      this.reloadFullSongList();
      this.setState({
        modal: 'hidden'
      })
    }
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

  // choose a song to play in modal view
  chooseSong(e) {
    const chosenSong = e.target.textContent;
    const filteredList = this.state.songs.filter(el => el !== chosenSong);
    this.setState({
      songs: filteredList,
      currentSong: chosenSong,
      modal: 'hidden'
    })
  }

  // remove song from current song list 
  removeSong(e) {
    const songToRemove = e.target.dataset.song;
    if (window.confirm(`Remove '${songToRemove}' from current list?`)) {
      const filteredList = this.state.songs.filter(el => el !== songToRemove);
      this.setState({
        songs: filteredList
      })
      if (this.state.songs.length === 1) {
        this.setState({
          modal: 'hidden'
        })
      }
    }
  }

  // tracks percentage of the songs left to play
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
        
        <CarouselProvider className="mobileCarousel"
          naturalSlideWidth={300}
          naturalSlideHeight={300}
          totalSlides={2}
        >
          <Slider className="mobileCarousel-slider">
            <Slide className="mobileCarousel-slide" index={0}><ProgressRing sqSize="200" strokeWidth="8" songsLeft={this.state.songs.length} percentage={this.progress()}/></Slide>
            <Slide className="mobileCarousel-slide" index={1}><div><CurrentList songs={this.state.songs} /></div></Slide>
          </Slider>
          <div className="mobileCarousel-buttons">
            <ButtonBack>Progress</ButtonBack>
            <ButtonNext>Song list</ButtonNext>
          </div>
        </CarouselProvider>
        <div className="Play-box">
          <Display song={this.state.currentSong} />
          <div className="Play-buttons">
            {this.state.songs.length > 0 ? 
              <Button addClass="btn-draw" action={this.drawSong} icon={<IconDices />} description="Draw" tabindex="1" title="Draw random song" ariaLabelledby="Draw" /> : 
              <Button addClass="btn-reload" action={this.reloadFullSongList} icon={<IconRefresh />} description="Reload" tabindex="1" title="Reload full setlist" ariaLabelledby="Reload" />}
            {this.state.songs.length > 0 && this.state.currentSong !== ' ' ? 
              <Button addClass="btn-arrow" action={this.putBackCurrentSong} icon={<IconBackArrow />} description="Back" tabindex="2" title="Put back current song" ariaLabelledby="Back" /> : 
              null }
            {this.state.songs.length > 0 && <Button addClass="btn-choice" action={this.openModal} icon={<IconChoice />} description="Choose" tabindex="2" title="Choose song manually" ariaLabelledby="Choose" />}
          </div>
        </div>
        <div className={`Play-modal-${this.state.modal}`}>
          <div className="Modal-buttons">
            <Button addClass="btn-reload" action={this.reloadFullSongListConfirm} icon={<IconRefresh />} title="Reload full setlist" ariaLabel="Reaload full setlist"/>
            <Button addClass="btn-close" action={this.closeModal} icon={<IconClose />} title="Close choice view" ariaLabel="Close choice view"/>
          </div>
          <ul className="Play-modal-list">
            {this.state.songs
              .sort((a, b) => a > b ? 1 : -1)
              .map(item => 
                <li key={item}>
                  <button className="ModalList-chooseBtn" type="button" onClick={this.chooseSong} aria-labelledby={item}>
                    <div className="Play-circle">
                      <div></div>
                    </div>
                    <p>{item}</p>
                  </button>
                  <button className="ModalList-removeSongBtn" type="button" onClick={this.removeSong} data-song={item} title="Remove song from current list" aria-label="remove song from current list"></button>
                </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Play;
