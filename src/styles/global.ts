import { createGlobalStyle } from 'styled-components';
import rocketBg from '../assets/img/bewng.png';

export default createGlobalStyle`

  * {
    margin:0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    font-family: 'Archivo';

    padding: 32px;

    background-image: url(${rocketBg});

    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

  }

`;
