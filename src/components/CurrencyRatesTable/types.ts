import { TextStyle } from 'react-native';
import { CurrencyRateType } from '@root/redux/reducers/currencyReducer';

export type CurrencyRatesTableProps = {
  ratesToRender: CurrencyRateType[];
  textColor: TextStyle['color'];
};
