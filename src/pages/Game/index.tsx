import React, { useState, useCallback, useRef } from 'react';
import { FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import ReactLoading from 'react-loading';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  PageGame,
  TContainer,
  CircleContent,
  Content,
  StyledButton,
  PageWrapper,
  FormContainer,
  StyledInput,
} from './styles';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface DataFormInfo {
  teamName: string;
  password: string;
}

const Game: React.FC = () => {
  const [card, setCard] = useState('');
  const [change, setChange] = useState(false);
  const [logging, setLogging] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  const history = useHistory();
  const { addToast } = useToast();
  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const loadLoginCard = useCallback(() => {
    setCard('login');
    setChange(!change);
  }, [change]);

  const handleSubmit = useCallback(
    async (data: DataFormInfo) => {
      setIsLogging(true);
      setIsEnabled(false);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          teamName: Yup.string()
            .required('Nome do time obrigatório')
            .email('Digite um nome de time válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.teamName,
          password: data.password,
        });

        setLogging(true);
        setIsLogging(false);
        setIsEnabled(true);

        history.push('/questionary');
      } catch (err) {
        setIsLogging(false);
        console.log(logging);
        setIsEnabled(true);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as crendeciais.',
        });
      }
    },
    [addToast, history, logging, signIn],
  );

  return (
    <PageGame>
      {/* <Header /> */}
      <TContainer>
        <PageWrapper>
          {card !== 'login' ? (
            <CircleContent title="Logo do projeto" load={change}>
              <Content>
                Divirta-se junto com sua equipe solucionando o desafio do
                colégio objetivo
              </Content>
              <StyledButton onClick={loadLoginCard}>Começar</StyledButton>
            </CircleContent>
          ) : (
              <CircleContent title="Logo do projeto" load={change}>
                <FormContainer>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <StyledInput
                      name="teamName"
                      icon={FiUser}
                      placeholder="Nome da equipe"
                      style={{ width: 300 }}
                    />
                    <StyledInput
                      name="password"
                      icon={FiLock}
                      type="password"
                      placeholder="senha"
                    />
                    <StyledButton enabled={isEnabled} type="submit">
                      {isLogging ? <ReactLoading /> : 'Entrar'}
                    </StyledButton>
                    <Link to="forgot-password">Esqueci minha senha</Link>
                  </Form>
                </FormContainer>
              </CircleContent>
            )}
        </PageWrapper>
      </TContainer>
    </PageGame>
  );
};

export default Game;
