import { IActionType } from '@root/redux/interfaces';
import { call, put } from 'redux-saga/effects';
import { API } from '@root/api';
import {
  LOAD_PLANET_INFO_FAILED,
  LOAD_PLANET_INFO_SUCCEED,
  LOAD_PLANETS_FAILED,
  LOAD_PLANETS_SUCCEED,
} from '@root/redux/reducers/planetsReducer';

export function* fetchPlanets(action: IActionType) {
  try {
    console.log('action:', action);
    const planetData = yield call(API.getPlanets, action.payload.nextUrl);
    console.log('planetData ', planetData);
    yield put({ type: LOAD_PLANETS_SUCCEED, payload: planetData });
  } catch (e) {
    yield put({ type: LOAD_PLANETS_FAILED, payload: e.message });
  }
}

export function* fetchPlanetInfo(action: IActionType) {
  try {
    console.log('fetchPlanetInfo start', action);
    const {
      payload: { films, residents, name, planetInfo },
    } = action;

    if (!planetInfo) {
      let resp,
        filmsArr = [],
        residentsArr = [];

      for (let i = 0; i < films.length; i++) {
        resp = yield call(API.getPlanetInfo, films[i]);
        filmsArr.push(resp);
      }
      for (let i = 0; i < residents.length; i++) {
        resp = yield call(API.getPlanetInfo, residents[i]);
        residentsArr.push(resp);
      }
      yield put({
        type: LOAD_PLANET_INFO_SUCCEED,
        payload: { name: name, films: filmsArr, residents: residentsArr },
      });
    } else {
      yield put({ type: LOAD_PLANET_INFO_SUCCEED, payload: { name: name, ...planetInfo } });
    }
  } catch (e) {
    yield put({ type: LOAD_PLANET_INFO_FAILED, payload: e.message });
  }
}
