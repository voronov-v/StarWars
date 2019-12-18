import {all, call, put, takeEvery} from 'redux-saga/effects'
import {IActionType} from "@root/redux/interfaces";
import {API} from '../../api';

import {
  LOAD_PLANETS,
  LOAD_PLANETS_FAILED,
  LOAD_PLANETS_SUCCEED,
  LOAD_PLANET_INFO,
  LOAD_PLANET_INFO_SUCCEED,
  LOAD_PLANET_INFO_FAILED
} from '../reducers/planetsReducer';
import {LOAD_FILMS, LOAD_FILMS_FAILED, LOAD_FILMS_SUCCEED} from "../reducers/filmsReducer";

function* fetchPlanets(action: IActionType) {
  try {
    console.log('fetchPlanets start ', action);
    const planetData = yield call(API.getPlanets);
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
    console.log('filmsData ', filmsData);
    yield put({type: LOAD_FILMS_SUCCEED, payload: filmsData});
  } catch (e) {
    yield put({type: LOAD_FILMS_FAILED, payload: e.message});
  }
}

function* fetchPlanetInfo(action: IActionType) {
  try {
    console.log('fetchPlanetInfo start', action);
    const {payload: {films, residents, name, planetInfo}} = action;

    if (!planetInfo) {
      let resp, filmsArr = [], residentsArr = [];
//foreach
      for (let i = 0; i < films.length; i++) {
        resp = yield call(API.getPlanetInfo, films[i]);
        filmsArr.push(resp);
      }
      for (let i = 0; i < residents.length; i++) {
        resp = yield call(API.getPlanetInfo, residents[i]);
        residentsArr.push(resp);
      }
      yield put({type: LOAD_PLANET_INFO_SUCCEED, payload: {name: name, films: filmsArr, residents: residentsArr}})
    } else {
      yield put({type: LOAD_PLANET_INFO_SUCCEED, payload: {name: name, ...planetInfo}})
    }
  } catch (e) {
    yield put({type: LOAD_PLANET_INFO_FAILED, payload: e.message});
  }
}

export function* sagas() {
  yield all([
    takeEvery(LOAD_PLANETS, fetchPlanets),
    takeEvery(LOAD_PLANET_INFO, fetchPlanetInfo),
    takeEvery(LOAD_FILMS, fetchFilms)
  ]);
}
