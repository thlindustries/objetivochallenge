import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Logo, LogoContent, LogoOptions } from './styles';

import objLogo from '../../assets/img/logotry.png';

const Header: React.FC = ({ children }) => {
  return (
    <Container>
      <LogoContent>
        <Logo src={objLogo} alt="objlogo"></Logo>
        <LogoOptions>
          <Link to="/">
            <p>Home</p>
          </Link>

          <Link to="/regulamento">
            <p>Regulamento</p>
          </Link>
          {children}
        </LogoOptions>
      </LogoContent>
    </Container>
  );
};

export default Header;
