import React, { FC, ReactElement } from 'react';
import { chartViewDataType, CustomLineChartProps } from './types';
import moment from 'moment';
import { ActivityIndicator, View } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import { styles } from './styles';

export const CustomLineChart: FC<CustomLineChartProps> = (
  props: CustomLineChartProps,
): ReactElement<CustomLineChartProps> => {
  const { graphData = [], loadingGraph = false } = props;
  // console.log('dataFromProps', chartData);
  const xDataFormatType =
    graphData.length < 10 ? 'ddd, DD' : graphData.length < 100 ? 'DDMMM' : graphData.length < 200 ? 'MMM' : 'MMMYYYY';

  const data: chartViewDataType = graphData.reduce(
    (prev: chartViewDataType, curr) => ({
      yData: [...prev.yData, curr.Cur_OfficialRate],
      xData: [
        ...prev.xData,
        moment(curr.Date)
          .format(xDataFormatType)
          .toString(),
      ],
    }),
    { yData: [], xData: [] },
  );

  return (
    <View style={styles.container}>
      {loadingGraph ? (
        <View style={{ width: '100%', justifyContent: 'center' }}>
          <ActivityIndicator color={'orange'} size={'large'} />
        </View>
      ) : (
        <>
          <YAxis
            data={data.yData}
            contentInset={{ top: 0, bottom: 20 }}
            svg={{ fill: 'black', fontSize: 10 }}
            numberOfTicks={10}
            formatLabel={(value) => `${value}`}
          />
          <View style={{ width: '100%', paddingRight: 40 }}>
            <LineChart
              data={data.yData}
              contentInset={{ top: 0, bottom: 20 }}
              svg={{ stroke: '#000' }}
              style={{ flex: 1, marginHorizontal: 10 }}
            >
              <Grid />
            </LineChart>
            <XAxis
              data={data.yData}
              contentInset={{ left: 20, right: 20 }}
              svg={{ fill: 'black', fontSize: 10 }}
              style={{ marginHorizontal: -10 }}
              numberOfTicks={8}
              formatLabel={(value) => data.xData[value]}
            />
          </View>
        </>
      )}
    </View>
  );
};
