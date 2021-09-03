import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 640px;
  height: 136px;
  margin: 0 auto;
  margin-bottom: 40px;

  @media screen (min-width: 1200px) {
    width: 75%;
    max-width: 1200px;
  }

  @media screen (min-height: 1000px) {
    height: 180px;
  }
`;

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 100%;
  margin: 0 auto;
  padding: 4px 16px;
  list-style-type: none;
  overflow-y: auto;
`;

const Item = styled.li`
  display: inline;
  position: relative;
  font-size: calc(14px + 6 * ((100vw - 320px) / 1020));
  font-weight: 300;
  line-height: 1.4;
  text-transform: capitalize;
  text-align: center;
  color: #888;

  @media screen (min-width: 1000px) {
    font-size: 18px;
    line-height: 1.6;
  }

    &:not(:last-of-type) {
      margin-right: 6px;
    }

    /* first Dot */
    &:first-of-type > span {
      display: none;
    }
`;

const Dot = styled.span`
  margin-right: 6px;
  color: #666;
`;


function CurrentList({ songs }) {
  return (
    <Wrapper>
      <List>
        {songs
          .sort((a, b) => a > b ? 1 : -1)
          .map(item => (
            <Item key={item}>
              <Dot>&bull;</Dot>
              {item}
            </Item>
          )
        )}
      </List>
    </Wrapper>
  )
};

export default CurrentList;