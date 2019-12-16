import { Action } from 'redux';

const SET_AUTH_USER = "SET_AUTH_USER";

const initialState = {
  isAuth: false
};

export const myReducer = (state= initialState, action:Action<any>) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        isAuth: true
      };

    default:
      return state;
  }
};
