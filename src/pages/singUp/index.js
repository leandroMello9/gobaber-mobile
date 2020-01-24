import React, { useRef, useState } from 'react';
import { Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { singUpRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.png';
import BackGroundLinear from '~/components/Background';

import {
  Container,
  Form,
  FormInput,
  Botao,
  LinkRegister,
  LinkRegisterText,
} from './styles';

export default function signUp({ navigation }) {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function handleSubmit() {
    dispatch(singUpRequest(name, email, password));
  }
  return (
    <BackGroundLinear>
      <Container>
        <Image source={logo} />
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
            onSubmitEditing={() => passwordRef.current.focus()}
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
            Cadastrar
          </Botao>
        </Form>
        <LinkRegister onPress={() => navigation.navigate('SignIn')}>
          <LinkRegisterText>Ja tenho conta</LinkRegisterText>
        </LinkRegister>
      </Container>
    </BackGroundLinear>
  );
}
