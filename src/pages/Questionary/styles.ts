import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  /* background: rgba(0, 0, 0, 0.4); */
  margin-top: 20em;

  width: 100vw;
  height: 100vh;
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
