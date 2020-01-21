import { all, takeEvery, takeLatest } from 'redux-saga/effects';

import { LOAD_PLANETS, LOAD_PLANET_INFO } from '../reducers/planetsReducer';
import { LOAD_FILMS } from '../reducers/filmsReducer';
import { CHANGE_LANGUAGE, INIT, TOGGLE_THEME } from '@root/redux/reducers/settingsReducer';
import {
  CHANGE_CURRENCY_VALUE,
  LOAD_CURRENCY_GRAPH_DATA,
  LOAD_CURRENCY_RATES_ON_DATE,
} from '@root/redux/reducers/currencyReducer';
import { fetchPlanetInfo, fetchPlanets } from '@root/redux/sagas/planetsSaga';
import { fetchFilms } from '@root/redux/sagas/filmsSaga';
import { fetchCurrencyGraphData, fetchCurrencyRatesOnDate } from '@root/redux/sagas/converterSaga';

const fn = () => {};

export function* sagas() {
  yield all([
    takeEvery(LOAD_PLANETS, fetchPlanets),
    takeEvery(LOAD_PLANET_INFO, fetchPlanetInfo),
    takeEvery(LOAD_FILMS, fetchFilms),
    takeEvery(CHANGE_LANGUAGE, fn),
    takeLatest(TOGGLE_THEME, fn),
    takeLatest(INIT, fn),
    takeLatest(LOAD_CURRENCY_RATES_ON_DATE, fetchCurrencyRatesOnDate),
    takeLatest(CHANGE_CURRENCY_VALUE, fn),
    takeLatest(LOAD_CURRENCY_GRAPH_DATA, fetchCurrencyGraphData),
  ]);
}
