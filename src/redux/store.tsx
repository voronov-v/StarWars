import {createStore, Store} from "redux";
import {rootReducer} from './reducers';

export const store: Store = createStore(rootReducer);

