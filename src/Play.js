import React, {Component} from 'react';

import {songList} from './songList';
import Button from './components/Button';
import Display from './components/Display';
import DisplayMinimal from './components/DisplayMinimal';
import Logo from './components/Logo';
import CurrentList from './components/CurrentList';
import ProgressBar from './components/ProgressBar';
import ProgressRing from './components/ProgressRing';
import Dialog from './components/Dialog';
import {ReactComponent as IconBackArrow} from './icons/back-arrow.svg';
import {ReactComponent as IconChoice} from './icons/one.svg';
import {ReactComponent as IconDices} from './icons/dices.svg';
import {ReactComponent as IconRefresh} from './icons/refresh.svg';
import {ReactComponent as IconClose} from './icons/close.svg';
// Functionals
import KeyDownListener from './components/KeyDownListener';
import MouseDownListener from './components/MouseDownListener';
// Styles
import './Play.css';
import './variables.css'
// Libraries
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
      modal: 'closed',
      confirmDialog: 'closed',
      confirmQuestion: ' ',
      confirmTitle: ' ',
      confirmCancel: undefined,
      confirmOk: undefined
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


  /* Reload full song list - accessible in modal window */
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


  putBackCurrentSong() {
    this.setState({
      songs: this.state.songs.concat(this.state.currentSong),
      currentSong: ' '
    })
  }


  openModal() {
    this.setState({
      modal: 'open'
    })
  }


  closeModal() {
    this.setState({
      modal: 'closed'
    })
  }


  // choose a song to play in modal view
  chooseSong(e) {
    const chosenSong = e.target.textContent;
    const filteredList = this.state.songs.filter(el => el !== chosenSong);

    this.setState({
      songs: filteredList,
      currentSong: chosenSong,
      modal: 'closed'
    })
  }


  // remove song from current song list 
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
        <main>
          <div className="Carousel-box">
            <CarouselProvider className="mobileCarousel"
              naturalSlideWidth={200}
              naturalSlideHeight={200}
              totalSlides={2}
              touchEnabled={false}
            >
              <Slider className="mobileCarousel-slider">
                <Slide className="mobileCarousel-slide" index={0}><ProgressRing sqSize="140" strokeWidth="6" songsLeft={this.state.songs.length} percentage={this.progress()}/></Slide>
                <Slide className="mobileCarousel-slide" index={1}><div><CurrentList songs={this.state.songs} /></div></Slide>
              </Slider>
              <div className="mobileCarousel-buttons">
                <ButtonBack>Progress</ButtonBack>
                <ButtonNext>Song list</ButtonNext>
              </div>
            </CarouselProvider>
          </div>
          <div className="Display-box">
            <Display song={this.state.currentSong} />
            {this.state.currentSong === ' ' && <p className="substitution">song to play</p>}
          </div>
          <div className="Buttons-box">
            <div className="Play-buttons">
              {this.state.songs.length > 0 ? 
                <Button addClass="btn-draw" action={this.drawSong} icon={<IconDices />} description="Draw" title="Draw random song" ariaLabelledby="Draw" tabIndex={(this.state.modal === 'open' || this.state.confirmDialog === 'open') ? -1 : 0} /> : 
                <Button addClass="btn-reload" action={this.reloadFullSongList} icon={<IconRefresh />} description="Reload" title="Reload full setlist" ariaLabelledby="Reload" tabIndex={(this.state.modal === 'open' || this.state.confirmDialog === 'open') ? -1 : 0} />}
              {this.state.songs.length > 0 && this.state.currentSong !== ' ' ? 
                <Button addClass="btn-arrow" action={this.putBackCurrentSong} icon={<IconBackArrow />} description="Back" title="Put back current song" ariaLabelledby="Back" tabIndex={(this.state.modal === 'open' || this.state.confirmDialog === 'open') ? -1 : 0} /> : 
                null }
              {this.state.songs.length > 0 && <Button addClass="btn-choice" action={this.openModal} icon={<IconChoice />} description="Choose" title="Choose song manually" ariaLabelledby="Choose" tabIndex={(this.state.modal === 'open' || this.state.confirmDialog === 'open') ? -1 : 0} />}
            </div>
          </div>
        </main>
        <Logo />
        <Dialog isOpen={this.state.confirmDialog} question={this.state.confirmQuestion} songTitle={this.state.confirmTitle} onCancel={this.state.confirmCancel} onConfirm={this.state.confirmOk} />
        <div className={`Play-modal-${this.state.modal}`}>
          <div className="Modal-buttons">
            {this.progress() < 100 && <Button addClass="btn-reload" action={this.reloadFullSongListConfirm} icon={<IconRefresh />} title="Reload full setlist" ariaLabel="Reaload full setlist" tabIndex={this.state.confirmDialog === 'open' ? -1 : 0} /> }
            <Button addClass="btn-close" action={this.closeModal} icon={<IconClose />} title="Close choice view" ariaLabel="Close choice view" tabIndex={this.state.confirmDialog === 'open' ? -1 : 0} />
          </div>
          <ul className="Play-modal-list">
            {this.state.songs
              .sort((a, b) => a > b ? 1 : -1)
              .map(item => 
                <li key={item}>
                  <button className="ModalList-chooseBtn" type="button" onClick={this.chooseSong} aria-labelledby={item} tabIndex={this.state.confirmDialog === 'open' ? -1 : 0}>
                    <div className="Play-circle">
                      <div></div>
                    </div>
                    <p>{item}</p>
                  </button>
                  <button className="ModalList-removeSongBtn" type="button" onClick={this.removeSong} data-song={item} title="Remove song from current list" aria-label="remove song from current list" tabIndex={this.state.confirmDialog === 'open' ? -1 : 0}></button>
                </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Play;
