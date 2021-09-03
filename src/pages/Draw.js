import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Display from '../components/Display';
import Logo from '../components/Logo';
import CurrentList from '../components/CurrentList';
import ProgressBar from '../components/ProgressBar';
import ProgressCarousel from '../components/ProgressCarousel';
import CookieAgreement from '../components/CookieAgreement';


const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  {/* background-image: radial-gradient(120% 150% at 50% 20%, #414141, #1a1a1a 60%); */}
  background-color: ${({theme}) => theme.color.white};
  overflow-x: hidden;

  @media screen and (min-height: 801px) {
    padding-top: 10px;
  }

  @media screen and (min-height: 901px) {
    padding-top: 24px;
  }
`;

const LogoBoxDesktop = styled.div`
  @media only screen and (max-height: 800px) {
    display: none;
  }
`;

const LogoBoxMobile = styled.div`
  @media only screen and (min-height: 801px) {
    display: none;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: calc(100vh - ${({theme}) => theme.logoHeight});
  padding: 10px 0;
  }

  @media screen and (min-height: 650px) {
    padding: 5vh 0;
  }

  @media screen and (min-height: 801px) {
    height: calc(100vh - ${({theme}) => theme.logoHeight} - 10px);
    padding: 7vh 0;
  }

  @media screen and (min-height: 901px) {
    height: calc(100vh - ${({theme}) => theme.logoHeight} - 24px);
    padding: 12vh 0 8vh;
  }

  @media screen and (min-height: 1201px) {
    padding: 16vh 0 8vh;
  }
`;

const CarouselBox = styled.div`
  @media screen and (min-height: 801px) {
    display: none;
  }
`;

const ProgressBox = styled.div`
  padding: 0 16px;

  @media only screen and (max-height: 800px) {
    display: none;
  }
`;

const DisplayBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 130px;
`;

const ButtonsBox = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 33.3333%);
  grid-template-rows: 1fr;
  grid-auto-flow: column;
  width: 86%;
  max-width: 400px;
  /* height: 150px; */
  margin: 0 auto 32px;
  z-index: 2;

    button[action='draw'] {
      grid-column: 2 / 3;
      justify-self: center;
    }

    button[action='putBack'] {
      grid-column: 1 / 2;
      justify-self: start;
    }

    button[action='reload'] {
      grid-column: 2 / 3;
      justify-self: center;
    }

    /* Link contains button[action='choice'] */
    a {
      grid-column: 3 / 4;
      justify-self: end;
      text-decoration: none;
    }
`;


class Draw extends Component {
  render() {
    const { songs, songsLeft, currentSong, progress, slideTitle, drawSong, reloadFullSongList, putBackCurrentSong } = this.props;

    return (
      <Wrapper>
        {/* Logo at the top - for high viewports */}
        <LogoBoxDesktop>
          <Logo />
        </LogoBoxDesktop>
        <MainContainer>
          {/* [pure-react-carousel] For small viewports. */}
          <CarouselBox>
            <ProgressCarousel 
              songsLeft={songsLeft} 
              percentage={progress}
              songs={songs}
            />
          </CarouselBox>
          {/* Horizontal progress bar and current song list, both visible at the same time - for higher viewports */}
          <ProgressBox>
            <CurrentList songs={songs} />
            <ProgressBar 
              progress={progress} 
              songsLeft={songsLeft} 
            />
          </ProgressBox>
          {/* Horizontal progress bar and current song list, both visible at the same time - for higher viewports */}
          <DisplayBox>
            <Display 
              currentSong={currentSong} 
              slideTitle={slideTitle} 
            />
          </DisplayBox>
          {/* Main buttons */}
          <ButtonsBox>
            {songsLeft > 0 ? 
              <Button 
                action="draw"
                onClick={drawSong}
                description="Draw" 
                title="Draw random song" 
                aria-label="Draw"
                tabIndex="1"
              /> 
              : 
              <Button 
                action="reload"
                onClick={reloadFullSongList} 
                description="Reload" 
                title="Reload full setlist" 
                aria-label="Reload"
              />
            }
            {songsLeft > 0 && currentSong !== ' ' ? 
              <Button 
                action="putBack"
                onClick={putBackCurrentSong} 
                description="Undo" 
                title="Put back current song" 
                aria-label="Put back"
              /> 
              : null 
            }
            {songsLeft > 0 && 
              <Link 
                className="Link-btn-choice" 
                exact="true" 
                to="/choice" 
                tabIndex="-1"
              >
                <Button 
                  action="choose"
                  description="Select" 
                  title="Choose song manually" 
                  aria-label="Choose"
                />
              </Link>
            }
          </ButtonsBox>
          {/* Logo at the bottom - for lower viewports */}
        </MainContainer>
        <LogoBoxMobile>
          <Logo />
        </LogoBoxMobile>
        <CookieAgreement />
      </Wrapper>
    );
  }
}

export default Draw;