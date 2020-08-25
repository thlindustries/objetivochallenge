import React, { useEffect, useRef, useState } from 'react';
import { FiLogOut, FiPlay } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Axios from 'axios';
import { useAuth } from '../../hooks/auth';
// import { useToast } from '../../hooks/toast';

// import getValidationErrors from '../../utils/getValidationErrors';

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
  // QuestionContent,
  // QuestionContentItem,
  QuestionContainer,
  RankContainer,
  VideoCards,
  VideoCard,
  Chat,
} from './styles';

import Header from '../../components/Header';

interface Question {
  QuestionId: string;
  QuestionTitle: string;
  QuestionAnswer: string;
  QuestionHints: string;
  QuestionAnswerCharacterCounter: string;
}

const Questionary: React.FC = () => {
  const { signOut, user } = useAuth();

  // const { addToast } = useToast();
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
    });
  }, [user.TeamCurrentQuestionId, user.UserId, user.UserTeamId]);

  // useEffect(() => {
  //   addToast({ title: 'teste', description: 'blablabla', type: 'success' });
  // }, [addToast]);
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
            <Question>{`${question.QuestionId}- ${question.QuestionTitle}`}</Question>
            {/* <Question>
              <p>
                25- Para responder a pergunta escute o audio, reproduza o vídeo
                e baixe o arquivo
              </p>
              <QuestionContent>
                <QuestionContentItem>- Audio</QuestionContentItem>
                <QuestionContentItem>- Vídeo</QuestionContentItem>
                <QuestionContentItem>- Arquivo</QuestionContentItem>
              </QuestionContent>
            </Question> */}
            <Answer>
              <Form ref={formRef} onSubmit={() => console.log('oi')}>
                <FormContent>
                  <AnswerInput
                    name="resposta"
                    placeholder="Digite a resposta aqui"
                    containerStyle={{
                      width: 800,
                      border: 'solid 1px red',
                    }}
                  />
                  <AnswerButton>
                    <FiPlay size={20} />
                  </AnswerButton>
                </FormContent>
              </Form>
            </Answer>
            <Hint>
              <strong>Dica: </strong>{' '}
              {`a resposta tem ${question.QuestionAnswerCharacterCounter} caracteres`}
            </Hint>
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
