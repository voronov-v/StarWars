import { Text, TouchableOpacity, View } from 'react-native';
import React, { FC, ReactElement } from 'react';
import { chartTimeIntervalType, TimeIntervalBarProps } from './types';
import { styles } from './styles';

export const chartTimeIntervals: chartTimeIntervalType[] = [
  { name: '1 Week', shortName: 'w', shiftType: 'days', shiftAmount: 7 },
  { name: '1 Month', shortName: 'm', shiftType: 'months', shiftAmount: 1 },
  { name: '3 Months', shortName: '3m', shiftType: 'months', shiftAmount: 3 },
  { name: '6 Months', shortName: '6m', shiftType: 'months', shiftAmount: 6 },
  { name: '1 Year', shortName: 'y', shiftType: 'years', shiftAmount: 1 },
];

export const ChartTimeIntervalsBar: FC<TimeIntervalBarProps> = (props: TimeIntervalBarProps): ReactElement => {
  const { reloadGraph, activeChartInterval, activeColor, inactiveColor } = props;

  return (
    <View style={styles.container}>
      {chartTimeIntervals.map((e) => {
        return (
          <TouchableOpacity
            key={e.shortName}
            style={{
              ...styles.btn,
              borderColor: activeColor,
              ...{ borderWidth: activeChartInterval === e.shortName ? 2 : 0 },
            }}
            onPress={() => reloadGraph(e.shortName)}
          >
            <Text style={{ ...styles.btnText, color: inactiveColor }}>{e.shortName} </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
