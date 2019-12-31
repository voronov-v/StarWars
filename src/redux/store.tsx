import AsyncStorage from '@react-native-community/async-storage';
import {applyMiddleware, createStore, Store} from "redux";
import {rootReducer} from './reducers';
import createSagaMiddleware from 'redux-saga';
import {sagas} from './sagas/index';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import {Persistor} from "redux-persist/es/types";
//@ts-ignore
import I18N from '@root/i18n';
import {i18n} from "i18next";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(sagas);

const persistorCallBack = async (i18n: i18n, lang: string) => {
  console.log('persistorCallBack', lang);
  await i18n.changeLanguage(lang);
  console.log('after changeing language');
};

const persistor: Persistor = persistStore(store, null, () => persistorCallBack(I18N, store.getState().settings.language));
persistor.purge();

console.log('store', store.getState());
console.log('persistor', persistor.getState());

export const storeObject: { persistor: Persistor; store: Store } = {store, persistor};
