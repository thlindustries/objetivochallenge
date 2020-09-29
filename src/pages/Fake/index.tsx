import React from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../hooks/auth';

// import { Container } from './styles';

interface ReqParams {
  user: string;
  pass: string;
}

const Fake: React.FC = () => {
  const { signIn } = useAuth();
  const { user, pass } = useParams() as ReqParams;

  signIn({ email: user, password: pass });

  return <div></div>;
};

export default Fake;
