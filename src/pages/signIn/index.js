import React, { useRef, useState } from 'react';
import { Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import logo from '~/assets/logo.png';
import BackGroundLinear from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

import {
  Container,
  Form,
  FormInput,
  Botao,
  LinkRegister,
  LinkRegisterText,
} from './styles';

export default function signIn({ navigation }) {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  const passwordRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }
  return (
    <BackGroundLinear>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Digite seu e-mail"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />
          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Sua senha secreta"
            ref={passwordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={password}
            onChangeText={setPassword}
          />
          <Botao onPress={() => handleSubmit()} loading={loading}>
            Acessar
          </Botao>
        </Form>
        <LinkRegister onPress={() => navigation.navigate('SignUp')}>
          <LinkRegisterText>Criar uma conta gratuita</LinkRegisterText>
        </LinkRegister>
      </Container>
    </BackGroundLinear>
  );
}
