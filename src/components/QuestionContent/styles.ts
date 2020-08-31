import styled from 'styled-components';

import Vimeo from '@u-wave/react-vimeo';

interface ImageContainerProps {
  imageUrl?: string;
}

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: red;

  width: 400px;
  height: 200px;
`;

export const StyledVimeo = styled(Vimeo)``;

export const ImageContainer = styled.div<ImageContainerProps>`
  display: flex;
  width: 100%;
  height: 100%;

  border: solid 4px aqua;

  background-image: url(${(props) => props.imageUrl});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const StyledImage = styled.img`
  width: 300px;
  height: 300px;
`;
