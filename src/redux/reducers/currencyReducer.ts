import { IActionType } from '@root/redux/interfaces';
import { currenciesList } from '@root/consts';

export const LOAD_CURRENCY_LIST = 'LOAD_CURRENCY_LIST',
  LOAD_CURRENCY_LIST_SUCCESS = 'LOAD_CURRENCY_LIST_SUCCESS',
  LOAD_CURRENCY_LIST_FAILED = 'LOAD_CURRENCY_LIST_FAILED',
  LOAD_CURRENCY_RATES_ON_DATE = 'LOAD_CURRENCY_RATES_ON_DATE',
  LOAD_CURRENCY_RATES_SUCCESS = 'LOAD_CURRENCY_RATES_SUCCESS',
  LOAD_CURRENCY_RATES_FAILED = 'LOAD_CURRENCY_RATES_FAILED',
  CHANGE_CURRENCY_VALUE = 'CHANGE_CURRENCY_VALUE'
;

export type CurrencyRateType = {
  Cur_ID: number,
  Date: Date,
  Cur_Abbreviation: string,
  Cur_Scale: number,
  Cur_Name: string,
  Cur_OfficialRate: number,
  Cur_Value: string
}

export type currencyReducerType = {
  currencyRates?: CurrencyRateType[]
  loading: boolean
  errMsg: string
}

const INITIAL_STATE: currencyReducerType = {
  loading: false,
  errMsg: '',
};

export const CurrencyReducer = (state = INITIAL_STATE, action: IActionType) => {
  switch (action.type) {
    case LOAD_CURRENCY_LIST:
      return { ...state, loading: true, errMsg: '' };
    case LOAD_CURRENCY_RATES_ON_DATE:
      return { ...state, loading: true, errMsg: '' };
    case LOAD_CURRENCY_RATES_SUCCESS:
      const tmp: CurrencyRateType = action.payload
        .filter((e: CurrencyRateType) => currenciesList.join(',').indexOf(e.Cur_Abbreviation) !== -1)
        .map((e: CurrencyRateType) => ({ ...e, Cur_Value: '' }));
      return { ...state, loading: false, currencyRates: tmp };
    case LOAD_CURRENCY_RATES_FAILED:
      return { ...state, loading: false, errMsg: action.payload };
    case CHANGE_CURRENCY_VALUE:
      console.log('CHANGE_CURRENCY_VALUE', action);
      return { ...state };
    default:
      return state;
  }
};
