import { graphDataType, onChartIntervalChangeType } from '@root/screens/ConverterScreen/types';
import { CurrencyRateType } from '@root/redux/reducers/currencyReducer';
import { Dispatch, SetStateAction } from 'react';

export type chartViewDataType = {
  yData: number[];
  xData: string[];
};

export type CustomLineChartProps = {
  graphData: graphDataType[];
  loadingGraph: boolean;
  ratesToRender: CurrencyRateType[];
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  graphCurr: string;
  onChartIntervalChange: onChartIntervalChangeType;
};
