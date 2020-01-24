import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import BackGround from '~/components/Background';
import DateInput from '~/components/DateInput';
import { HourList, Hour, Title } from './styles';
import api from '~/services/api';

export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHour] = useState([]);
  const provider = navigation.getParam('provider');
  console.log(date);
  useEffect(() => {
    async function loadAvaible() {
      const response = await api.get(`/providers/${provider.id}/available`, {
        params: {
          // Formato de timestamps
          date: date.getTime(),
        },
      });

      setHour(response.data);
    }
    loadAvaible();
  }, [date, provider.id]);
  function handleSelectHour(time) {
    navigation.navigate('Confirm', {
      time,
      provider,
    });
  }
  return (
    <BackGround>
      <DateInput date={date} onChange={setDate} />
      <HourList
        data={hours}
        keyExtractor={item => item.time}
        renderItem={({ item }) => (
          <Hour
            onPress={() => handleSelectHour(item.value)}
            enable={item.available}
          >
            <Title>{item.time}</Title>
          </Hour>
        )}
      />
    </BackGround>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione um horario',
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
