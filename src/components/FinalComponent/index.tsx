import React from 'react';

import {
  Container,
  MessageContainer,
  MessageContent,
  RankContainer,
} from './styles';

interface FinalProps {
  text?: string;
}

const FinalComponent: React.FC<FinalProps> = ({ children, text }) => {
  return (
    <Container>
      <MessageContainer>
        <MessageContent>
          <p>{text}</p>
        </MessageContent>
      </MessageContainer>
      <RankContainer>{children && children}</RankContainer>
    </Container>
  );
};

export default FinalComponent;
