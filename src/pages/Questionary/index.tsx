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
import { useChat, Message } from '../../hooks/chat';
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
  ReportErrorButton,
  AnswerButton,
  AnswerInput,
  Hint,
  Question,
  QuestionHeader,
  LoadingQuestion,
  HintButton,
  PassButton,
  QuestionContentContainer,
  QuestionContainer,
  QuestionOverlay,
  RankContainer,
  VideoCards,
  VideoCard,
  ChatContainer,
  StyledTooltip,
} from './styles';

import Header from '../../components/Header';
import Alert from '../../components/Alert';
import Confirm from '../../components/Confirm';
import QuestionContent from '../../components/QuestionContent';
import Ranking from '../../components/Ranking';
import Chat from '../../components/Chat';

interface Question {
  QuestionId: string;
  QuestionTitle: string;
  QuestionAnswer: string;
  QuestionHints: string;
  QuestionUrl: string;
  QuestionType: string;
  QuestionAnswerCharacterCounter: string;
}

interface NextQuestion {
  nextQuestion: Question;
}

interface AnswerQuestion {
  isCorrect: boolean;
  nextQuestion: Question;
}

interface DataFormInfo {
  answer: string;
}

const Questionary: React.FC = () => {
  const { signOut, user } = useAuth();
  const { addMessage } = useChat();

  const [passing, setIsPassing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [answering, setIsAnswering] = useState(false);
  const [reportError, setReportError] = useState(false);

  const [wsResponse, setWsResponse] = useState('');

  const ENDPOINT = 'wss://admv564mu8.execute-api.sa-east-1.amazonaws.com/prod';

  const { addToast } = useToast();
  const [question, setQuestion] = useState<Question>({
    QuestionId: '',
    QuestionAnswer: '',
    QuestionTitle: '',
    QuestionHints: '',
    QuestionAnswerCharacterCounter: '',
    QuestionUrl: '',
    QuestionType: '',
  });

  const formRef = useRef<FormHandles>(null);
  const sWs = useRef<WebSocket>();

  const getRanking = useCallback(() => {
    sWs.current?.send(
      JSON.stringify({
        action: 'onMessage',
        type: 'ranking',
      }),
    );
  }, [sWs]);

  const ping = useCallback(() => {
    sWs.current?.send(
      JSON.stringify({
        action: 'onMessage',
        type: 'ping',
      }),
    );
  }, [sWs]);

  const sendMessage = useCallback(
    (userName: string, teamId: string, message: string) => {
      if (userName !== '' && teamId !== '' && message !== '') {
        sWs.current?.send(
          JSON.stringify({
            action: 'onMessage',
            type: 'chat',
            teamId,
            userName,
            message,
          }),
        );
      }
    },
    [sWs],
  );

  const getCurrentQuestionByTeamId = useCallback(async () => {
    Axios.get<Question>(
      `https://16hgpfnq69.execute-api.sa-east-1.amazonaws.com/prod/getcurrentquestionbyteamid?UserId=${user.UserId}&TeamId=${user.UserTeamId}`,
    ).then((response) => {
      setQuestion(response.data);
    });
  }, [user.UserId, user.UserTeamId]);

  useEffect(() => {
    sWs.current = new WebSocket(ENDPOINT);
    sWs.current.onopen = (event) => {
      sWs.current?.send(
        JSON.stringify({
          action: 'onMessage',
          type: 'updateconnectionid',
          userId: user.UserId,
          teamId: user.UserTeamId,
        }),
      );
      setInterval(() => {
        if (sWs !== undefined) {
          ping();
        }
      }, 30000);

      if (sWs.current !== undefined) {
        getRanking();
        sWs.current.onmessage = (e) => {
          if (e.data.includes('TeamPoints')) {
            setWsResponse(e.data);
          }
          if (e.data.includes('updatecurrentquestion')) {
            getRanking();
            getCurrentQuestionByTeamId();
            addToast({
              title: 'Alerta',
              description: 'Sua equipe pulou ou acertou a questão',
              type: 'success',
            });
          }
          if (e.data.includes('message')) {
            const recievedMessage: Message = JSON.parse(e.data);
            addMessage(recievedMessage.message, recievedMessage.userName);
          }
        };
      }
    };

    getCurrentQuestionByTeamId();

    return () => {
      sWs.current?.close();
    };
  }, [
    addMessage,
    addToast,
    getCurrentQuestionByTeamId,
    getRanking,
    ping,
    sWs,
    user.TeamCurrentQuestionId,
    user.UserId,
    user.UserTeamId,
  ]);

  const handleShowHint = useCallback(() => {
    addToast({
      title: 'Dica',
      description: 'Esta é uma dica',
      type: 'success',
    });
  }, [addToast]);

  const handlePassQuestion = useCallback(() => {
    setConfirm(!confirm);
    Axios.get<NextQuestion>(
      `https://16hgpfnq69.execute-api.sa-east-1.amazonaws.com/prod/passquestion?QuestionId=${question.QuestionId}&TeamId=${user.UserTeamId}&UserId=${user.UserId}`,
    ).then((response) => {
      if (response.data.nextQuestion.QuestionId) {
        setIsPassing(false);
        setConfirm(!confirm);
        setQuestion(response.data.nextQuestion);
        addToast({
          title: 'Pulou',
          description: 'Pulou questão',
          type: 'info',
        });
        sWs.current?.send(
          JSON.stringify({
            action: 'onMessage',
            type: 'updatecurrentquestion',
            userId: user.UserId,
            teamId: user.UserTeamId,
          }),
        );
      }
    });
  }, [
    addToast,
    confirm,
    question.QuestionId,
    sWs,
    user.UserId,
    user.UserTeamId,
  ]);

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
        setIsAnswering(true);
        Axios.post<AnswerQuestion>(
          'https://16hgpfnq69.execute-api.sa-east-1.amazonaws.com/prod/answerquestion',
          {
            UserId: user.UserId,
            TeamId: user.UserTeamId,
            QuestionId: question.QuestionId,
            QuestionAnswer: data.answer,
          },
        ).then((response) => {
          if (response.data.isCorrect) {
            addToast({
              title: 'Boa!',
              description: 'Resposta correta',
              type: 'success',
            });
            formRef.current?.clearField('answer');
            setQuestion(response.data.nextQuestion);

            sWs.current?.send(
              JSON.stringify({
                action: 'onMessage',
                type: 'updatecurrentquestion',
                userId: user.UserId,
                teamId: user.UserTeamId,
              }),
            );
          } else {
            addToast({
              title: 'Erro',
              description: 'Resposta incorreta',
              type: 'error',
            });
          }
          setIsAnswering(false);
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [addToast, question.QuestionId, sWs, user.UserId, user.UserTeamId],
  );

  const handleReportError = useCallback(() => {
    setReportError(!reportError);
  }, [reportError]);

  const handleConfirm = useCallback(() => {
    setConfirm(!confirm);
  }, [confirm]);

  const handleYesButton = useCallback(() => {
    setIsPassing(!passing);
    handlePassQuestion();
  }, [handlePassQuestion, passing]);

  return (
    <PageContent>
      {reportError && (
        <Alert
          QuestionId={question.QuestionId}
          title="Reportar erro"
          buttonTitle="Enviar"
          placeholder="Digite o que está acontecendo aqui"
          show={reportError}
          errFunc={handleReportError}
        />
      )}
      {confirm && (
        <Confirm
          title="Deseja mesmo pular a questão?"
          closeFunc={handleConfirm}
          show={confirm}
          pass={handleYesButton}
        />
      )}

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
                  {question.QuestionHints !== ' ' && !passing && (
                    <HintButton onClick={handleShowHint}>
                      <StyledTooltip type="hint" title={question.QuestionHints}>
                        <FaLightbulb size={40} />
                      </StyledTooltip>
                    </HintButton>
                  )}
                  {question.QuestionTitle !== '' && !passing ? (
                    <>
                      <p>
                        {`${question.QuestionId}- ${question.QuestionTitle}`}
                      </p>
                      <PassButton onClick={handleConfirm}>
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
                {question.QuestionType !== 'normal' && !answering && !passing && (
                  <QuestionContentContainer>
                    <QuestionContent
                      type={question.QuestionType}
                      url={question.QuestionUrl}
                    />
                  </QuestionContentContainer>
                )}
              </Question>
              {!answering && !passing ? (
                <>
                  <Answer>
                    <Form ref={formRef} onSubmit={handleAnswer}>
                      <FormContent>
                        <ReportErrorButton onClick={handleReportError}>
                          <FiAlertTriangle size={40} />
                          Reportar um erro
                        </ReportErrorButton>
                        <AnswerInput
                          name="answer"
                          placeholder="Digite a resposta aqui"
                          containerStyle={{
                            width: 700,
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
                </>
              ) : (
                  <ReactLoading color="#000" type="balls" />
                )}
            </QuestionOverlay>
          </QuestionContainer>
          <RankContainer>
            <Ranking
              content={
                wsResponse !== '' &&
                wsResponse !== 'pong' &&
                JSON.parse(wsResponse)
              }
            >
              <br />
            </Ranking>
          </RankContainer>
        </FirstRowContainer>
        <SecondRowContainer>
          <VideoCards>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
            <VideoCard></VideoCard>
          </VideoCards>
          <ChatContainer>
            <Chat sendMessage={sendMessage} wsConnection={sWs.current} />
          </ChatContainer>
        </SecondRowContainer>
      </Container>
    </PageContent>
  );
};

export default Questionary;
