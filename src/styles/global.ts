import { createGlobalStyle } from 'styled-components';
import rocketBg from '../assets/img/bgfiltered.png';
import pureBlue from '../assets/img/mainframe.png';

export default createGlobalStyle`

  * {
    margin:0px;
    padding: 0;
    box-sizing: border-box;
    outline: 0;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  body {
    font-family: 'Archivo';

    display:flex;
    justify-content: center;
    align-items: center;
    padding: 32px;

    background-image: url(${rocketBg});

    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

  }

  html,body{
    height: 100%;
    margin:0px;
  }

`;
