import styled from 'styled-components';
import { loadFromLeft } from './animations';

export const PageRegulamento = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;

  height: 90vh;
  width: 90vw;

  padding: 64px;

  margin-left: 4%;

  font-family: 'Poppins';
`;

export const Card = styled.div`
  margin-top: 24px;
  width: 100%;

  padding: 32px;

  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 10px #000;
  border-radius: 14px;

  animation: ${loadFromLeft} 1.5s;

  transition: background-color 0.4s;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    cursor: default;
  }
`;

export const Title = styled.p`
  color: #fafafa;
  font-weight: bold;
  font-size: 28px;
`;

export const Content = styled.p`
  margin-top: 8px;
  color: #d1d1d1;

  font-weight: bold;
`;

export const SubContent = styled.div`
  margin-top: 12px;
`;

export const SubContentItem = styled.p`
  margin-top: 8px;
  color: #d1d1d1;

  font-weight: bold;

  & + p {
    margin-top: 20px;
  }
`;
