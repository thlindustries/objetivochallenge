import React from 'react';

import { Container, Logo, LogoContent, LogoOptions } from './styles';

import objLogo from '../../assets/img/logotry.png';

const Header: React.FC = ({ children }) => {
  return (
    <Container>
      <LogoContent>
        <Logo src={objLogo} alt="objlogo"></Logo>
        <LogoOptions>
          <p>Home</p>
          <p>Sobre o game</p>
          {children}
        </LogoOptions>
      </LogoContent>
    </Container>
  );
};

export default Header;
