import React, { createContext, useCallback, useState, useContext } from 'react';
import Axios from 'axios';
// import api from '../services/api';

interface User {
  id: string;
  avatar_url: string;
  nome: string;
  email: string;
}

interface AuthContextData {
  user: User;
  senha?: string;
  signIn(loginInfo: Login): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

interface Login {
  team: string;
  password: string;
}

// interface UserLoginData {
//   token: string;
//   user: User;
// }

interface UserLoginData {
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<UserLoginData>(() => {
    const token = localStorage.getItem('@Challenge:token');
    const user = localStorage.getItem('@Challenge:user');

    // if (token && user) {
    //   Axios.defaults.headers.authorization = `Bearer ${token}`;
    //   return {
    //     token,
    //     user: JSON.parse(user),
    //   };
    // }

    if (user) {
      Axios.defaults.headers.authorization = `Bearer ${token}`;
      return {
        token,
        user: JSON.parse(user),
      };
    }

    return {} as UserLoginData;
  });

  const signIn = useCallback(async ({ team, password }) => {
    const response = await Axios.post(
      'https://16hgpfnq69.execute-api.sa-east-1.amazonaws.com/prod/login',
      {
        UserEmail: team,
        UserPassword: password,
      },
    );

    // const { user, token } = response.data;
    const { user } = response.data;

    // localStorage.setItem('@Challenge:token', token);
    localStorage.setItem('@Challenge:user', JSON.stringify(user));

    // Axios.defaults.headers.authorization = `Bearer ${token}`;

    // setData({
    //   token,
    //   user,
    // });

    console.log(user);

    setData({
      user,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Challenge:token');
    localStorage.removeItem('@Challenge:user');

    setData({} as UserLoginData);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@Challenge:user', JSON.stringify(user));

      // setData({
      //   token: data.token,
      //   user,
      // });
      setData({
        user,
      });
    },
    [setData],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}
