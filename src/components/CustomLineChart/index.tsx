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
    graphData.length < 10 ? 'ddd, DD' : graphData.length < 100 ? 'DD MMM' : graphData.length < 200 ? 'MMM' : 'MMMYYYY';

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
  // console.log('data', data);

  const contentInset = { top: 10, bottom: 10 };

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
            contentInset={contentInset}
            svg={{ fill: 'black', fontSize: 10 }}
            numberOfTicks={12}
            formatLabel={(value) => `${value}`}
          />
          <View style={{ width: '100%', paddingRight: 30 }}>
            <LineChart
              data={data.yData}
              contentInset={contentInset}
              svg={{ stroke: '#000' }}
              style={{ flex: 1, marginHorizontal: 10 }}
            >
              <Grid />
            </LineChart>
            <XAxis
              data={data.yData}
              contentInset={{ left: 25, right: 25 }}
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
