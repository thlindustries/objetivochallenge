import React from 'react';

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
  return (
    <PageRegulamento>
      <Header />
      <Container>
        {Json.regulamento.map((item) => {
          return (
            <Card>
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
