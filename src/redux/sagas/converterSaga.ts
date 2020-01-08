import {IActionType} from "@root/redux/interfaces";
import {call, put} from "redux-saga/effects";
import {API} from "@root/api";
import {
  LOAD_CURRENCY_LIST_FAILED,
  LOAD_CURRENCY_LIST_SUCCESS,
  LOAD_CURRENCY_RATES_FAILED,
  LOAD_CURRENCY_RATES_SUCCESS
} from "@root/redux/reducers/currencyReducer";

export function* fetchCurrencyList(action: IActionType) {
  try {
    console.log('action:', action);
    const data = yield call(API.getCurrencyList, 'http://www.nbrb.by/API/ExRates/Currencies');
    yield put({type: LOAD_CURRENCY_LIST_SUCCESS, payload: data});
  } catch (e) {
    yield put({type: LOAD_CURRENCY_LIST_FAILED, payload: e.message});
  }
}

export function* fetchCurrencyRatesOnDate(action: IActionType) {
  try {
    console.log('action:', action);
    const data = yield call(API.getCurrency, `http://www.nbrb.by/api/exrates/rates?ondate=${action.payload.date}&periodicity=0`);
    yield put({type: LOAD_CURRENCY_RATES_SUCCESS, payload: data});
  } catch (e) {
    yield put({type: LOAD_CURRENCY_RATES_FAILED, payload: e.message});
  }
}
