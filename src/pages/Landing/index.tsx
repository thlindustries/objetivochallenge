import React from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  CountDownContainer,
  ButtonsContainer,
  ButtonSubscribe,
  Content,
  Logo,
  ChallengeText,
  CountButton,
  TopText,
  LogoContent,
} from './styles';

import objLogo from '../../assets/img/logotry.png';
import Countdown from '../../components/PageCountdown';

const Landing: React.FC = () => {
  const countDownDate = new Date('October 8, 2020').getTime();

  const [, , , page] = window.location.href.split('/');
  console.log(page);

  return (
    <Container>
      <LogoContent>
        <Logo src={objLogo} alt="objlogo"></Logo>
      </LogoContent>
      <Content>
        <ChallengeText>
          Challenge do Colégio <strong>Objetivo</strong>
        </ChallengeText>
        <TopText>As inscrições terminam em:</TopText>

        <CountButton>
          <CountDownContainer>
            <Countdown background={false} date={countDownDate} />
          </CountDownContainer>
          <ButtonsContainer>
            <form action="https://docs.google.com/forms/d/e/1FAIpQLSeA_fLgG3Sk9sEHDK6R74i0-ePBeeNk_6y7ZpIxlIwiGaF_bA/viewform">
              <ButtonSubscribe type="submit">Inscrever-se</ButtonSubscribe>
            </form>
            <Link to="/gamestart">
              <ButtonSubscribe>
                Jogar <small> (em breve)</small>
              </ButtonSubscribe>
            </Link>
          </ButtonsContainer>
        </CountButton>
      </Content>
    </Container>
  );
};

export default Landing;
