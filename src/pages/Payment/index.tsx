/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/jsx-equals-spacing */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiCreditCard, FiDollarSign } from 'react-icons/fi';
import PaymentCard from '../../components/PaymentCard';
import PaymentBol from '../../components/PaymentBol';

import {
  PageGame,
  TContainer,
  CircleContent,
  StyledButton,
  PageWrapper,
  ButtonsContainer,
  LogoOptions,
  Logo,
  LogoContent,
} from './styles';

import Header from '../../components/Header';

import seta from '../../assets/img/seta.png';

const Payment: React.FC = () => {
  const [isCard, setIsCard] = useState(false);
  const [isBol, setIsBol] = useState(false);
  const [pay, setPay] = useState('');

  const iconStyle = {
    marginLeft: '-10px',
    marginRight: '10px',
  } as React.CSSProperties;

  const PayCard = () => {
    setPay('login');
    setIsCard(true);
  };

  const PayBol = () => {
    setPay('login');
    setIsBol(true);
  };

  const goBack = () => {
    if (!isCard && !isBol) window.history.back();
    else if (isCard && !isBol) {
      setPay('false');
      setIsCard(false);
    } else if (!isCard && isBol) {
      setPay('false');
      setIsBol(false);
    }
  };

  const returnPayment = () => {
    if (isCard) {
      return 'card';
    }
    if (isBol) {
      return 'pix';
    }
    return 'payment';
  };

  useEffect(() => {
    const script = document.createElement('script');

    script.src = '//code.jivosite.com/widget/AIh2Mhazzn';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <PageGame>
      <Header />
      <LogoContent>
        <LogoOptions>
        <StyledButton isBack onClick={goBack}>
            <FiArrowLeft size={32} /> Voltar
          </StyledButton>
          <script src="//code.jivosite.com/widget/AIh2Mhazzn" async />
          <TContainer>
            <br />
            <PageWrapper>
              <CircleContent payment={returnPayment()}>
                {!isCard && !isBol && (
                  <div>
                    <p>Selecione uma das formas de pagamento</p>
                    <p className="amount">
                      Valor da Inscrição do time: <strong>R$80</strong>
                    </p>
                  </div>
                )}
                {pay !== 'login' ? (
                  <ButtonsContainer>
                    <StyledButton onClick={PayCard} countdownOver={false}>
                      <FiCreditCard style={iconStyle} /> Cartão
                    </StyledButton>
                    <StyledButton onClick={PayBol} countdownOver>
                      <FiDollarSign style={iconStyle} />
                      Pix
                    </StyledButton>
                  </ButtonsContainer>
                ) : (
                  (isCard && (
                    <TContainer>
                      <PaymentCard />
                    </TContainer>
                  )) ||
                  (isBol && (
                    <TContainer>
                      <PaymentBol />
                    </TContainer>
                  ))
                )}
              </CircleContent>
            </PageWrapper>
          </TContainer>
        </LogoOptions>
      </LogoContent>
    </PageGame>
  );
};

export default Payment;
