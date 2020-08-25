import styled from 'styled-components';
import { shade } from 'polished';
import { loadLogo } from './animations';

export const Container = styled.div`
  background: rgba(0, 0, 0, 0.3);

  width: 100vw;
  height: 100px;

  border-radius: 0 0 10px 10px;
  position: absolute;

  top: 0;

  padding: 0 128px;

  /* animation: ${loadLogo} 1.4s; */
`;

export const LogoContent = styled.div`
  width: 100%;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoOptions = styled.div`
  display: flex;
  flex-direction: row;

  margin-left: auto;

  a {
    text-decoration: none;
  }

  p {
    margin-right: 48px;
    color: #fff;

    transition: color 0.4s;

    font-family: 'Poppins';
    font-size: 18px;

    &:hover {
      cursor: pointer;
      color: ${shade(0.4, '#bdbdbd')};
    }
  }
`;

export const Logo = styled.img`
  height: 40px;

  opacity: 1;
`;
