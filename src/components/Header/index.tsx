import React, { useState, useCallback } from 'react';

import { Link } from 'react-router-dom';
import {
  Container,
  Logo,
  LogoContent,
  LogoOptions,
  HomeOption,
  RegulationOption,
} from './styles';

import objLogo from '../../assets/img/logotry.png';

const Header: React.FC = ({ children }) => {
  const [tab, setTab] = useState('home');

  const handleChangeTab = useCallback((selectedTab: string) => {
    setTab(selectedTab);
    console.log(selectedTab);
  }, []);

  return (
    <Container>
      <LogoContent>
        <Logo src={objLogo} alt="objlogo"></Logo>
        <LogoOptions>
          <Link onClick={() => handleChangeTab('home')} to="/">
            <HomeOption tab={tab}>Home</HomeOption>
          </Link>

          <Link
            onClick={() => handleChangeTab('regulamento')}
            to="/regulamento"
          >
            <RegulationOption tab={tab}>Regulamento</RegulationOption>
          </Link>
          {children}
        </LogoOptions>
      </LogoContent>
    </Container>
  );
};

export default Header;
