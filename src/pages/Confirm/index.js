import React, { useMemo } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { View, Text, TouchableOpacity } from 'react-native';
import api from '~/services/api';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';
import BackGround from '~/components/Background';

export default function Confirm({ navigation }) {
  const provider = navigation.getParam('provider');
  const time = navigation.getParam('time');
  const a = time.split('T');
  console.log('Dados', time, provider);

  const date = a[1].split(':');
  const dateFormated = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );
  const dateReal = dateFormated.split(' ');
  async function handleAddAppointments() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });
    navigation.navigate('DashBoard');
  }
  return (
    <BackGround>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time> {`${dateReal[0]} as ${date[0]}:00`}</Time>
        <SubmitButton onPress={() => handleAddAppointments()}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </BackGround>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar agendamento',
  // Componente que pode ser renderizado como um icone na <- de voltar
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text
        style={{
          fontSize: 12,
          color: '#fff',
          borderStyle: 'solid',
          borderBottomWidth: 2,
          borderBottomColor: '#fff',
        }}
      >
        Voltar
      </Text>
    </TouchableOpacity>
  ),
});
