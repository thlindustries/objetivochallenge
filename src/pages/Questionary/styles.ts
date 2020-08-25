import styled from 'styled-components';
import { shade } from 'polished';

import Input from '../../components/Input';
import Button from '../../components/Button';

export const PageContent = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

export const Container = styled.div``;

export const FirstRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;

  width: 100vw;
  height: 60vh;
`;

export const LogoutButton = styled.p`
  display: flex;
  align-items: center;
  color: #eb171e !important;

  svg {
    margin-right: 8px;
    color: #eb171e;

    transition: color 0.3s;
  }

  &:hover {
    cursor: pointer;
    color: ${shade(0.4, '#eb171e')} !important;
    svg {
      color: ${shade(0.4, '#eb171e')} !important;
    }
  }
`;

export const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  box-shadow: 0 0 10px #000;

  width: 75%;

  padding: 40px;
`;

export const Question = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  font-family: 'Poppins';
  font-size: 32px;
  color: #fff;

  width: 80%;

  margin-bottom: auto;
`;

export const QuestionContent = styled.div`
  width: 80%;

  margin-top: 40px;

  padding: 18px;

  background: rgba(0, 0, 0, 0.6);
`;

export const QuestionContentItem = styled.div`
  font-size: 18px;
`;

export const Answer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border: solid 1px #000;
`;

export const FormContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const AnswerInput = styled(Input)``;

export const AnswerButton = styled(Button)`
  background: #05a746;

  width: 20%;

  margin-left: 6%;
  margin-top: 0;

  &:hover {
    cursor: pointer;
    background: ${shade(0.4, '#05a746')} !important;
    svg {
      color: ${shade(0.4, '#fff')} !important;
    }
  }
`;

export const Hint = styled.p`
  margin-right: 8em;
  margin-top: 8px;

  color: #fff;

  strong {
    color: #eb171e;
  }
`;

export const RankContainer = styled.div`
  display: flex;
  justify-content: center;

  font-family: 'Poppins';
  color: #fff;

  > p {
    font-size: 32px;
  }

  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  box-shadow: 0 0 10px #000;

  width: 25%;

  margin-left: 3%;

  padding: 32px;
`;

export const SecondRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;

  /* margin-top: 60px; */

  width: 100vw;
  height: 25vh;
`;

export const VideoCards = styled.div`
  display: flex;
  flex-direction: row;

  width: 73%;

  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  box-shadow: 0 0 10px #000;

  padding: 18px;
`;

export const VideoCard = styled.div`
  width: 180px;
  height: 180px;

  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  box-shadow: 0 0 10px #000;

  & + div {
    margin-left: 18px;
  }
`;

export const Chat = styled.div`
  width: 25%;

  margin-left: 3%;

  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  box-shadow: 0 0 10px #000;
`;
