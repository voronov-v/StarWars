import { DurationInputArg2 } from "moment";

export type chartTimeIntervalType = {
  name: string,
  shortName: string
  shiftType: DurationInputArg2,
  shiftAmount: number
};

export type chartDataType = {
  Cur_ID: number
  Cur_OfficialRate: number
  Date: Date
};

export type chartViewDataType = {
  yData: number[],
  xData: string[]
};

export type CustomLineChartProps = {
  chartData: chartDataType[]
};

