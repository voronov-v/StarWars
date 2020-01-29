import { IActionType } from '@root/redux/interfaces';
import { currenciesList } from '@root/consts';
import { graphDataType } from '@root/screens/ConverterScreen/types';

export const LOAD_CURRENCY_LIST = 'LOAD_CURRENCY_LIST',
  LOAD_CURRENCY_LIST_SUCCESS = 'LOAD_CURRENCY_LIST_SUCCESS',
  LOAD_CURRENCY_LIST_FAILED = 'LOAD_CURRENCY_LIST_FAILED',
  LOAD_CURRENCY_RATES_ON_DATE = 'LOAD_CURRENCY_RATES_ON_DATE',
  LOAD_CURRENCY_RATES_SUCCESS = 'LOAD_CURRENCY_RATES_SUCCESS',
  LOAD_CURRENCY_RATES_FAILED = 'LOAD_CURRENCY_RATES_FAILED',
  LOAD_CURRENCY_GRAPH_DATA = 'LOAD_CURRENCY_GRAPH_DATA',
  LOAD_CURRENCY_GRAPH_DATA_SUCCESS = 'LOAD_CURRENCY_GRAPH_DATA_SUCCESS',
  LOAD_CURRENCY_GRAPH_DATA_FAILED = 'LOAD_CURRENCY_GRAPH_DATA_FAILED';

export type CurrencyRateType = {
  Cur_ID: number;
  Date: Date;
  Cur_Abbreviation: string;
  Cur_Scale: number;
  Cur_Name: string;
  Cur_OfficialRate: number;
  Cur_Value: string;
};

export type currencyReducerType = {
  currencyRatesDate: string;
  currencyRates: CurrencyRateType[];
  currencyGraphData: graphDataType[];
  graphCurr: string;
  graphInterval: string;
  loading: boolean;
  loadingGraph: boolean;
  errMsg: string;
};

const INITIAL_STATE: currencyReducerType = {
  currencyRatesDate: '',
  currencyRates: [],
  currencyGraphData: [],
  graphCurr: 'USD',
  graphInterval: '',
  loading: false,
  loadingGraph: false,
  errMsg: '',
};

const BYNRatesObj: CurrencyRateType = {
  Cur_ID: -1,
  Date: new Date(),
  Cur_Abbreviation: 'BYN',
  Cur_Scale: 1,
  Cur_Name: 'Белорусский рубль',
  Cur_OfficialRate: 1,
  Cur_Value: '',
};

export const CurrencyReducer = (state = INITIAL_STATE, action: IActionType) => {
  switch (action.type) {
    case LOAD_CURRENCY_LIST:
      return { ...state, loading: true, errMsg: '' };
    case LOAD_CURRENCY_RATES_ON_DATE:
      return { ...state, loading: true, errMsg: '' };
    case LOAD_CURRENCY_RATES_SUCCESS:
      const tmp: CurrencyRateType[] = action.payload.data
        .filter((e: CurrencyRateType) => currenciesList.join(',').indexOf(e.Cur_Abbreviation) !== -1)
        .map((e: CurrencyRateType) => ({ ...e, Cur_Value: '' }));
      tmp.unshift(BYNRatesObj);
      return { ...state, loading: false, currencyRates: tmp, currencyRatesDate: action.payload.date };
    case LOAD_CURRENCY_RATES_FAILED:
      return { ...state, loading: false, errMsg: action.payload };
    case LOAD_CURRENCY_GRAPH_DATA:
      const newGraphCurr = state.currencyRates.find((rate) => rate.Cur_ID === action.payload.currId)!.Cur_Abbreviation;
      return {
        ...state,
        loadingGraph: true,
        errMsg: '',
        graphCurr: newGraphCurr,
        graphInterval: action.payload.graphInterval,
      };
    case LOAD_CURRENCY_GRAPH_DATA_SUCCESS:
      return { ...state, loadingGraph: false, currencyGraphData: action.payload };
    case LOAD_CURRENCY_GRAPH_DATA_FAILED:
      return { ...state, loadingGraph: false, errMsg: action.payload };
    default:
      return state;
  }
};
