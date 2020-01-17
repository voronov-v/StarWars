import React, { FC, ReactElement } from "react";
import { chartViewDataType, CustomLineChartProps } from "./types";
import moment from "moment";
import { View } from "react-native";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";
import {styles} from './styles'

export const CustomLineChart: FC<CustomLineChartProps> = (props: CustomLineChartProps): ReactElement<CustomLineChartProps> => {
  const { chartData } = props;
  console.log('dataFromProps', chartData);
  const xDataFormatType =
    chartData.length < 10 ? 'ddd, DD'
      : chartData.length < 100 ? 'DD MMM'
      : chartData.length < 200 ? 'MMM'
        : 'MMMYYYY';

  const data: chartViewDataType = chartData.reduce((prev: chartViewDataType, curr) => ({
      yData: [...prev.yData, curr.Cur_OfficialRate],
      xData: [...prev.xData, moment(curr.Date).format(xDataFormatType).toString()]
    })
    , { yData: [], xData: [] });
  console.log('data', data);

  const contentInset = { top: 10, bottom: 10 };
  // const svgStyle = {};

  return (
    <View style={styles.container}>
      <YAxis
        data={data.yData}
        contentInset={contentInset}
        svg={{ fill: 'black', fontSize: 10 }}
        numberOfTicks={12}
        formatLabel={(value) => `${value}`}
      />
      <View style={{ width: '100%' }}>
        <LineChart
          data={data.yData}
          contentInset={contentInset}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          style={{ flex: 1, marginHorizontal: 10 }}
        >
          <Grid/>
        </LineChart>
        <XAxis
          data={data.xData}
          contentInset={{ left: 25, right: 20 }}
          svg={{ fill: 'black', fontSize: 10 }}
          style={{ marginHorizontal: -10 }}
          numberOfTicks={8}
          formatLabel={(value) => data.xData[value]}
        />
      </View>
    </View>
  );
};
