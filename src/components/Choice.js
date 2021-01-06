import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as IconRefresh } from '../icons/refresh.svg';
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
      margin-left: 48px;
    }
`;

const TopButton = styled.button`
  width: 56px;
  height: 56px;
  background-color: transparent;
  border: none;
  border-radius: 3px;
  cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, .05);
    }
`;

const ReloadButton = styled(TopButton)`
  display: ${props => props.progress < 100 ? 'inline-block' : 'none'};

    &:hover svg {
      filter: saturate(300%);
    }

    svg {
      height: 44px;
      fill: ${({theme}) => theme.color.green};
    }
`;

const CloseButton = styled(TopButton)`

    &:hover svg {
      filter: saturate(350%);
    }

    svg {
      height: 28px;
      fill: ${({theme}) => theme.color.red};
    }
`;

const SongsList = styled.ul`
  list-style-type: none;
  width: 100%;
  margin: 0 auto 80px;
`;

const SongsListItem = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 300px;
  max-width: 600px;
  margin: 12px auto;

  @media screen and (min-width: 1001px) {
    max-width: 800px;
  }

    a {
      width: 70%;
      max-width: 640px;
      margin: 0 auto;
      text-decoration: none;
    }
`;

const SongButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: calc(16px + 6 * ((100vw - 320px) / 1360));
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #1d1d1d;
  border-radius: 3px;
  cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, .05);
    }
`;

const Circle = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
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

    div {
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
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  display: block;
  width: 52px;
  height: 52px;
  margin-right: 12px;
  background-color: transparent;
  border: none;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, .05);
    filter: saturate(200%);
  }

    &::before {
      display: block;
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 24px;
      height: 24px;
      background-color: ${({theme}) => theme.color.red};
      border-radius: 50%;

      @media screen and (min-width: 600px) {
        width: 28px;
        height: 28px;
      }

      @media screen and (min-width: 1000px) {
        width: 32px;
        height: 32px;
      }
    }

    &::after {
      display: block;
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 2px;
      background-color: #eee;
      border-radius: 5px;
      z-index: 2;

      @media screen and (min-width: 600px) {
        width: 14px;
      }

      @media screen and (min-width: 1000px) {
        width: 16px;
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
          <ReloadButton 
            onClick={reloadSetlist} 
            progress={progress}
            title="Reload full setlist" 
            aria-label="Reaload full setlist"
            tabIndex={isDialogOpen}
          >
            <IconRefresh />
          </ReloadButton>
          <Link
            exact="true"
            to="/" 
            tabIndex="-1"
          >
            <CloseButton
              title="Close choice view" 
              aria-label="Close choice view"
              tabIndex={isDialogOpen}
              ref={this.getFocus}
            >
              <IconClose />
            </CloseButton>
          </Link>
        </TopButtonsBox>
        <SongsList>
          {songs
            .sort((a, b) => a > b ? 1 : -1)
            .map(item => 
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
                      <div />
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
                />
              </SongsListItem>
            )
          }
        </SongsList>
      </Wrapper>
    );
  }
}

export default Choice;