import React, { useState, useEffect } from 'react';

import {
  PageRegulamento,
  Container,
  Card,
  Content,
  Title,
  SubContent,
  SubContentItem,
} from './styles';
import Header from '../../components/Header';
import Json from './regulamento.json';

interface SubItem {
  text: string;
  id: number;
}

const Regulamento: React.FC = () => {
  const [tab, setTab] = useState('');

  useEffect(() => {
    setTab('regulamento');

    const script = document.createElement('script');

    script.src = '//code.jivosite.com/widget/AIh2Mhazzn';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <PageRegulamento>
      <Header selectedTab={tab} />
      <Container>
        {Json.regulamento.map((item) => {
          return (
            <Card key={item.title}>
              <Title>{item.title}</Title>
              <Content>{item.content}</Content>
              <SubContent>
                {item.subcontents.map(({ id, text }: SubItem) => {
                  return <SubContentItem key={id}>{text}</SubContentItem>;
                })}
              </SubContent>
            </Card>
          );
        })}
      </Container>
    </PageRegulamento>
  );
};

export default Regulamento;
