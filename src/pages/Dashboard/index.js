import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackGround from '~/components/Background';
import Appointments from '~/components/Appointments';
import api from '~/services/api';
import { Container, Title, List } from './styles';

function Dashboard({ isFocused }) {
  const [appointments, setAppointments] = useState([]);
  async function loadAppointments() {
    const response = await api.get('appointments');
    setAppointments(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);
  async function handleCancelAppointment(id) {
    const response = await api.delete(`appointments/${id}`);
    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment
      )
    );
  }
  console.log(appointments);
  return (
    <BackGround>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Appointments
              onCancel={() => handleCancelAppointment(item.id)}
              data={item}
            />
          )}
        />
      </Container>
    </BackGround>
  );
}
// Definindo a configuração das navigations
Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
export default withNavigationFocus(Dashboard);
