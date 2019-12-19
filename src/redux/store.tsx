import AsyncStorage from '@react-native-community/async-storage';
import {applyMiddleware, createStore, Store} from "redux";
import {rootReducer} from './reducers';
import createSagaMiddleware from 'redux-saga';
import {sagas} from './sagas/index';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistConfig, Persistor} from "redux-persist/es/types";

const sagaMiddleware = createSagaMiddleware();

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(sagas);

const persistor: Persistor = persistStore(store);
// persistor.purge();

console.log('initial store', store.getState());

export const storeObject: { persistor: Persistor; store: Store } = {store, persistor};
