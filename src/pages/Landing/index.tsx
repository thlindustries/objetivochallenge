import React from 'react';

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
} from './styles';

import objLogo from '../../assets/img/objlogo.png';
import Countdown from '../../components/PageCountdown';

const Landing: React.FC = () => {
  const countDownDate = new Date('October 10, 2020').getTime();

  return (
    <Container>
      <Logo src={objLogo} alt="objlogo"></Logo>
      <Content>
        <ChallengeText>
          Desafio do colégio <strong>objetivo</strong>
        </ChallengeText>
        <TopText>As inscrições terminam em:</TopText>

        <CountButton>
          <CountDownContainer>
            <Countdown background={false} date={countDownDate} />
          </CountDownContainer>
          <ButtonsContainer>
            <ButtonSubscribe>Inscrever-se</ButtonSubscribe>
            <ButtonSubscribe enabled={false}>
              Jogar
              <small>(em breve)</small>
            </ButtonSubscribe>
          </ButtonsContainer>
        </CountButton>
      </Content>
    </Container>
  );
};

export default Landing;
