import { chartDataType } from '@root/screens/ConverterScreen/types';

export type chartViewDataType = {
  yData: number[];
  xData: string[];
};

export type CustomLineChartProps = {
  chartData: chartDataType[];
};
