import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;
    // Object.assign = serve pra unir dois objetos;
    const profile = {
      name,
      email,

      ...(rest.oldPassword ? rest : {}),
    };
    // Chamada a api;
    const response = yield call(api.put, 'users', profile);
    // Caso ocorrer tudo bem..
    Alert.alert('Sucesso', 'Pefil atualizado com sucesso!');

    yield put(
      // Reponse.data são os dados do payload que a action vai receber
      updateProfileSuccess(response.data)
    );
  } catch (err) {
    Alert.alert(
      'Falha na atualização',
      'Houve um erro na atualização do perfil,verifique os dados informados'
    );

    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
