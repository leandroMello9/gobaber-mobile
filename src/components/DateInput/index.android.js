import React, { useMemo, useState } from 'react';
import { View, DatePickerAndroid } from 'react-native';

import { format, isBefore, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from '@expo/vector-icons/MaterialIcons';
import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange }) {
  const [dateIsBefore, setDateIsBefore] = useState(null);

  const dateFormatted = useMemo(
    () => format(date, "dd 'de' MMMM 'de' yyyy", { locale: pt }),
    [date]
  );

  async function handleOpenPicker() {
    const { action, year, month, day } = await DatePickerAndroid.open({
      mode: 'spinner',
      date,
    });

    // Se o usuario selecionou alguma data
    if (action === DatePickerAndroid.dateSetAction) {
      const selectedDate = new Date(year, month, day);

      const dateIsBefore = isBefore(selectedDate, new Date());
      console.log(dateIsBefore);
      if (dateIsBefore) {
        onChange(new Date());
      } else {
        onChange(selectedDate);
      }
    }
  }
  return (
    <Container>
      <DateButton onPress={handleOpenPicker}>
        <Icon name="event" color="#fff" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>
    </Container>
  );
}
