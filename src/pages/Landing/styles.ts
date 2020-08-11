import styled, { keyframes } from 'styled-components';

import Button from '../../components/Button';

export const Container = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;

  padding: 20px;

  height: 90vh;
  width: 90vw;
`;

const glow = keyframes`
  from{text-shadow: 0 0 10px rgba(255,255,255,0.3); }
  to{text-shadow: 0 0 20px rgba(76, 114, 161,0.9);}
`;

export const ChallengeText = styled.p`
  font-family: 'Rowdies';
  font-size: 36px;

  color: #fff;

  text-shadow: 0 0 10px #a1a4c9;

  margin-bottom: 1em;

  strong {
    color: #0f7cff;

    text-shadow: 0 0 10px #4c72a1;

    animation: ${glow} 2s infinite alternate;
  }
`;

export const Logo = styled.img`
  margin-right: auto;

  opacity: 0.9;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 6em;

  margin-right: 32em;
`;

export const CountButton = styled.div`
  background: rgba(159, 168, 224, 0.1);
  border-radius: 10px;
`;

export const CountDownContainer = styled.div`
  margin-bottom: 64px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

export const ButtonSubscribe = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 240px;

  font-size: 24px;

  text-shadow: 0 0 10px;

  small {
    font-size: 12px;
  }
`;

export const TopText = styled.p`
  color: #fff;
  text-shadow: 0 0 10px #fff;
  font-size: 18px;

  margin-right: auto;
`;
