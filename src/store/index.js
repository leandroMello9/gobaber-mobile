import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import Reactotron from '../config/ReactotronConfig';
import persistReducers from './persistReducer';
import createStore from './createStore';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  __DEV__ === 'development' ? Reactotron.createSagaMonitor() : null;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);
export { persistor, store };
