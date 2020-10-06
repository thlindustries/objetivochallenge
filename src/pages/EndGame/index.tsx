import React from 'react';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  EndGameMessageContainer,
  OrangeContainer,
  StyledParticles,
} from './styles';

const EndGame: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <StyledParticles />
      <Container>
        <h1>
          Desafio <strong>encerrado</strong>
        </h1>
        <EndGameMessageContainer>
          <OrangeContainer>
            <h2>
              Parabéns <strong>{user.UserName}</strong>
            </h2>
            <span>
              <p>
                Agradecemos a todos do time <strong>{user.TeamName}</strong> por
                terem participado deste desafio Fiquem ligados em seus e-mails
                que em breve o resultado final será divulgado
              </p>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio style={{ opacity: 0 }} controls autoPlay>
                <source
                  type="audio/mpeg"
                  src="https://challengeobjetivo.s3-sa-east-1.amazonaws.com/musica/medio/desafioConcluido.mp3"
                />
              </audio>
            </span>
          </OrangeContainer>
        </EndGameMessageContainer>
      </Container>
    </>
  );
};

export default EndGame;
