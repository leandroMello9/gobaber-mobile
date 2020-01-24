import styled from 'styled-components/native';
import { BaseButton } from 'react-native-gesture-handler';

export const Container = styled(BaseButton)`
  width: 200px;
  height: 46px;
  background: ${props => (props.exit ? 'red' : '#3b9eff')};
  margin-top: 5%;
  border-radius: 4px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;
