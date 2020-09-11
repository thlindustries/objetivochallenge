import React, { useState, useEffect } from 'react';

import { useAuth } from '../../hooks/auth';

import { Container, Header, Title, Content, Body, Item } from './styles';

interface RankingProps {
  content?: any;
}

interface Ranking {
  TeamCurrentQuestionId?: string;
  TeamId?: string;
  TeamName: string;
  TeamPoints: number;
}

const Ranking: React.FC<RankingProps> = ({ children, content }) => {
  const { user } = useAuth();

  const [list, setList] = useState<Ranking[]>([]);

  useEffect(() => {
    if (content !== false) {
      setList(content);
    }
    // console.log(user.TeamName);
  }, [content, user]);

  return (
    <Container>
      <Content>
        <Header>
          <Title>Ranking</Title>
        </Header>
        <Body>
          {list.map((item) => (
            <Item
              myTeam={user.TeamName === item.TeamName && true}
              key={item.TeamName}
            >
              <img
                src="data:image/png;base64,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"
                alt=""
              />
              <h3>{item.TeamName}</h3>
              <p>{`${item.TeamPoints} pts`}</p>
            </Item>
          ))}
        </Body>
      </Content>
    </Container>
  );
};

export default Ranking;
