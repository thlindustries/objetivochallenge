import styled, { css } from 'styled-components';
import { shade } from 'polished';

import { loadFromTransparent, loadFromDownAndTransparent } from './animations';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Tooltip from '../../components/Tooltip';

interface TooltipProps {
  type?: string;
}

export const PageContent = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  animation: ${loadFromDownAndTransparent} 1.2s;
`;

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
  color: #fff !important;

  svg {
    margin-right: 8px;
    color: #fff;

    transition: color 0.3s;
  }

  &:hover {
    cursor: pointer;
    color: ${shade(0.4, '#fff')} !important;
    svg {
      color: ${shade(0.4, '#fff')} !important;
    }
  }
`;

export const QuestionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: rgba(251, 124, 31, 0.9);
  border-radius: 12px;
  box-shadow: 0 0 10px #000;

  width: 75%;

  padding: 14px;
`;

export const QuestionOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  /* overflow: hidden; */

  width: 100%;
  height: 100%;

  border-radius: 12px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 10px #000;

  border: solid 4px aquamarine;

  padding: 32px;
`;

export const Question = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* overflow: hidden; */

  font-family: 'Poppins';
  font-size: 32px;
  font-weight: bold;
  color: #000;

  width: 100%;
  height: 90%;

  margin-bottom: auto;

  border: solid 1px blue;
`;

export const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: solid 1px red;

  padding: 0 32px;

  width: 100%;
  margin-bottom: auto;

  p {
    width: 80%;

    border: solid 1px green;
    animation: ${loadFromTransparent} 1.2s;
  }
`;

export const LoadingQuestion = styled.div`
  svg {
    margin-top: 24%;
  }
  p {
    margin-left: 18px;
  }
`;

export const HintButton = styled.div`
  margin-right: 4%;

  color: #ffe700;
  transition: color 0.4s;

  &:hover {
    color: #fffcdb;

    cursor: pointer;
  }
`;

export const PassButton = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2%;

  color: #c53030;

  transition: color 0.4s;

  &:hover {
    color: #fddede;

    cursor: pointer;
  }
`;

export const QuestionContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  /* height: 300px; */

  /* margin-top: 40px; */

  padding: 12px;

  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
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
  align-items: center;
`;

export const ReportErrorButton = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  margin-right: 4%;
  svg {
    color: #eb171e;
    transition: color 0.4s;
  }

  transition: color 0.4s;

  &:hover {
    cursor: pointer;
    color: #fddede;

    svg {
      color: #fddede;
    }
  }
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

  color: #000;

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
  width: 20%;
  height: 98%;

  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  box-shadow: 0 0 10px #000;

  & + div {
    margin-left: 18px;
  }

  transition: transform 0.4s;

  &:hover {
    transform: scaleY(1.09);
  }
`;

export const Chat = styled.div`
  width: 25%;

  margin-left: 3%;

  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  box-shadow: 0 0 10px #000;
`;

export const StyledTooltip = styled(Tooltip) <TooltipProps>`
  span {
    ${(props) =>
    props.type === 'hint' &&
    css`
        background: #0088ff;
        color: #fff;
      `}
  }
`;
