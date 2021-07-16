import React, { useCallback, useEffect } from 'react';
import { FiXCircle } from 'react-icons/fi';

import {
  Container,
  Content,
  AlertContainer,
  AlertHeader,
  CloseButton,
  Description,
  StyledButton,
  Title,
} from './styles';

interface ConfirmProps {
  show?: boolean;
  closeFunc?(): void;
  title?: string;
  pass?(): void;
}

const Confirm: React.FC<ConfirmProps> = ({
  show = false,
  closeFunc,
  title,
  pass,
}) => {
  const handleYesButton = useCallback(() => {
    pass && pass();
  }, [pass]);
  const handleCancelButton = useCallback(() => {
    closeFunc && closeFunc();
  }, [closeFunc]);

  return (
    <Container show={show}>
      <Content>
        <AlertContainer>
          <AlertHeader>
            <Title>
              <p>{title}</p>
            </Title>
            <CloseButton onClick={closeFunc}>
              <FiXCircle size={40} />
            </CloseButton>
          </AlertHeader>

          <Description>
            <StyledButton onClick={handleYesButton}>Sim</StyledButton>
            <StyledButton onClick={handleCancelButton} bg="fb7c1f">
              Cancelar
            </StyledButton>
          </Description>
        </AlertContainer>
      </Content>
    </Container>
  );
};

export default Confirm;
