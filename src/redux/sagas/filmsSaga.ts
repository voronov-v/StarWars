import {IActionType} from "@root/redux/interfaces";
import {call, put} from "redux-saga/effects";
import {LOAD_FILMS_FAILED, LOAD_FILMS_SUCCEED} from "@root/redux/reducers/filmsReducer";
import {API} from "@root/api";

export function* fetchFilms(action: IActionType) {
  try {
    console.log('fetchFilms saga');
    console.log(action);
    console.log(action.payload);
    if (action.payload.length > 0) {
      yield put({type: LOAD_FILMS_SUCCEED, payload: action.payload});
    } else {
      const filmsData = yield call(API.getFilms);
      yield put({type: LOAD_FILMS_SUCCEED, payload: filmsData});
    }
  } catch (e) {
    yield put({type: LOAD_FILMS_FAILED, payload: e.message});
  }
}
