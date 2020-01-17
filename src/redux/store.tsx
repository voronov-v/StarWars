import { applyMiddleware, createStore, Store } from 'redux';
import { rootReducer } from '@root/redux/reducers';
import { loadState, saveState } from '@root/redux/customPersistor';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { sagas } from '@root/redux/sagas';
import i18n from '@root/i18n';

export const store = createStore(rootReducer);

export const initStore = async () => {
  const customStore = await loadState();
  console.log('App customStore', customStore);
  const sagaMiddleware = createSagaMiddleware();
  const store: Store = createStore(rootReducer, customStore, composeWithDevTools(applyMiddleware(sagaMiddleware)));

  store.subscribe(() => {
    saveState(store.getState());
  });

  sagaMiddleware.run(sagas);

  console.log('new store', store.getState());
  await i18n.changeLanguage(store.getState().settings.language);
  return store;
};
