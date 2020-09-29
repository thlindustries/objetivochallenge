import React, { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom';
import Axios from 'axios';

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

interface ResponseLoginFake {
  email: string;
  senha: string;
}

const Landing: React.FC = () => {
  const countDownDate = new Date('October 8, 2020').getTime();

  const [tab, setTab] = useState('');

  useEffect(() => {
    setTab('home');
  }, []);

  const handleTest = useCallback(async () => {
    const response = await Axios.get<ResponseLoginFake>(
      'https://16hgpfnq69.execute-api.sa-east-1.amazonaws.com/prod/loginfake',
    );

    window.location.href = `https://suspicious-lichterman-3943dc.netlify.app/fake/:${response.data.email}/:${response.data.senha}`;
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
              <ButtonSubscribe onClick={handleTest}>Testar</ButtonSubscribe>
            </ButtonsContainer>
          </CountButton>
        </Content>
      </Container>
    </PageLanding>
  );
};

export default Landing;
