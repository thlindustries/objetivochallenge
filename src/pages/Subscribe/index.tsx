import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { FiArrowLeft, FiLock, FiUser } from 'react-icons/fi';
import * as Yup from 'yup';
import ReactLoading from 'react-loading';
import Axios from 'axios';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Select } from '@material-ui/core';
import { useAuth } from '../../hooks/auth';
import { useTeam } from '../../hooks/team';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  PageGame,
  TContainer,
  CircleContent,
  PageWrapper,
  FormContainer,
  FormHeader,
  SelectC,
  StyledButton,
  ImageContainer,
  MainImg,
  ImageComponents,
  LogoContent,
  LogoOptions,
} from './styles';

import Header from '../../components/Header';
import { LContainer } from '../Game/styles';
import ImageUpload from '../../components/ImageUpload';
import Input from '../../components/Input';

interface DataFormInfo {
  useremail: string;
  userfullname: string;
  teamcategory: string;
  usernickname: string;
  userpassword: string;
  teamname: string;
}

const Subscribe: React.FC = () => {
  const [isLogging, setIsLogging] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { user, signIn, signOut } = useAuth();
  const { team, signTeam } = useTeam();
  const loading = false;
  const [teamImgUrl, setTeamImgUrl] = useState('');
  const [userImgUrl, setUserImgUrl] = useState('');
  const [category, setCategory] = useState('');

  const formRef = useRef<FormHandles>(null);

  const defaultTeamProfileImage = useMemo<string>(
    () => 'https://cdn.raceroster.com/assets/images/team-placeholder.png',
    [],
  );

  const defaultUserProfileImage = useMemo<string>(
    () =>
      'https://nextlevelimagesprofile.s3-sa-east-1.amazonaws.com/defaultUser.png',
    [],
  );

  const handleSubmit = useCallback(
    async (data: DataFormInfo) => {
      setIsLogging(true);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          useremail: Yup.string()
            .email('Insira um email válido')
            .required('Email obrigatório'),
          userfullname: Yup.string().required('Nome completo obrigatório'),
          usernickname: Yup.string().required('Nome do usuário obrigatório'),
          userpassword: Yup.string().required('Senha obrigatória'),
          teamname: Yup.string().required('Nome do time obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await Axios.post(
          `https://j1hjd787mc.execute-api.sa-east-1.amazonaws.com/prod/signup`,
          {
            useremail: data.useremail,
            userfullname: data.userfullname,
            teamcategory: category,
            usernickname: data.usernickname,
            userpassword: data.userpassword,
            userimageurl: userImgUrl.split('base64,')[1],
            teamimageurl: teamImgUrl.split('base64,')[1],
            teamname: data.teamname,
          },
        ).then((res) => console.log(res));

        await signTeam(
          await signIn({
            email: data.useremail,
            password: data.userpassword,
          }),
        );

        setIsLogging(false);

        window.location.href = '/regulamento';
      } catch (err) {
        setIsLogging(false);
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [teamImgUrl, userImgUrl, signTeam, signIn, category],
  );

  const logo = (): void => {
    window.location.href = '/';
  };

  const handleChange = (event: any): void => {
    setCategory(event.target.value);
  };

  const changeCheck = (): void => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    signOut();
    const script = document.createElement('script');

    script.src = '//code.jivosite.com/widget/AIh2Mhazzn';
    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [signOut]);

  return (
    <PageGame>
      <Header />
      <LogoContent>
        <LogoOptions>
          <StyledButton isBack onClick={logo}>
            <FiArrowLeft size={32} style={{ marginLeft: '-10px' }} />
            <span style={{ marginRight: '-3px' }}>Voltar</span>
          </StyledButton>
          {loading && (
            <LContainer>
              <ReactLoading
                type="spin"
                color="orange"
                height={1000}
                width={500}
              />
            </LContainer>
          )}
          <script src="//code.jivosite.com/widget/AIh2Mhazzn" async />

          {!loading && (
            <TContainer>
              {!user && (
                <PageWrapper>
                  <CircleContent>
                    <FormContainer>
                      <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="macroForm"
                      >
                        <div className="leftForm">
                          <FormHeader>
                            Dados do responsável do time (quem está fazendo o
                            cadastro)
                          </FormHeader>

                          <ImageComponents>
                            <ImageContainer>
                              <div className="main-profile-img">
                                <MainImg
                                  src={
                                    userImgUrl && userImgUrl !== ''
                                      ? userImgUrl
                                      : defaultUserProfileImage
                                  }
                                  alt="user"
                                />
                              </div>
                            </ImageContainer>
                            <div className="imageUploader">
                              <ImageUpload setImgUrl={setUserImgUrl} />
                            </div>
                          </ImageComponents>

                          <Input
                            name="useremail"
                            icon={FiUser}
                            placeholder="Email"
                            isSubscribe
                          />
                          <Input
                            name="userfullname"
                            icon={FiUser}
                            placeholder="Nome completo"
                            isSubscribe
                          />
                          <Input
                            name="usernickname"
                            icon={FiUser}
                            placeholder="Nome de usuário"
                            isSubscribe
                          />
                          <Input
                            name="userpassword"
                            icon={FiLock}
                            type="password"
                            placeholder="Senha"
                            isSubscribe
                          />
                        </div>

                        <div className="rightForm">
                          <FormHeader>
                            Preencha as informações do seu time
                          </FormHeader>

                          <ImageComponents>
                            <ImageContainer isRight>
                              <div className="main-profile-img">
                                <MainImg
                                  src={
                                    teamImgUrl && teamImgUrl !== ''
                                      ? teamImgUrl
                                      : defaultTeamProfileImage
                                  }
                                  alt="user"
                                />
                              </div>
                            </ImageContainer>
                            <div className="imageUploader">
                              <ImageUpload setImgUrl={setTeamImgUrl} />
                            </div>
                          </ImageComponents>

                          <Input
                            name="teamname"
                            icon={FiUser}
                            placeholder="Nome do time"
                            isSubscribe
                          />
                          <SelectC>
                            <Select
                              className="select"
                              name="teamcategory"
                              placeholder="Categoria"
                              id="category"
                              onChange={handleChange}
                              disableUnderline
                            >
                              <option value="Fundamental">Fundamental</option>
                              <option value="Médio">Médio</option>
                            </Select>
                          </SelectC>
                          <div className="submitButton">
                            <div className="checkbox">
                              <input
                                type="checkbox"
                                id="vehicle1"
                                name="vehicle1"
                                value="Bike"
                                onChange={changeCheck}
                              />
                              <span>
                                {' '}
                                Sou maior de 18 anos e sou responsável pelo time{' '}
                              </span>
                            </div>
                            <StyledButton
                              enabled={category !== '' && isChecked}
                              type="submit"
                            >
                              {isLogging ? <ReactLoading /> : 'Cadastar'}
                            </StyledButton>
                          </div>
                        </div>
                      </Form>
                    </FormContainer>
                  </CircleContent>
                </PageWrapper>
              )}
            </TContainer>
          )}
          {user && team && logo()}
        </LogoOptions>
      </LogoContent>
    </PageGame>
  );
};

export default Subscribe;
