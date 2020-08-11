import React, { useState, useRef, useEffect, MutableRefObject } from 'react';

import {
  Container,
  NumberSection,
  Divisor,
  TimerSection,
  Number,
} from './styles';

interface CountDownProps {
  date: number;
  background?: boolean;
}

const PageCountdown: React.FC<CountDownProps> = ({
  date,
  background = true,
}) => {
  const [timerDays, setDays] = useState('00');
  const [timerHours, setHours] = useState('00');
  const [timerMinutes, setMinutes] = useState('00');
  const [timerSeconds, setSeconds] = useState('00');
  const [localStorageDate, setLocalStorageDate] = useState(0);

  let interval: MutableRefObject<number | undefined> = useRef();

  useEffect(() => {
    const localStorageItem = localStorage.getItem('@challenge:countdowndate');

    if (!localStorageItem) {
      localStorage.setItem('@challenge:countdowndate', JSON.stringify(date));
      setLocalStorageDate(date);
    } else {
      setLocalStorageDate(JSON.parse(localStorageItem));
    }

    interval = (setInterval(() => {
      const now = new Date().getTime();
      const distance = localStorageDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance > 0) {
        setDays(`${days}`);
        setHours(`${hours}`);
        setMinutes(`${minutes}`);
        setSeconds(`${seconds}`);
      } else {
        clearInterval(interval.current);
      }
    }, 1000) as unknown) as MutableRefObject<number | undefined>;

    return () => {
      clearInterval(interval.current);
    };
  }, [localStorageDate]);

  return (
    <Container>
      <TimerSection background={background}>
        <NumberSection>
          <Number>{timerDays}</Number>
          <p>
            <small>Dias</small>
          </p>
        </NumberSection>
        <Divisor>:</Divisor>

        <NumberSection>
          <Number>{timerHours}</Number>
          <p>
            <small>Horas</small>
          </p>
        </NumberSection>
        <Divisor>:</Divisor>

        <NumberSection>
          <Number>{timerMinutes}</Number>
          <p>
            <small>Minutos</small>
          </p>
        </NumberSection>
        <Divisor>:</Divisor>

        <NumberSection>
          <Number>{timerSeconds}</Number>
          <p>
            <small>Segundos</small>
          </p>
        </NumberSection>
      </TimerSection>
    </Container>
  );
};

export default PageCountdown;
