import React, { createContext, useCallback, useState, useContext } from 'react';

interface ChatContextData {
  addMessage(message: string, userName: string): Promise<void>;
  messages: Message[];
}

export interface Message {
  message: string;
  userName: string;
}

const ChatContext = createContext<ChatContextData>({} as ChatContextData);

export const ChatProvider: React.FC = ({ children }) => {
  // const [messages, setMessages] = useState<Message[]>([]);
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('@Challenge:chat');

    if (savedMessages) {
      return JSON.parse(savedMessages);
    }
    return [{ message: '', userName: '' }];
  });

  const addMessage = useCallback(
    async (message: string, userName: string) => {
      const addingMessage = messages;
      addingMessage.push({ message, userName });

      localStorage.setItem('@Challenge:chat', JSON.stringify(addingMessage));
      // if (addMessage.length < 10) {
      // }

      setMessages([...addingMessage]);
    },
    [messages],
  );

  return (
    <ChatContext.Provider value={{ addMessage, messages }}>
      {children}
    </ChatContext.Provider>
  );
};

export function useChat(): ChatContextData {
  const context = useContext(ChatContext);

  return context;
}
