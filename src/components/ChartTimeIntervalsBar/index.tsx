import { View, Text, TouchableOpacity } from 'react-native';
import React, { FC, ReactElement } from 'react';
import { TimeIntervalBarProps } from './types';
import { chartTimeIntervalType } from './types';

export const ChartTimeIntervalsBar: FC<TimeIntervalBarProps> = (props: TimeIntervalBarProps): ReactElement => {
  const { onChartIntervalChange, activeChartInterval, activeColor, inactiveColor } = props;

  const chartTimeIntervals: chartTimeIntervalType[] = [
    { name: '1 Week', shortName: 'w', shiftType: 'days', shiftAmount: 7 },
    { name: '1 Month', shortName: 'm', shiftType: 'months', shiftAmount: 1 },
    { name: '3 Months', shortName: '3m', shiftType: 'months', shiftAmount: 3 },
    { name: '6 Months', shortName: '6m', shiftType: 'months', shiftAmount: 6 },
    { name: '1 Year', shortName: 'y', shiftType: 'years', shiftAmount: 1 },
  ];

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
      {chartTimeIntervals.map((e) => {
        return (
          <TouchableOpacity
            key={e.shortName}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 50,
              // backgroundColor: btnBgColor,
              marginHorizontal: 5,
              marginTop: 5,
            }}
            onPress={() => onChartIntervalChange(e.shortName, e.shiftType, e.shiftAmount)}
          >
            <Text
              style={[
                { fontSize: 18, fontWeight: '500' },
                activeChartInterval === e.shortName ? { color: activeColor } : { color: inactiveColor },
              ]}
            >
              {e.shortName}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
