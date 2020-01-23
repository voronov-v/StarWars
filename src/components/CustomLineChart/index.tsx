import React, { FC, ReactElement } from 'react';
import { chartViewDataType, CustomLineChartProps } from './types';
import moment from 'moment';
import { ActivityIndicator, Modal, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import { styles } from './styles';

export const CustomLineChart: FC<CustomLineChartProps> = (
  props: CustomLineChartProps,
): ReactElement<CustomLineChartProps> => {
  const {
    graphData = [],
    loadingGraph = false,
    ratesToRender = [],
    modalVisible,
    setModalVisible,
    graphCurr,
    reloadGraph,
  } = props;
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

  const closeModal = (currId: number) => {
    console.log('currId', currId);
    setModalVisible(false);
    reloadGraph(undefined, currId);
  };

  return (
    <View style={styles.container}>
      {loadingGraph ? (
        <View style={{ width: '100%', justifyContent: 'center' }}>
          <ActivityIndicator color={'orange'} size={'large'} />
        </View>
      ) : (
        <>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              position: 'absolute',
              zIndex: 1,
              left: 20,
            }}
          >
            <TouchableOpacity
              style={{ paddingHorizontal: 10 }}
              onPress={() => {
                console.log('change graph');
                setModalVisible(true);
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: '600' }}>BYN / {graphCurr} </Text>
            </TouchableOpacity>
          </View>
          <YAxis
            yAccessor={({ item }) => item}
            data={data.yData}
            contentInset={{ top: 20, bottom: 20 }}
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

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType={'fade'}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableHighlight style={styles.modalBackground} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            {ratesToRender.map((rate) => {
              if (rate.Cur_Abbreviation === 'BYN') return null;
              return (
                <TouchableOpacity key={rate.Cur_ID} onPress={() => closeModal(rate.Cur_ID)} style={styles.modalBtn}>
                  <Text style={styles.modalBtnText}>{rate.Cur_Name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </TouchableHighlight>
      </Modal>
    </View>
  );
};
