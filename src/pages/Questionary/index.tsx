import React from 'react';
import { FiLogOut } from 'react-icons/fi';

import { Container, LogoutButton } from './styles';

import Header from '../../components/Header';

const Questionary: React.FC = () => {
  return (
    <>
      <Header>
        <LogoutButton>
          <FiLogOut size={20} />
          Sair
        </LogoutButton>
      </Header>
      <Container>
        <p>Página do questionário</p>
      </Container>
    </>
  );
};

export default Questionary;
