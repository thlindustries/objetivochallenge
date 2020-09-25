import styled, { css } from 'styled-components';
import { EarnPoints } from './animations';

interface ItemProps {
  myTeam: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;

  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px #000;

  color: #000;
  font-family: 'Poppins';

  padding: 8px;

  overflow: scroll;
`;

export const Content = styled.div`
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

  border-radius: 12px;
`;

export const Title = styled.h1`
  font-family: 'Kumbh Sans';
  font-weight: 600;

  @media (max-width: 700px) {
    font-size: 16px;
  }
`;

export const Body = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  border-radius: 12px;

  padding: 8px;

  /* box-shadow: 0 0 10px inset; */
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
  }

  transition: transform 0.8s;

  ${(props) =>
    props.myTeam &&
    css`
      animation: ${EarnPoints} 1s;
      border: solid 2px rgb(251, 124, 31);
    `};

  &:hover {
    /* cursor: pointer; */
    transform: scaleY(1.09) scaleX(1.09);
  }

  p {
    text-shadow: 0 0 10px rgb(251, 124, 31);
  }

  @media (max-width: 700px) {
    flex-direction: column;

    height: 20%;
  }
`;

export const QuestionPoints = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  margin-left: 4%;
  justify-content: space-between;

  h3 {
    width: 100%;
  }

  strong {
    font-size: 10px;
    width: 100%;
  }

  @media (max-width: 700px) {
    h3 {
      font-size: 14px;
    }

    strong {
      font-size: 12px;
    }
  }
`;
