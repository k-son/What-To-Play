import React from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  display: ${props => {
    if (props.isOpen === 'open') {
      return 'block';
    } else {
      return 'none';
    }
  }};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, .75);
  z-index: 9900;
`;

const slideDownDialog = keyframes`
  from {
    margin-top: 0;
    opacity: 0;
  }
  to {
    margin-top: 120px;
    opacity: 1;
  }
`;

const Dialog = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  min-width: 300px;
  max-width: 500px;
  height: 200px;
  margin: 0 auto;
  padding: 24px;
  background-image: radial-gradient(140% 170% at 65% 20%, #484848, #282828 60%);
  border: 2px solid #666;
  border-radius: 5px;
  animation: ${slideDownDialog} .4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
`;

const Text = styled.div`
  font-size: 16px;
  text-align: center;
  color: #ccc;
  margin-bottom: 36px;
`;

const Question = styled.p`
  font-weight: 300;
  margin-bottom: 12px;
`;

const SongTitle = styled.p`
  font-weight: 400;
  letter-spacing: 1px;
  color: #ddd;
`;

const ButtonBox = styled.div`
  text-align: center;
`;

const Button = styled.button`
  width: 100px;
  height: 40px;
  font-size: 16px;
  color: #eee;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.red};
  margin-right: 40px;

    &:hover {
      filter: saturate(150%);
    }
`;

const OKButton = styled(Button)`
  background-color: ${({ theme }) => theme.color.green};

    &:hover {
      filter: saturate(250%);
    }
`;


function ModalDialog({ isOpen, question, songTitle, onCancel, onConfirm }) {
  return (
    <Wrapper isOpen={isOpen}>
      <Dialog>
        <Text>
          <Question>
            {question}
          </Question>
          <SongTitle>
            {songTitle !== ' ' && `'${songTitle}'`}
          </SongTitle>
        </Text>
        <ButtonBox>
          <CancelButton type="button" onClick={onCancel}>Cancel</CancelButton>
          <OKButton type="button" onClick={onConfirm}>OK</OKButton>
        </ButtonBox>
      </Dialog>
    </Wrapper>
  );
}

export default ModalDialog;