import React from 'react';

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

interface HeaderProps {
  selectedTab?: string;
  setTab?(tab: string): React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({
  selectedTab = 'home',
  setTab,
  children,
}) => {
  // const handleChangeTab = useCallback((selectedTab: string) => {
  //   setTab(selectedTab);
  //   console.log(selectedTab);
  // }, []);

  return (
    <Container>
      <LogoContent>
        <Logo src={objLogo} alt="objlogo"></Logo>
        <LogoOptions>
          <Link
            onClick={() => {
              setTab ? setTab('home') : console.log('oi');
            }}
            to="/"
          >
            <HomeOption tab={selectedTab}>Home</HomeOption>
          </Link>

          <Link
            onClick={() => {
              setTab ? setTab('regulamento') : console.log('oi');
            }}
            to="/regulamento"
          >
            <RegulationOption tab={selectedTab}>Regulamento</RegulationOption>
          </Link>
          {children}
        </LogoOptions>
      </LogoContent>
    </Container>
  );
};

export default Header;
