import { graphDataType, onChartIntervalChangeType } from '@root/screens/ConverterScreen/types';
import { CurrencyRateType } from '@root/redux/reducers/currencyReducer';
import React, { Dispatch, SetStateAction } from 'react';
import { CustomGraph } from "@root/components/CustomGraph";

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
  reloadGraph: onChartIntervalChangeType;
  bgColor: string;
  textColor: string;
};
