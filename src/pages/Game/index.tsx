import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';
import chicoLogo from '../../assets/img/chicoLogo3.png';

import {
  PageGame,
  TContainer,
  CircleContent,
  Content,
  StyledButton,
  PageWrapper,
  FormContainer,
  ButtonsContainer,
  StyledInput,
} from './styles';

import Header from '../../components/Header';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface DataFormInfo {
  teamName: string;
  password: string;
}

const Game: React.FC = () => {
  const [card, setCard] = useState('');
  const [change, setChange] = useState(false);
  const [isLogging, setIsLogging] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

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
          teamName: Yup.string().required('Nome do usuário obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.teamName,
          password: data.password,
        });

        setIsLogging(false);
        setIsEnabled(true);

        // history.push('/questionary');
        window.location.href = '/questionary';
      } catch (err) {
        setIsLogging(false);
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
    [addToast, signIn],
  );

  const handleSubscribe = useCallback(() => {
    window.location.href =
      'https://docs.google.com/forms/d/e/1FAIpQLSeA_fLgG3Sk9sEHDK6R74i0-ePBeeNk_6y7ZpIxlIwiGaF_bA/viewform';
  }, []);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = '//code.jivosite.com/widget/AIh2Mhazzn';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <PageGame>
      <Header />
      <script src="//code.jivosite.com/widget/AIh2Mhazzn" async />
      <TContainer>
        <PageWrapper>
          {card !== 'login' ? (
            <CircleContent
              title="Logo do projeto"
              load={change}
              logo={chicoLogo}
            >
              <Content>
                Divirta-se junto com sua equipe solucionando o desafio do
                colégio objetivo
              </Content>
              <ButtonsContainer>
                <StyledButton onClick={handleSubscribe}>
                  Inscrever-se
                </StyledButton>
                <StyledButton onClick={loadLoginCard}>Começar</StyledButton>
              </ButtonsContainer>
            </CircleContent>
          ) : (
              <CircleContent
                title="Logo do projeto"
                load={change}
                logo={chicoLogo}
              >
                <FormContainer>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <StyledInput
                      name="teamName"
                      icon={FiUser}
                      placeholder="usuário"
                      style={{ width: 300 }}
                    />
                    <StyledInput
                      name="password"
                      icon={FiLock}
                      type="password"
                      placeholder="senha"
                    />
                    <StyledButton
                      style={{ width: '100%' }}
                      enabled={isEnabled}
                      type="submit"
                    >
                      {isLogging ? <ReactLoading /> : 'Entrar'}
                    </StyledButton>
                    {/* <Link to="forgot-password">Esqueci minha senha</Link> */}
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
