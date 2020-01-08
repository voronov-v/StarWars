import {IActionType} from "@root/redux/interfaces";
import {currenciesList} from "@root/consts";

export const LOAD_CURRENCY_LIST = "LOAD_CURRENCY_LIST",
  LOAD_CURRENCY_LIST_SUCCESS = "LOAD_CURRENCY_LIST_SUCCESS",
  LOAD_CURRENCY_LIST_FAILED = "LOAD_CURRENCY_LIST_FAILED",
  LOAD_CURRENCY_RATES_ON_DATE = "LOAD_CURRENCY_RATES_ON_DATE",
  LOAD_CURRENCY_RATES_SUCCESS = "LOAD_CURRENCY_RATES_SUCCESS",
  LOAD_CURRENCY_RATES_FAILED = "LOAD_CURRENCY_RATES_FAILED"
;

export type CurrencyRateType = {
  Cur_ID: number,
  Date: Date,
  Cur_Abbreviation: string,
  Cur_Scale: number,
  Cur_Name: string
  Cur_OfficialRate: number
}

export type currencyReducerType = {
  currencyRates?: CurrencyRateType
  loading: boolean
  errMsg: string
}

const INITIAL_STATE: currencyReducerType = {
  loading: false,
  errMsg: ""
};

export const CurrencyReducer = (state = INITIAL_STATE, action: IActionType) => {
  switch (action.type) {
    case LOAD_CURRENCY_LIST:
      return {...state, loading: true, errMsg: ""};
    case LOAD_CURRENCY_RATES_ON_DATE:
      return {...state, loading: true, errMsg: ""};
    case LOAD_CURRENCY_RATES_SUCCESS:
      const tmp = action.payload.filter((e:CurrencyRateType) => {
        return currenciesList.join(',').indexOf(e.Cur_Abbreviation) !== -1
      });
      return {...state, loading: false, currencyRates: tmp};
    case LOAD_CURRENCY_RATES_FAILED:
      return {...state, loading: false, errMsg: action.payload};

    default:
      return state;
  }
};
