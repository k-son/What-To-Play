import React, { Component } from 'react';
import { songList } from '../songList';
import Button from './Button';
import Display from './Display';
import Logo from './Logo';
import CurrentList from './CurrentList';
import ProgressBar from './ProgressBar';
import ProgressRing from './ProgressRing';
import Dialog from './Dialog';
import Modal from './Modal';
import { ReactComponent as IconBackArrow } from '../icons/back-arrow.svg';
import { ReactComponent as IconChoice } from '../icons/one.svg';
import { ReactComponent as IconDices } from '../icons/dices.svg';
import { ReactComponent as IconRefresh } from '../icons/refresh.svg';
import KeyDownListener from './KeyDownListener';
import MouseDownListener from './MouseDownListener';
// Styles
import './App.css';
import '../variables.css'
// Libraries
import CookieConsent from "react-cookie-consent";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';



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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.songs !== this.state.songs) {
      this.setCookie('currentSongList', this.state.songs, 1);
    }
    if (prevState.currentSong !== this.state.currentSong) {
      this.setCookie('currentSong', this.state.currentSong, 1);
    }
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


  // RENDER
  render() {
    return(
      <div className="App">
        {/* Adds outline to element on keyboard access. Removes outline whent accessed by mouse. */}
        <KeyDownListener onKeyDown={this.handleKeyDown} />
        <MouseDownListener onMouseDown={this.handleMouseDown} />
        {/* Logo at the top - for high viewports */}
        <div className="Logo-box-desktop">
          <Logo />
        </div>
        <main>
          {/* [pure-react-carousel] For small viewports. With the buttons you can switch between circular progress bar and current song list. */}
          <div className="Carousel-box">
            <CarouselProvider className="mobileCarousel"
              naturalSlideWidth={200}
              naturalSlideHeight={200}
              totalSlides={2}
              touchEnabled={false}
            >
              <Slider className="mobileCarousel-slider" tabIndex={-1}>
                <Slide className="mobileCarousel-slide" index={0} tabIndex={-1}>
                  <ProgressRing 
                    sqSize="140" 
                    strokeWidth="6" 
                    songsLeft={this.state.songs.length} 
                    percentage={this.progress()} />
                </Slide>
                <Slide className="mobileCarousel-slide" index={1} tabIndex={-1}>
                  <div><CurrentList songs={this.state.songs} /></div>
                </Slide>
              </Slider>
              <div className="mobileCarousel-buttons">
                <ButtonBack tabIndex={(this.state.modal === 'open' || this.state.confirmDialog === 'open') ? -1 : 0}>Progress</ButtonBack>
                <ButtonNext tabIndex={(this.state.modal === 'open' || this.state.confirmDialog === 'open') ? -1 : 0}>Song list</ButtonNext>
              </div>
            </CarouselProvider>
          </div>
          {/* Horizontal progress bar and current song list, both visible at the same time - for higher viewports. */}
          <div className="Progress-box">
            <CurrentList songs={this.state.songs} />
            <ProgressBar 
              progress={this.progress()} 
              songsLeft={this.state.songs.length} 
            />
          </div>
          {/* Showcase displaying song title to play. When no song drawn/selected, displays 'song to play' text. */}
          <div className="Display-box">
            <Display 
              song={this.state.currentSong} 
              slideTitle={this.state.slideTitle} 
            />
            {this.state.currentSong === ' ' && <p className="substitution">song to play</p>}
          </div>
          {/* Main buttons */}
          <div className="Buttons-box">
            <div className="App-buttons">
              {this.state.songs.length > 0 ? 
                <Button 
                  addClassName="btn-draw" 
                  onClick={this.drawSong} 
                  icon={<IconDices />} 
                  description="Draw" 
                  title="Draw random song" 
                  ariaLabelledby="Draw" 
                  tabIndex={(this.state.modal === 'open' || this.state.confirmDialog === 'open') ? -1 : 0} 
                /> 
                : 
                <Button 
                  addClassName="btn-reload" 
                  onClick={this.reloadFullSongList} 
                  icon={<IconRefresh />} 
                  description="Reload" 
                  title="Reload full setlist" 
                  ariaLabelledby="Reload" 
                  tabIndex={(this.state.modal === 'open' || this.state.confirmDialog === 'open') ? -1 : 0} 
                />
              }
              {this.state.songs.length > 0 && this.state.currentSong !== ' ' ? 
                <Button 
                  addClassName="btn-arrow" 
                  onClick={this.putBackCurrentSong} 
                  icon={<IconBackArrow />} 
                  description="Back" 
                  title="Put back current song" 
                  ariaLabelledby="Back" 
                  tabIndex={(this.state.modal === 'open' || this.state.confirmDialog === 'open') ? -1 : 0} 
                /> 
                : null 
              }
              {this.state.songs.length > 0 && 
                <Button 
                  addClassName="btn-choice" 
                  onClick={this.openModal} 
                  icon={<IconChoice />} 
                  description="Choose" 
                  title="Choose song manually" 
                  ariaLabelledby="Choose" 
                  tabIndex={(this.state.modal === 'open' || this.state.confirmDialog === 'open') ? -1 : 0} 
                />
              }
            </div>
          </div>
        </main>
        {/* Logo at the bottom - for lower viewports */}
        <div className="Logo-box-mobile">
          <Logo />
        </div>

        {/* Confirm dialog. Out of the normal document flow. */}
        <Dialog 
          isOpen={this.state.confirmDialog} 
          question={this.state.confirmQuestion} 
          songTitle={this.state.confirmTitle} 
          onCancel={this.state.confirmCancel} 
          onConfirm={this.state.confirmOk} 
        />

        {/* Modal. Out of the normal document flow. */}
        <Modal
          modal={this.state.modal}
          confirmDialog={this.state.confirmDialog}
          songs={this.state.songs}
          progress={this.progress()}
          btnReload={this.reloadFullSongListConfirm}
          btnClose={this.closeModal}
          chooseSong={this.chooseSong}
          removeSong={this.removeSong}
        />

        {/* Cookie consent. Out of the normal document flow. [react-cookie-consent library] */}
        <CookieConsent
          style={{
            alignItems: "center", 
            justifyContent: "flex-start", 
            padding: "20px", 
            backgroundColor: "rgba(0,0,0,0.75)", 
            fontWeight: "300", 
            lineHeight: "1.6", 
            letterSpacing: "1px"
          }}
          contentStyle={{
            flex: "0 1 auto", 
            marginRight: "20px", 
            marginBottom: "20px"
          }}
          buttonStyle={{
            height: "40px", 
            borderRadius: "3px", 
            fontSize: "16px"
          }}
          >This website uses cookies to enhance the user experience.
        </CookieConsent>
      </div>
    );
  }
}

export default App;
