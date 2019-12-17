import {applyMiddleware, createStore, Store} from "redux";
import {rootReducer} from './reducers';
import createSagaMiddleware from 'redux-saga';
import {sagas} from './sagas/index';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();

export const store: Store = createStore(rootReducer, composeWithDevTools(applyMiddleware( sagaMiddleware)));
console.log('store');
console.log(store.getState());
sagaMiddleware.run(sagas);
