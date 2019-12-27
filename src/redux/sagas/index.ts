import {all, takeEvery, takeLatest} from 'redux-saga/effects'

import {LOAD_PLANETS, LOAD_PLANET_INFO,} from '../reducers/planetsReducer';
import {LOAD_FILMS} from "../reducers/filmsReducer";
import {CHANGE_LANGUAGE, INIT, TOGGLE_THEME} from "@root/redux/reducers/settingsReducer";
import {fetchPlanetInfo, fetchPlanets} from "@root/redux/sagas/planetsSaga";
import {fetchFilms} from "@root/redux/sagas/filmsSaga";

export function* sagas() {
  yield all([
    takeEvery(LOAD_PLANETS, fetchPlanets),
    takeEvery(LOAD_PLANET_INFO, fetchPlanetInfo),
    takeEvery(LOAD_FILMS, fetchFilms),
    takeEvery(CHANGE_LANGUAGE, () => {
    }),
    takeLatest(TOGGLE_THEME, () => {
    }),
    takeLatest(INIT, ()=>{}),
  ]);
}
