import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  FiLogOut,
  FiPlay,
  FiCornerUpRight,
  FiAlertTriangle,
} from 'react-icons/fi';
import { FaLightbulb } from 'react-icons/fa';
import ReactLoading from 'react-loading';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Axios from 'axios';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  FirstRowContainer,
  SecondRowContainer,
  LogoutButton,
  PageContent,
  Answer,
  FormContent,
  AnswerButton,
  AnswerInput,
  Hint,
  Question,
  QuestionHeader,
  LoadingQuestion,
  HintButton,
  PassButton,
  QuestionContent,
  QuestionContentItem,
  QuestionContainer,
  QuestionOverlay,
  RankContainer,
  VideoCards,
  VideoCard,
  Chat,
  StyledTooltip,
} from './styles';

import Header from '../../components/Header';

interface Question {
  QuestionId: string;
  QuestionTitle: string;
  QuestionAnswer: string;
  QuestionHints: string;
  QuestionAnswerCharacterCounter: string;
}

interface NextQuestion {
  nextQuestion: {
    QuestionId: string;
    QuestionTitle: string;
    QuestionAnswer: string;
    QuestionHints: string;
    QuestionAnswerCharacterCounter: string;
  };
}

interface DataFormInfo {
  answer: string;
}

const Questionary: React.FC = () => {
  const { signOut, user } = useAuth();

  const { addToast } = useToast();
  const [question, setQuestion] = useState<Question>({
    QuestionId: '',
    QuestionAnswer: '',
    QuestionTitle: '',
    QuestionHints: '',
    QuestionAnswerCharacterCounter: '',
  });

  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    Axios.get<Question>(
      `https://16hgpfnq69.execute-api.sa-east-1.amazonaws.com/prod/getquestionbyid?QuestionId=${user.TeamCurrentQuestionId}&UserId=${user.UserId}&TeamId=${user.UserTeamId}`,
    ).then((response) => {
      setQuestion(response.data);
      // console.log(response.data);
    });
  }, [user.TeamCurrentQuestionId, user.UserId, user.UserTeamId]);

  const handleShowHint = useCallback(() => {
    addToast({
      title: 'Dica',
      description: 'Esta é uma dica',
      type: 'success',
    });
  }, [addToast]);

  const handlePassQuestion = useCallback(() => {
    addToast({
      title: 'Pulou',
      description: 'Pulou questão',
      type: 'error',
    });

    Axios.get<NextQuestion>(
      `https://16hgpfnq69.execute-api.sa-east-1.amazonaws.com/prod/passquestion?QuestionId=${question.QuestionId}&TeamId=${user.UserTeamId}&UserId=${user.UserId}`,
    ).then((response) => {
      setQuestion(response.data.nextQuestion);
    });
  }, [addToast, question.QuestionId, user.UserId, user.UserTeamId]);

  const handleAnswer = useCallback(
    async (data: DataFormInfo) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          answer: Yup.string().required(
            'Escreva algo na resposta ou pule a pergunta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        console.log(data);

        addToast({
          title: 'Respondeu',
          description: 'Respondeu a questão',
          type: 'success',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [addToast],
  );

  return (
    <PageContent>
      <Header>
        <LogoutButton onClick={signOut}>
          <FiLogOut size={20} />
          Sair
        </LogoutButton>
      </Header>
      <Container>
        <FirstRowContainer>
          <QuestionContainer>
            <QuestionOverlay>
              <Question>
                <QuestionHeader>
                  <HintButton onClick={handleShowHint}>
                    {question.QuestionHints !== '' && (
                      <StyledTooltip type="hint" title={question.QuestionHints}>
                        <FaLightbulb size={40} />
                      </StyledTooltip>
                    )}
                  </HintButton>
                  {question.QuestionTitle !== '' ? (
                    <>
                      <p>{`${question.QuestionId}- ${question.QuestionTitle}`}</p>
                      <PassButton onClick={handlePassQuestion}>
                        <StyledTooltip title="Atenção: Ao pular a questão não tem mais como voltar !">
                          <FiCornerUpRight size={40} />
                          <h5>Pular</h5>
                        </StyledTooltip>
                      </PassButton>
                    </>
                  ) : (
                      <LoadingQuestion
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          marginTop: '2%',
                        }}
                      >
                        <ReactLoading type="spin" color="#d1d1d1" width={40} />
                        <p>Carregando questão</p>
                      </LoadingQuestion>
                    )}
                </QuestionHeader>
                <QuestionContent>
                  <QuestionContentItem>- Audio</QuestionContentItem>
                  <QuestionContentItem>- Vídeo</QuestionContentItem>
                  <QuestionContentItem>- Arquivo</QuestionContentItem>
                </QuestionContent>
              </Question>
              <Answer>
                <Form ref={formRef} onSubmit={handleAnswer}>
                  <FormContent>
                    <p>
                      <FiAlertTriangle size={40} />
                      Reportar um erro
                    </p>
                    <AnswerInput
                      name="answer"
                      placeholder="Digite a resposta aqui"
                      containerStyle={{
                        width: 800,
                      }}
                    />
                    <AnswerButton type="submit">
                      <FiPlay size={20} />
                    </AnswerButton>
                  </FormContent>
                </Form>
              </Answer>
              <Hint>
                <strong>Dica: </strong>{' '}
                {`a resposta tem ${question.QuestionAnswerCharacterCounter} caracteres`}
              </Hint>
            </QuestionOverlay>
          </QuestionContainer>
          <RankContainer>
            <p>Ranking</p>
          </RankContainer>
        </FirstRowContainer>
        <SecondRowContainer>
          <VideoCards>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
          </VideoCards>
          <Chat></Chat>
        </SecondRowContainer>
      </Container>
    </PageContent>
  );
};

export default Questionary;
