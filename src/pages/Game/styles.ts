import styled, { css } from 'styled-components';
import { shade } from 'polished';

import { loadFromTransparent, bringFromLeft, sendToLeft } from './animations';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';

interface Test {
  load?: boolean;
}

export const TContainer = styled.div`
  width: 100vw;
  height: 87.9vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 18px;

  /* background: rgba(0, 0, 0, 0.3); */

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

  border: solid 1px #000;

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

  width: 300px;

  margin-top: 6em;

  text-align: center;

  /* animation: ${bringFromLeft} 1s; */

  a {
    font-family: 'Poppins';
    text-decoration: none;
    color: #fff;

    transition: color 0.3s;

    &:hover{
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

export const StyledButton = styled(Button)`
  margin-top: 4em;

  background: #fb7c1f;
  color: #fff;

  font-family: 'Poppins';
  font-size: 24px;

  &:hover {
    background: ${shade(0.4, '#fb7c1f')};
  }
`;

export const StyledInput = styled(Input)`
  /* width: 300px; */
`;