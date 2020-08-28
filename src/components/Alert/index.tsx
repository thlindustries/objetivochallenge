import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import ReactLoading from 'react-loading';
import { FiXCircle } from 'react-icons/fi';

import Axios from 'axios';
import {
  Container,
  Content,
  AlertContainer,
  AlertHeader,
  Title,
  CloseButton,
  Description,
  SendingContainer,
  LoadingContainer,
  StyledButton,
} from './styles';

import Textarea from '../Textarea';

interface AlertProps {
  title?: string;
  placeholder?: string;
  errFunc?(): void;
  show?: boolean;
}

interface DataFormInfo {
  error: string;
}

const Alert: React.FC<AlertProps> = ({
  errFunc,
  show = true,
  placeholder = 'Placeholder padrão',
  title = 'Título padrão',
}) => {
  const formRef = useRef<FormHandles>(null);
  const [sending, setIsSending] = useState(false);

  const handleSubmit = useCallback((data: DataFormInfo) => {
    // errFunc && errFunc();
    setIsSending(true);
    Axios.get('/shupa').then((response) => {
      console.log(response.data);

      setIsSending(false);
    });
    console.log(data);
  }, []);

  return (
    <Container show={show}>
      <Content>
        <AlertContainer>
          {sending ? (
            <SendingContainer>
              <LoadingContainer>
                <ReactLoading color="#c53030" type="cubes" />
              </LoadingContainer>
              <CloseButton onClick={errFunc}>
                <FiXCircle size={40} />
              </CloseButton>
            </SendingContainer>
          ) : (
              <>
                <AlertHeader>
                  <Title>
                    <p>{title}</p>
                  </Title>
                  <CloseButton onClick={errFunc}>
                    <FiXCircle size={40} />
                  </CloseButton>
                </AlertHeader>

                <Description>
                  <Form ref={formRef} onSubmit={handleSubmit}>
                    <Textarea placeholder={placeholder} name="error"></Textarea>
                    <StyledButton type="submit">Reportar erro</StyledButton>
                  </Form>
                </Description>
              </>
            )}
        </AlertContainer>
      </Content>
    </Container>
  );
};

export default Alert;
