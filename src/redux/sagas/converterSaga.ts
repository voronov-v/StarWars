import { IActionType } from '@root/redux/interfaces';
import { call, put, select } from 'redux-saga/effects';
import { API } from '@root/api';
import {
  LOAD_CURRENCY_GRAPH_DATA_FAILED,
  LOAD_CURRENCY_GRAPH_DATA_SUCCESS,
  LOAD_CURRENCY_LIST_FAILED,
  LOAD_CURRENCY_LIST_SUCCESS,
  LOAD_CURRENCY_RATES_FAILED,
  LOAD_CURRENCY_RATES_SUCCESS,
} from '@root/redux/reducers/currencyReducer';

export function* fetchCurrencyList(action: IActionType) {
  try {
    console.log('action:', action);
    const data = yield call(API.getCurrencyList, 'http://www.nbrb.by/API/ExRates/Currencies');
    yield put({ type: LOAD_CURRENCY_LIST_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: LOAD_CURRENCY_LIST_FAILED, payload: e.message });
  }
}

export function* fetchCurrencyRatesOnDate(action: IActionType) {
  try {
    console.log('action:', action);
    const { currencyRatesDate, currencyRates } = yield select((state) => state.currency);
    if (currencyRatesDate !== action.payload || currencyRates.length === 0) {
      const data = yield call(
        API.getCurrency,
        `http://www.nbrb.by/api/exrates/rates?ondate=${action.payload}&periodicity=0`,
      );
      yield put({ type: LOAD_CURRENCY_RATES_SUCCESS, payload: { data, date: action.payload } });
    } else {
      yield put({ type: LOAD_CURRENCY_RATES_SUCCESS, payload: { data: currencyRates, date: action.payload } });
    }
  } catch (e) {
    yield put({ type: LOAD_CURRENCY_RATES_FAILED, payload: e.message });
  }
}

export function* fetchCurrencyGraphData(action: IActionType) {
  try {
    console.log('action:', action.payload);
    const data = yield call(
      API.getCurrencyRatesOnPeriod,
      `http://www.nbrb.by/API/ExRates/Rates/Dynamics/${action.payload.currId}`,
      action.payload,
    );
    yield put({ type: LOAD_CURRENCY_GRAPH_DATA_SUCCESS, payload: data });
  } catch (e) {
    yield put({ type: LOAD_CURRENCY_GRAPH_DATA_FAILED, payload: e.message });
  }
}
