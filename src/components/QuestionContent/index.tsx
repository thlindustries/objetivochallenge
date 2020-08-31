import React, { useCallback, useEffect, useState } from 'react';

import ReactAudioPlayer from 'react-audio-player';
import { Container, StyledVimeo } from './styles';

interface ContentProps {
  type?: string;
  url?: string;
}

const QuestionContent: React.FC<ContentProps> = ({ type, url }) => {
  const [winWidth, setWinWidth] = useState(0);

  const showCurrentTime = useCallback((info: any) => {
    // console.log('Video pausado');
    // console.log(info);
  }, []);

  const handleEndVideo = useCallback((info: any) => {
    // console.log('Video terminado');
    // console.log(info);
  }, []);

  const handleProgressVideo = useCallback((info: any) => {
    // console.log('Video rodando');
    // console.log(`largura da tela: ${winWidth}`);
    // console.log(info);
  }, []);

  useEffect(() => {
    const width = window.innerWidth;

    if (width < 700) {
      setWinWidth(200);
    } else {
      setWinWidth(400);
    }
  }, []);

  return (
    <Container>
      {type === 'video' && (
        <StyledVimeo
          video={url || ' '}
          height={400}
          width={400}
          onPause={(info) => showCurrentTime(info)}
          onEnd={(info) => handleEndVideo(info)}
          onTimeUpdate={(info) => handleProgressVideo(info)}
          start={120}
        />
      )}
      {type === 'audio' && (
        <>
          <ReactAudioPlayer
            src="https://audiochicoteste.s3-sa-east-1.amazonaws.com/audios/Lil+Nas+X+-+Old+Town+Road+(adamsteve+Remix).mp3"
            controls
            volume={0.5}
          />
        </>
      )}
      {type === 'file' && (
        <p>{`Aqui vai o link para download do arquivo url: ${url}`}</p>
      )}
    </Container>
  );
};

export default QuestionContent;
