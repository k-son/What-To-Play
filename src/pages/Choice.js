import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as IconRefresh } from '../icons/refresh.svg';
import { ReactComponent as IconBackArrow } from '../icons/back-arrow.svg';
import { ReactComponent as IconClose } from '../icons/close.svg';


const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  min-height: 100vh;
  background-image: radial-gradient(120% 150% at 50% 20%, #414141, #1a1a1a 60%);

  @media screen and (min-height: 801px) {
    padding-top: 4vh;
  }

  /* For non-touch devices. Scrollbar hides when Dialog is open - we prevent content from moving to the right */
  @media (hover: hover) and (pointer: fine) {
    padding-right: ${props => props.confirmDialog === 'open' && '20px'};
  }
`;

const TopButtonsBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px;
  padding-bottom: 16px;

    a {
      text-decoration: none;
    } 
`;

const TopButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 240px;
  height: 48px;
  padding: 4px 12px;
  background-color: rgba(255, 255, 255, .05);
  border: 2px solid transparent;
  border-radius: 25px;
  cursor: pointer;
  
  @media screen and (min-width: 1000px) {
    height: 54px;
    width: 280px;
  }

    &:hover,
    &:focus {
      border: 2px solid #888888;
    }

    svg {
      margin-right: 24px;
    }

    span {
      position: relative;
      transform: translateY(1px);
      font-size: 12px;
      line-height: 1;
      text-transform: uppercase;
      color: #aaa;
        
      @media screen and (min-width: 1000px) {
        font-size: 16px;
      }
    }
`;

const BackButton = styled(TopButton)`

  @media screen and (min-width: 1000px) {
      margin: 24px auto;
    }

    &:hover svg,
    &:focus svg {
      filter: saturate(350%);
    }

    &:active {
      border: 2px solid ${({theme}) => theme.color.yellow};
    }

    svg {
      height: 24px;
      width: auto;
      fill: ${({theme}) => theme.color.yellow};
    }
`;

const ReloadButton = styled(TopButton)`
  display: ${props => props.progress < 100 ? 'flex' : 'none'};
  margin-bottom: 80px;

  @media screen and (min-width: 1000px) {
    margin-top: 24px;
  }

    &:hover svg,
    &:focus svg {
      filter: saturate(300%);
    }

    &:active {
      border: 2px solid ${({theme}) => theme.color.green};
    }

    svg {
      height: 32px;
      width: auto;
      fill: ${({theme}) => theme.color.green};
    }
`;

const SongsList = styled.ul`
  list-style-type: none;
  width: 100%;
  margin: 0 auto;
`;

const SongsListItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 300px;
  max-width: 600px;
  margin: 12px auto;

  @media screen and (min-width: 1001px) {
    max-width: 800px;
  }

  &:not(:last-of-type)::after {
      content: "";
      display: block;
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      margin-right: 24px;
      width: 86%;
      height: 1px;
      background-color: #222222;

      @media screen and (min-width: 1001px) {
        width: 87%;
        margin-right: 16px;
      }
    }

    a {
      width: 70%;
      max-width: 640px;
      margin: 0 auto;
      text-decoration: none;
    }
`;

const SongButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: calc(16px + 6 * ((100vw - 320px) / 1360));
  background-color: transparent;
  border: none;
  border-radius: 25px;
  cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, .05);
    }
`;

const Circle = styled.span`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #b8b8b8;
  margin-right: 16px;

  @media screen and (min-width: 1000px) {
    width: 20px;
    height: 20px;
    margin-right: 48px;
  }

  ${SongButton}:hover & {
    border: 2px solid ${({theme}) => theme.color.green};
  }

    span {
      width: 50%;
      height: 50%;
      border-radius: 50%;
      background-color: transparent;

      ${SongButton}:active & {
        background-color: #2c9b15;
      }
    }
`;

const SongTitle = styled.span`
  flex: 0 1 auto;
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  font-size: calc(16px + 6 * ((100vw - 320px) / 680));
  line-height: 1.4;
  font-weight: 300;
  text-align: left;
  text-transform: capitalize;
  color: #b8b8b8;
  padding: 0 16px;

  @media screen and (min-width: 1000px) {
    font-size: 24px;
  }
`;

const RemoveSongButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 32px;
  margin-right: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {

    & svg {
      filter: saturate(200%);
    }
  }

    & svg {
      height: 16px;
      width: auto;
      flex-shrink: 0;
      fill: ${({theme}) => theme.color.red};

      @media screen and (min-width: 1001px) {
        height: 24px;
      }
    }
`;

class Choice extends Component {
  constructor(props) {
    super(props);
    this.getFocus = React.createRef();
  }

  componentDidUpdate() {
    this.getFocus.current.focus();
  }

  render() {
    const { progress, reloadSetlist, songs, chooseSong, removeSong, confirmDialog, redirect } = this.props;

    if (songs.length === 0) {
      redirect();
    }
    
    let isDialogOpen;
    if (confirmDialog === 'open') {
      isDialogOpen = -1;
    } else {
      isDialogOpen = 0;
    }
    
    return (
      <Wrapper confirmDialog={confirmDialog}>
        <TopButtonsBox>
          <Link
            exact="true"
            to="/" 
            tabIndex="-1"
          >
            <BackButton
              title="Back to draw screen" 
              aria-label="Back to draw screen"
              tabIndex={isDialogOpen}
              ref={this.getFocus}
            >
              <IconBackArrow />
              <span>back to draw</span>
            </BackButton>
          </Link>
        </TopButtonsBox>
        <SongsList>
          {songs
            .sort((a, b) => a > b ? 1 : -1)
            .map(item => (
              <SongsListItem key={item}>
                <Link
                  exact="true"
                  to="/"
                  tabIndex="-1"
                >
                  <SongButton
                    type="button" 
                    onClick={chooseSong} 
                    aria-label={item} 
                    tabIndex={isDialogOpen}
                  >
                    <Circle>
                      <span />
                    </Circle>
                    <SongTitle>
                      {item}
                    </SongTitle>
                  </SongButton>
                </Link>
                <RemoveSongButton 
                  type="button" 
                  onClick={removeSong} 
                  data-song={item} 
                  title="Remove song from current list" 
                  aria-label={`Remove '${item}' from current list`} 
                  tabIndex={isDialogOpen}
                >
                  <IconClose />
                </RemoveSongButton>
              </SongsListItem>
            ))
          }
        </SongsList>
        <TopButtonsBox>
          <ReloadButton 
            onClick={reloadSetlist} 
            progress={progress}
            title="Reload full setlist" 
            aria-label="Reaload full setlist"
            tabIndex={isDialogOpen}
          >
            <IconRefresh />
            <span>Reload setlist</span>
          </ReloadButton>
        </TopButtonsBox>
      </Wrapper>
    );
  }
}

export default Choice;