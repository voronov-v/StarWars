import { DurationInputArg1, DurationInputArg2 } from 'moment';

export type chartTimeIntervalType = {
  name: string;
  shortName: string;
  shiftType: DurationInputArg2;
  shiftAmount: number;
};

export type TimeIntervalBarProps = {
  onChartIntervalChange: (shortName: string, shiftType: DurationInputArg2, shiftAmount: DurationInputArg1) => void;
  activeChartInterval: string;
  activeColor: string;
  inactiveColor: string;
  btnBgColor: string
};
