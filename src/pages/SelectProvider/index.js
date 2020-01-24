import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import api from '~/services/api';
import { Container, ProviderList, Provider, Avatar, Name } from './styles';
import BackGround from '~/components/Background';

export default function SelectProvider({ navigation }) {
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');
      setProviders(response.data);
    }
    loadProviders();
  }, []);
  return (
    <BackGround>
      <Container>
        <ProviderList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider
              onPress={() =>
                navigation.navigate('SelectDateTime', { provider })
              }
            >
              <Avatar
                source={{
                  uri: provider.avatar
                    ? provider.avatar.url
                    : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                }}
              />
              <Name>{provider.name}</Name>
            </Provider>
          )}
        />
      </Container>
    </BackGround>
  );
}
// /Função que retorna um objeto
SelectProvider.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o Prestador',
  // Componente que pode ser renderizado como um icone na <- de voltar
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.navigate('DashBoard')}>
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
