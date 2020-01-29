import AsyncStorage from '@react-native-community/async-storage';
import { applyMiddleware, createStore, Store } from 'redux';
import { rootReducer } from './reducers';
import createSagaMiddleware from 'redux-saga';
import { sagas } from './sagas/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import { Persistor } from 'redux-persist/es/types';
import i18n from '@root/i18n';

const persistConfig = { key: 'root', storage: AsyncStorage };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store: Store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(sagas);

const persistorCallBack = async (lang: string) => await i18n.changeLanguage(lang);

const persistor: Persistor = persistStore(store, null, () => persistorCallBack(store.getState().settings.language));
// persistor.purge();
console.log('store', store.getState());
console.log('persistor', persistor.getState());

export const storeObject: { persistor: Persistor; store: Store } = { store, persistor };
