import React, { useRef, useState, useEffect } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BackGround from '~/components/Background';
import {
  Container,
  Title,
  Separator,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
  LogoutTitle,
} from './styles';
import { updateProfileRequest } from '../../store/modules/user/actions';
import { logoutUser } from '~/store/modules/auth/actions';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        name,
        email,
        oldPassword,
        password,
        confirmPassword,
      })
    );
  }
  // Sempre que alterar a senha limpa os dados do password
  useEffect(() => {
    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  }, [profile]);

  function handleLogout() {
    dispatch(logoutUser());
  }
  return (
    <BackGround>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" enabled>
        <Container>
          <Title>Meu perfil</Title>
          <Form>
            <FormInput
              icon="person-outline"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu nome completo"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
              value={name}
              onChangeText={setName}
            />
            <FormInput
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu e-mail"
              ref={emailRef}
              returnKeyType="next"
              value={email}
              onChangeText={setEmail}
              onSubmitEditing={() => oldPasswordRef.current.focus()}
            />
            <Separator />
            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Sua senha atual"
              ref={oldPasswordRef}
              value={oldPassword}
              onChangeText={setOldPassword}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Sua nova senha"
              ref={passwordRef}
              value={password}
              onChangeText={setPassword}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
            />
            <FormInput
              icon="lock-outline"
              secureTextEntry
              placeholder="Confirmação de senha"
              ref={confirmPasswordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <SubmitButton onPress={handleSubmit}>Atualizar perfil</SubmitButton>
            <LogoutButton onPress={handleLogout} exit>
              <LogoutTitle>Sair</LogoutTitle>
            </LogoutButton>
          </Form>
        </Container>
      </KeyboardAvoidingView>
    </BackGround>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
