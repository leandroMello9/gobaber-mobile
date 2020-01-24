import React, { useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import pt from 'date-fns/locale/pt';
import { parseISO, formatRelative } from 'date-fns';
import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointmens({ data, onCancel }) {
  const [dat, setDat] = useState('');

  const dataParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  const a = dataParsed.split(' ');
  console.log(a[0]);
  const c = a.length > 1 ? a[2].split(':') : a;
  const d = c.length > 1 ? c[0] : c;

  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri:
              data.provider.avatar === null
                ? `https://api.adorable.io/avatar/50/${data.provider.name}.png`
                : data.provider.avatar.url,
          }}
        />
        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{`${a[0]} as ${parseInt(d) + 1} horas`}</Time>
        </Info>
      </Left>
      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}
