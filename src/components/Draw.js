import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import Display from './Display';
import Logo from './Logo';
import CurrentList from './CurrentList';
import ProgressBar from './ProgressBar';
import ProgressRing from './ProgressRing';
import { ReactComponent as IconBackArrow } from '../icons/back-arrow.svg';
import { ReactComponent as IconChoice } from '../icons/one.svg';
import { ReactComponent as IconDices } from '../icons/dices.svg';
import { ReactComponent as IconRefresh } from '../icons/refresh.svg';
// Styles
import './Draw.css';
import '../variables.css'
// Libraries
import CookieConsent from "react-cookie-consent";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

class Draw extends Component {
  render() {
    const { songs, songsLeft, currentSong, progress, slideTitle, drawSong, reloadFullSongList, putBackCurrentSong } = this.props;
    return (
      <div className="Draw">
        {/* Logo at the top - for high viewports */}
        <div className="Logo-box-desktop">
          <Logo />
        </div>
        <main>
          {/* [pure-react-carousel] For small viewports. With the buttons you can switch between circular progress bar and current song list. */}
          <div className="Carousel-box">
            <CarouselProvider 
              className="mobileCarousel"
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
                    songsLeft={songsLeft} 
                    percentage={progress} />
                </Slide>
                <Slide className="mobileCarousel-slide" index={1} tabIndex={-1}>
                  <div>
                    <CurrentList songs={songs} />
                  </div>
                </Slide>
              </Slider>
              <div className="mobileCarousel-buttons">
                <ButtonBack tabIndex={songsLeft ? 0 : -1}>Progress</ButtonBack>
                <ButtonNext tabIndex={songsLeft ? 0 : -1}>Song list</ButtonNext>
              </div>
            </CarouselProvider>
          </div>
          {/* Horizontal progress bar and current song list, both visible at the same time - for higher viewports. */}
          <div className="Progress-box">
            <CurrentList songs={songs} />
            <ProgressBar 
              progress={progress} 
              songsLeft={songsLeft} 
            />
          </div>
          {/* Showcase displaying song title to play. When no song drawn/selected, displays 'song to play' text. */}
          <div className="Display-box">
            <Display 
              currentSong={currentSong} 
              slideTitle={slideTitle} 
            />
            {/* When no choosen/drawn song, display 'song to play' text */}
            {currentSong === ' ' && <p className="substitution">song to play</p>}
          </div>
          {/* Main buttons */}
          <div className="Buttons-box">
            <div className="Draw-buttons">
              {songsLeft > 0 ? 
                <Button 
                  action="draw"
                  onClick={drawSong}
                  icon={<IconDices />} 
                  description="Draw" 
                  title="Draw random song" 
                  aria-label="Draw"
                  tabIndex="1"
                /> 
                : 
                <Button 
                  action="reload"
                  onClick={reloadFullSongList} 
                  icon={<IconRefresh />}
                  description="Reload" 
                  title="Reload full setlist" 
                  aria-label="Reload"
                />
              }
              {songsLeft > 0 && currentSong !== ' ' ? 
                <Button 
                  action="putBack"
                  onClick={putBackCurrentSong} 
                  icon={<IconBackArrow />} 
                  description="Back" 
                  title="Put back current song" 
                  aria-label="Put back"
                /> 
                : null 
              }
              {songsLeft > 0 && 
                <Link exact to="/choice" className="Link-btn-choice" tabIndex="-1">
                  <Button 
                    action="choose"
                    icon={<IconChoice />} 
                    description="Choose" 
                    title="Choose song manually" 
                    aria-label="Choose"
                  />
                </Link>
              }
            </div>
          </div>
        </main>
        {/* Logo at the bottom - for lower viewports */}
        <div className="Logo-box-mobile">
          <Logo />
        </div>

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

export default Draw;
