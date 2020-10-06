import React from 'react';

import {
  Container,
  MessageContainer,
  MessageContent,
  RankContainer,
} from './styles';

interface FinalProps {
  text?: string;
  endgame?: boolean;
}

const FinalComponent: React.FC<FinalProps> = ({ children, text, endgame }) => {
  return (
    <Container>
      <MessageContainer>
        <MessageContent>
          <p>{text}</p>
        </MessageContent>
      </MessageContainer>
      {!endgame && <RankContainer>{children && children}</RankContainer>}
    </Container>
  );
};

export default FinalComponent;
