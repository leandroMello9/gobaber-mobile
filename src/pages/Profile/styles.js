import styled from 'styled-components/native';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;
export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;
export const Form = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 30 },
  showsVerticalScrollIndicator: false,
})`
  align-self: stretch;
`;
export const LogoutButton = styled.TouchableOpacity`
  background: ${props => (props.exit ? '#f64c75' : 'blue')};
  height: 42px;
  margin-top: 15px;
  width: 67%;
  border-radius: 4px;
  align-self: center;
  align-items: center;
  justify-content: center;
`;
export const LogoutTitle = styled.Text`
  align-self: center;
  font-size: 14px;
  color: #fff;
`;
export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;
