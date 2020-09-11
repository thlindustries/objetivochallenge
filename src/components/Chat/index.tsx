/* eslint-disable no-param-reassign */
import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiPlay } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';
import { useChat } from '../../hooks/chat';

import {
  Container,
  Content,
  ChatTitle,
  ChatHistoryContainer,
  Message,
  MessageContainer,
  FormContent,
} from './styles';
import Input from '../Input';

interface Message {
  message: string;
  userName: string;
}

interface ChatProps {
  wsConnection?: WebSocket;
  callBack?: void;
  sendMessage?(userName: string, teamId: string, message: string): void;
}

const Chat: React.FC<ChatProps> = ({ wsConnection, callBack, sendMessage }) => {
  const { user } = useAuth();
  const { messages, addMessage } = useChat();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    (inputRef: HTMLInputElement) => {
      if (
        inputRef.value !== '' &&
        inputRef.value !== undefined &&
        wsConnection !== undefined
      ) {
        if (sendMessage) {
          sendMessage(user.UserName, user.UserTeamId, inputRef.value as string);
          addMessage(inputRef.value as string, user.UserName);
        }
        inputRef.value = '';
      }
    },
    [addMessage, sendMessage, user.UserName, user.UserTeamId, wsConnection],
  );

  return (
    <Container>
      <Content>
        <ChatTitle>{`Chat do time ${user.TeamName}`}</ChatTitle>
        <ChatHistoryContainer>
          {messages &&
            messages.map((message, index) => {
              return (
                message.message !== '' &&
                user.UserName !== undefined && (
                  <Message
                    isMe={user.UserName === message.userName}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${user.UserName}-${index}`}
                  >
                    <strong>{`${message.userName}: `}</strong>
                    {message.message}
                  </Message>
                )
              );
            })}
        </ChatHistoryContainer>
        <MessageContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <FormContent>
              <Input
                name="message"
                placeholder="Digite uma mensagem"
                callback={handleSubmit}
              />
              <FiPlay size={50} />
            </FormContent>
          </Form>
        </MessageContainer>
      </Content>
    </Container>
  );
};

export default Chat;
