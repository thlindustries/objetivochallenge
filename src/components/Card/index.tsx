import React, { HTMLAttributes } from 'react';

import { Container, HeaderContainer, Title } from './styles';

type CardProps = HTMLAttributes<HTMLDivElement> & {
  logo?: HTMLImageElement;
  title?: string;
};

const Card: React.FC<CardProps> = ({
  logo,
  title = 'testeTitle',
  children,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <HeaderContainer>
        <Title>{title}</Title>
        {children}
      </HeaderContainer>
    </Container>
  );
};

export default Card;
