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
import KeyDownListener from './KeyDownListener';
import MouseDownListener from './MouseDownListener';
// Styles
import './Draw.css';
import '../variables.css'
// Libraries
import CookieConsent from "react-cookie-consent";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';



class Draw extends Component {

  render() {
    return(
      <div className="Draw">
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
                    songsLeft={this.props.songsLeft} 
                    percentage={this.props.progress} />
                </Slide>
                <Slide className="mobileCarousel-slide" index={1} tabIndex={-1}>
                  <div><CurrentList songs={this.props.songs} /></div>
                </Slide>
              </Slider>
              <div className="mobileCarousel-buttons">
                <ButtonBack>Progress</ButtonBack>
                <ButtonNext>Song list</ButtonNext>
              </div>
            </CarouselProvider>
          </div>
          {/* Horizontal progress bar and current song list, both visible at the same time - for higher viewports. */}
          <div className="Progress-box">
            <CurrentList songs={this.props.songs} />
            <ProgressBar 
              progress={this.props.progress} 
              songsLeft={this.props.songsLeft} 
            />
          </div>
          {/* Showcase displaying song title to play. When no song drawn/selected, displays 'song to play' text. */}
          <div className="Display-box">
            <Display 
              song={this.props.song} 
              slideTitle={this.props.slideTitle} 
            />
            {this.props.song === ' ' && <p className="substitution">song to play</p>}
          </div>
          {/* Main buttons */}
          <div className="Buttons-box">
            <div className="Draw-buttons">
              {this.props.songsLeft > 0 ? 
                <Button 
                  addClassName="btn-draw" 
                  onClick={this.props.drawSong}
                  icon={<IconDices />} 
                  description="Draw" 
                  title="Draw random song" 
                  ariaLabelledby="Draw"
                /> 
                : 
                <Button 
                  addClassName="btn-reload" 
                  onClick={this.props.reloadFullSongList} 
                  icon={<IconRefresh />}
                  description="Reload" 
                  title="Reload full setlist" 
                  ariaLabelledby="Reload"
                />
              }
              {this.props.songsLeft > 0 && this.props.song !== ' ' ? 
                <Button 
                  addClassName="btn-arrow" 
                  onClick={this.props.putBackCurrentSong} 
                  icon={<IconBackArrow />} 
                  description="Back" 
                  title="Put back current song" 
                  ariaLabelledby="Back"
                /> 
                : null 
              }
              {this.props.songsLeft > 0 && 
                <Link exact to="/choice" className="Link-btn-choice" tabIndex="-1">
                  <Button 
                    addClassName="btn-choice" 
                    icon={<IconChoice />} 
                    description="Choose" 
                    title="Choose song manually" 
                    ariaLabelledby="Choose"
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
