import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

import {
  PageLanding,
  HeaderA,
  Container,
  CountDownContainer,
  ButtonsContainer,
  ButtonSubscribe,
  Content,
  ChallengeText,
  CountButton,
  TopText,
} from './styles';

import Countdown from '../../components/PageCountdown';

const Landing: React.FC = () => {
  const countDownDate = new Date('October 8, 2020').getTime();

  const [tab, setTab] = useState('');

  useEffect(() => {
    setTab('home');
  }, []);

  return (
    <PageLanding>
      <HeaderA selectedTab={tab} setTab={() => setTab} />
      <Container>
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
              <ButtonSubscribe enabled={false}>
                Jogar <small> (em breve)</small>
              </ButtonSubscribe>
            </ButtonsContainer>
          </CountButton>
        </Content>
      </Container>
    </PageLanding>
  );
};

export default Landing;
