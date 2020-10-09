import styled, { css } from 'styled-components';
import { shade } from 'polished';

import { loadFromTransparent, bringFromLeft } from './animations';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';

interface Test {
  load?: boolean;
}

interface StyledButtonProps {
  countdownOver?: boolean;
}

export const PageGame = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const TContainer = styled.div`
  width: 100vw;
  height: 87.9vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 18px;

  animation: ${loadFromTransparent} 1.4s;
`;

export const PageWrapper = styled.div`
  display: flex;
`;

export const CircleContent = styled(Card) <Test>`
  width: 500px;
  height: 500px;

  display: flex;
  justify-content: center;
  position: relative;

  margin-left: 16em;

  ${(props) =>
    props.load
      ? css`
          animation: ${bringFromLeft} 1s;
        `
      : css`
          animation: ${bringFromLeft} 1s;
        `}
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: auto;
  margin-top: 12%;

  text-align: center;

  a {
    font-family: 'Poppins';
    text-decoration: none;
    color: #fff;

    transition: color 0.3s;

    &:hover {
      color: ${shade(0.4, '#fff')};
    }
  }
`;

export const Content = styled.p`
  width: 440px;

  text-align: center;
  margin-top: 2em;

  font-family: 'Poppins';
  font-size: 18px;

  color: #fff;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  a {
    text-decoration: none;
  }

  @media (max-width: 700px) {
    padding: 0 32px;
  }
`;

export const StyledButton = styled(Button) <StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 4%; */
  width: 40%;

  background: #fb7c1f;
  color: #fff;

  font-family: 'Poppins';
  font-size: 24px;

  &:hover {
    background: ${shade(0.4, '#fb7c1f')};
  }

  ${(props) =>
    props.countdownOver &&
    css`
      width: 100%;
    `}
`;

export const StyledInput = styled(Input)`
  /* width: 300px; */
`;
