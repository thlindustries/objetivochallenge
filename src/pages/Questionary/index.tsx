import React, { useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Container, LogoutButton } from './styles';

import Header from '../../components/Header';

const Questionary: React.FC = () => {
  const { signOut, user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    addToast({ title: 'teste', description: 'blablabla', type: 'success' });
  }, [addToast]);
  return (
    <>
      <Header>
        <LogoutButton onClick={signOut}>
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
