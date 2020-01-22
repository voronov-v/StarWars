import { DurationInputArg2 } from 'moment';
import { onChartIntervalChangeType } from '@root/screens/ConverterScreen/types';

export type chartTimeIntervalType = {
  name: string;
  shortName: string;
  shiftType: DurationInputArg2;
  shiftAmount: number;
};

export type TimeIntervalBarProps = {
  onChartIntervalChange: onChartIntervalChangeType;
  activeChartInterval: string;
  activeColor: string;
  inactiveColor: string;
  btnBgColor: string;
};
