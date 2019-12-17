import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects'
import {IActionType} from "@root/redux/interfaces";
import {API} from '../../api';

import {LOAD_PLANETS, LOAD_PLANETS_FAILED, LOAD_PLANETS_SUCCEED} from '../reducers/planetsReducer';
import {LOAD_FILMS, LOAD_FILMS_FAILED, LOAD_FILMS_SUCCEED} from "../reducers/filmsReducer";

function* fetchPlanets(action: IActionType) {
  try {
    console.log('fetchPlanets start ', action);
    const planetData = yield call(API.getPlanets);
    console.log('fetchPlanets success ', action);
    console.log('planetData ', planetData);
    yield put({type: LOAD_PLANETS_SUCCEED, payload: planetData});
  } catch (e) {
    yield put({type: LOAD_PLANETS_FAILED, payload: e.message});
  }
}

function* fetchFilms(action: IActionType) {
  try {
    console.log('fetchFilms start ', action);
    const filmsData = yield call(API.getFilms);
    console.log('fetchFilms success ', action);
    console.log('filmsData ', filmsData);
    yield put({type: LOAD_FILMS_SUCCEED, payload: filmsData});
  } catch (e) {
    yield put({type: LOAD_FILMS_FAILED, payload: e.message});
  }
}

export function* sagas() {
  yield all([
    takeEvery(LOAD_PLANETS, fetchPlanets),
    takeLatest(LOAD_FILMS, fetchFilms)
  ]);
}
