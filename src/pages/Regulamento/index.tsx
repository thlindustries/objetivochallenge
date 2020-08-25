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

const Regulamento: React.FC = () => {
  const [tab, setTab] = useState('');

  useEffect(() => {
    setTab('regulamento');
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
                {item.subcontents.map((subitem) => {
                  return <SubContentItem>{subitem.text}</SubContentItem>;
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
