import styled, { css } from 'styled-components';
import { shade } from 'polished';

import { loadFromTransparent, bringFromLeft } from '../invite/animations';
import { glow } from './animations';
import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import inviteConsole from '../../assets/img/inviteConsole.png';

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
  height: 580px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 9px;

  animation: ${loadFromTransparent} 1.4s;
`;

export const PageWrapper = styled.div`
  display: flex;
`;

export const CircleContent = styled(Card)<Test>`
  width: 1200px;
  height: 1200px;
  background-image: url(${inviteConsole});
  background-repeat: no-repeat;
  background-size: contain;
  background-position-x: center;
  background-position-y: center;

  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;

  ${(props) =>
    props.load
      ? css`
          animation: ${bringFromLeft} 1s;
        `
      : css`
          animation: ${bringFromLeft} 1s;
        `}

  .teamInfo {
    display: flex;
    justify-content: center;
    margin: 44px 0 1.25em -10px;
  }

  .nameCategory {
    margin-left: -10px;
  }

  @media (min-width: 1500px) {
    margin-left: 200px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: auto;
  margin-top: 8%;

  text-align: center;
  margin-top: 14em;

  a {
    font-family: 'Roboto';
    text-decoration: none;

    transition: color 0.3s;

    &:hover {
      color: ${shade(0.4, '#fff')};
    }
  }

  .form {
    margin: -340px 124px 0 0;
  }
`;

export const Content = styled.p`
  width: 440px;

  text-align: center;
  margin-top: 2em;

  font-family: 'Roboto';
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

export const BackButton = styled(Button)<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7%;

  background: #fb7c1f;
  color: #fff;

  &:hover {
    background: ${shade(0.4, '#fb7c1f')};
  }

  font-family: 'Roboto';
  font-size: 18px;

  ${(props) =>
    props.countdownOver &&
    css`
      width: 100%;
    `}
`;

export const StyledButton = styled(Button)<StyledButtonProps>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 207px;
  height: 40px;

  font-size: 14px;
  border-radius: 220px;

  background: #097d45;
  color: #fff;

  font-family: 'Roboto';

  &:hover {
    background: ${shade(0.4, '#097D45')};
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

export const Logo = styled.img`
  height: 40px;

  opacity: 1;
`;

export const LogoContent = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: left;
  justify-content: left;
`;

export const LogoOptions = styled.div`
  display: flex;
  flex-direction: row;

  margin-left: auto;

  a {
    text-decoration: none;
  }

  p {
    margin-right: 48px;

    transition: color 0.4s;

    font-family: 'Roboto';
    font-size: 18px;

    &:hover {
      cursor: pointer;
      color: ${shade(0.4, '#bdbdbd')};
    }
  }
`;

export const Users = styled.div`
  margin-top: -110px;
  width: 543px;
  margin-right: -56px;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
  list-style-type: none;

  width: 100%;
  height: 262px;
  overflow: auto;

  text-align: left;
  padding-top: 40px;

  a {
    font-family: 'Roboto';
    text-decoration: none;

    transition: color 0.3s;

    &:hover {
      color: ${shade(0.4, '#fff')};
    }
  }

  .userInfo {
    display: flex;
    align-items: center;
    margin-right: 16%;
  }

  li {
    display: flex;
    margin-bottom: 0.5em;
  }

  li:nth-child(odd) {
    background: linear-gradient(
      90deg,
      rgb(247 243 243) 0%,
      rgb(245 245 245 / 94%) 50%,
      rgb(249 249 249) 100%
    );
  }
`;

export const li = styled.div`
  list-style-type: none;
`;

export const P = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 18em;

  font-size: 24px;
`;

export const A = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 5px;

  font-size: 18px;

  padding-left: 55px;
  padding-right: 55px;

  .accepted {
    display: flex;
    align-items: center;
    color: #097d45;
  }

  .pending {
    display: flex;
    align-items: center;
    color: #ce2121;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  flex-shrink: 0;
  margin-right: 10px;

  .main-profile-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: 0.4s;
    border: solid 2px #dbdbdb;
  }
`;

export const MainImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const ChallengeText = styled.p`
  font-family: 'Roboto';
  font-size: 36px;
  text-align: initial;

  text-shadow: 0 0 10px #0031ff75;

  strong {
    color: #fff;

    text-shadow: 0 0 10px #4c72a1;

    animation: ${glow} 2s infinite alternate;
  }
`;
