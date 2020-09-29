import { keyframes } from 'styled-components';

export const loadFromLeft = keyframes`
  from{
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
