import styled, { css } from 'styled-components';
import { EarnPoints } from './animations';

interface ItemProps {
  myTeam: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;

  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 10px #000;

  color: #000;
  font-family: 'Poppins';
`;

export const Content = styled.div`
  border: solid 1px #000;
  border-radius: 12px;

  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Header = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  border: solid 4px red;
  border-radius: 12px;
`;

export const Title = styled.h1``;

export const Body = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  border: solid 3px aquamarine;
  border-radius: 12px;

  padding: 8px;
`;

export const Item = styled.div<ItemProps>`
  width: 100%;
  height: 15%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-right: auto;
  padding: 8px;

  & + div {
    margin-top: 10px;
  }

  border-radius: 12px;
  box-shadow: 0 0 4px #000;
  background: #e3e3e3;

  img {
    width: 50px;
    height: 50px;
  }

  h3 {
    margin-right: auto;
    margin-left: 4%;
  }

  transition: transform 0.8s;

  ${(props) =>
    props.myTeam &&
    css`
      animation: ${EarnPoints} 1s;
      border: solid 2px red;
    `};

  &:hover {
    /* cursor: pointer; */
    transform: scaleY(1.09) scaleX(1.09);
  }
`;
