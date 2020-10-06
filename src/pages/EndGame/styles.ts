import styled from 'styled-components';
import Particles from './particles';

export const Container = styled.div`
  font-family: 'Pricedown';

  margin: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    text-align: center;
    font-size: 100px;
    color: #fff;

    strong {
      color: rgb(251, 124, 31);
    }
  }
`;

export const EndGameMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background: rgba(255, 255, 255, 0.8);

  border-radius: 6px;

  width: 70%;
  height: 70%;

  margin-top: 2%;

  p {
    strong {
      color: rgb(251, 124, 31);
      font-weight: bold;
    }
  }

  h2 {
    font-size: 64px;
    color: #666666;
    strong {
      color: #0055ff;
    }
    margin-bottom: 4%;
  }

  span {
    display: flex;
    flex-direction: column;

    align-items: center;

    width: 70%;
    height: 50%;

    text-align: center;
    letter-spacing: 2px;

    margin-top: 4%;

    p {
      font-size: 48px;
      color: #666666;

      strong {
        color: #fff;
      }
    }
  }
`;

export const StyledParticles = styled(Particles)`
  height: 100%;
  width: 100%;
`;
