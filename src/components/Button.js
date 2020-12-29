import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;

  &:focus {
    outline: ${({ theme }) => theme.outline};
  }
`;

const OuterRing = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-image: linear-gradient(30deg, #464646, #1c1c1c);
  border: none;
  box-shadow: 0px -2px 1px -1px #595959, 0px 20px 12px -10px #000;
  transform: rotate(30deg);
  transition: box-shadow .15s;

  ${Wrapper}:active & {
    background-image: linear-gradient(30deg, #464646, #1f1f1f);
    box-shadow: 0px -2px 2px -1px #595959, 0px 5px 12px -3px #000;
  }

  @media only screen and (max-width: 375px) {
    transform: rotate(30deg) scale(.85);
  }
`;

const MiddleRing = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-image: linear-gradient(30deg, #222, #464646);
  transform: rotate(-30deg);

  ${Wrapper}:active & {
    background-image: linear-gradient(30deg, #242424, #464646);
  }
`;

const ColorRing = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background-image: ${props => {
    if (props.action === 'draw') {
      return 'linear-gradient(30deg, #b8593d, #d3ac3a)';
    } else if (props.action === 'reload') {
      return 'linear-gradient(30deg, #026059, #428e33)';
    } else if (props.action === 'putBack') {
      return 'linear-gradient(30deg, #6a5e07, #cdbd31);'
    } else if (props.action === 'choose') {
      return 'linear-gradient(30deg, #853011, #ff703c)';
    }
  }};

  ${Wrapper}:active & {
    filter: ${props => {
        if (props.action === 'putBack') {
          return 'saturate(350%)';
        } else {
          return 'saturate(200%)';
        }
      }};
  }
`;

const InnerRing = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background-image: linear-gradient(30deg, #222, #595959);

  ${Wrapper}:active & {
      filter: saturate(20%);
    }
`;

const IconBox = styled.span`
  & svg {
    position: relative;
    height: ${props => {
      if (props.action === 'draw') {
        return '24px';
      } else if (props.action === 'reload') {
        return '30px';
      } else if (props.action === 'putBack') {
        return '22px';
      } else if (props.action === 'choose') {
        return '22px';
      }
    }};
    fill: ${props => {
      if (props.action === 'draw') {
        return props.theme.color.orange;
      } else if (props.action === 'reload') {
        return props.theme.color.green;
      } else if (props.action === 'putBack') {
        return props.theme.color.yellow;
      } else if (props.action === 'choose') {
        return props.theme.color.red;
      }
    }};
    transform: ${props => {
      if (props.action === 'draw') {
        return 'translate(1px, 1px)';
      } else if (props.action === 'reload') {
        return 'translate(1px, 1px)';
      }
    }};

    ${Wrapper}:hover & {
      filter: ${props => {
        if (props.action === 'draw') {
          return 'saturate(450%)';
        } else if (props.action === 'reload') {
          return 'saturate(350%)';
        } else if (props.action === 'putBack') {
          return 'saturate(700%)';
        } else if (props.action === 'choose') {
          return 'saturate(300%)';
        }
      }};
    }
`;

const Description = styled.span`
  position: relative;
  font-size: calc(14px + 6 * ((100vw - 320px) / 640));
  line-height: 1;
  text-transform: uppercase;
  margin-top: 16px;
  color: ${props => {
    if (props.action === 'draw') {
      return props.theme.color.orange;
    } else if (props.action === 'reload') {
      return props.theme.color.green;
    } else if (props.action === 'putBack') {
      return props.theme.color.yellow;
    } else if (props.action === 'choose') {
      return props.theme.color.red;
    }
  }};

  ${Wrapper}:hover & {
    filter: ${props => {
      if (props.action === 'draw') {
        return 'saturate(450%)';
      } else if (props.action === 'reload') {
        return 'saturate(350%)';
      } else if (props.action === 'putBack') {
        return 'saturate(700%)';
      } else if (props.action === 'choose') {
        return 'saturate(300%)';
      }
    }};
  }

  @media only screen and (min-width: 1000px) {
    font-size: 21px;
    margin-top: 18px;
  }
`;


function Button({ action, onClick, icon, description }) {
  return (
    <Wrapper action={action} onClick={onClick}>
      <OuterRing>
        <MiddleRing>
          <ColorRing action={action}>
            <InnerRing>
              <IconBox action={action}>
                {icon}
              </IconBox>
            </InnerRing>
          </ColorRing>
        </MiddleRing>
      </OuterRing>
      <Description action={action}>{description}</Description>
    </Wrapper>
  );
}

export default Button;