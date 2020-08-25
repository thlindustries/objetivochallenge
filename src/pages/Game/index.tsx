import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FiLogIn, FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import Axios from 'axios';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  TContainer,
  CircleContent,
  Content,
  StyledButton,
  PageWrapper,
  FormContainer,
  StyledInput,
} from './styles';

import Header from '../../components/Header';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface Question {
  QuestionTitle: string;
  QuestionAnswer: string;
}

interface DataFormInfo {
  teamName: string;
  password: string;
}

const Game: React.FC = () => {
  const [question, setQuestion] = useState<Question>({
    QuestionAnswer: '',
    QuestionTitle: '',
  });
  const [card, setCard] = useState('');
  const [change, setChange] = useState(false);

  const history = useHistory();
  const { addToast } = useToast();
  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    Axios.get<Question>(
      'https://16hgpfnq69.execute-api.sa-east-1.amazonaws.com/prod/getquestionbyid?QuestionId=1',
    ).then((response) => {
      setQuestion(response.data);
    });
  }, []);

  const loadLoginCard = useCallback(() => {
    setCard('login');
    setChange(!change);
  }, [change]);

  const handleSubmit = useCallback(
    async (data: DataFormInfo) => {
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
          team: data.teamName,
          password: data.password,
        });

        console.log('aqui');

        history.push('/questionary');
      } catch (err) {
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
    [addToast, history, signIn],
  );

  return (
    <>
      <Header />
      <TContainer>
        <PageWrapper>
          {card !== 'login' ? (
            <CircleContent title="Logo do projeto" load={change}>
              <Content>
                Divirta-se junto com sua equipe solucionando o desafio do
                colégio objetivo
              </Content>
              {/* <Link to="/questionary"> */}
              <StyledButton onClick={loadLoginCard}>Começar</StyledButton>
              {/* </Link> */}
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
                    <StyledButton type="submit">Entrar</StyledButton>
                    <Link to="forgot-password">Esqueci minha senha</Link>
                  </Form>
                </FormContainer>
              </CircleContent>
            )}
        </PageWrapper>
      </TContainer>
    </>
  );
};

export default Game;
