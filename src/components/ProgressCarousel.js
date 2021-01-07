import React from 'react';
import ProgressRing from './ProgressRing';
import CurrentList from './CurrentList';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import '../styles/ProgressCarousel.css';


function ProgressCarousel({ songsLeft, percentage, songs }) {
  return (
    <CarouselProvider
      className="progressCarousel"
      naturalSlideWidth={200}
      naturalSlideHeight={200}
      totalSlides={2}
      touchEnabled={false}
    >
      <Slider 
        className="progressCarousel-slider"
        tabIndex={-1}
      >
        <Slide 
          className="progressCarousel-slide" 
          index={0} 
          tabIndex={-1}
        >
          <ProgressRing 
            sqSize="140" 
            strokeWidth="6" 
            songsLeft={songsLeft} 
            percentage={percentage} 
          />
        </Slide>
        <Slide 
          className="progressCarousel-slide" 
          index={1} 
          tabIndex={-1}
        >
          <div>
            <CurrentList songs={songs} />
          </div>
        </Slide>
      </Slider>
      {/*  With the buttons you can switch between circular progress bar and current song list. */}
      <div className="progressCarousel-buttons">
        <ButtonBack tabIndex={songsLeft ? 0 : -1}>Progress</ButtonBack>
        <ButtonNext tabIndex={songsLeft ? 0 : -1}>Song list</ButtonNext>
      </div>
    </CarouselProvider>
  );
};

export default ProgressCarousel;