import React, { FC, ReactElement, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Modal,
  TouchableHighlight,
} from 'react-native';
import * as path from 'svg-path-properties';
import * as shape from 'd3-shape';
import { scaleTime, scaleLinear, scaleQuantile } from 'd3-scale';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import moment from 'moment';
import { graphDataType } from '@root/screens/ConverterScreen/types';
import { CustomLineChartProps } from '@root/components/CustomLineChart/types';
import { cursorRadius, height, width, styles } from '@root/components/CustomGraph/styles';

export const CustomGraph: FC<CustomLineChartProps> = (
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
    bgColor,
    textColor
  } = props;

  const cursor = useRef<any>(null);
  const label = useRef<any>(null);

  const [x] = useState(new Animated.Value(0));

  const { data, dataY, dataX, maxY, minY } = graphData.reduce(
    (prev: any, curr: graphDataType) => {
      return {
        data: [...prev.data, { x: new Date(curr.Date), y: curr.Cur_OfficialRate }],
        dataY: [...prev.dataY, curr.Cur_OfficialRate],
        dataX: [...prev.dataX, new Date(curr.Date).getTime()],
        maxY: prev.maxY > curr.Cur_OfficialRate ? prev.maxY : curr.Cur_OfficialRate,
        minY: prev.minY < curr.Cur_OfficialRate ? prev.minY : curr.Cur_OfficialRate,
      };
    },
    { data: [], dataY: [], dataX: [], maxY: -999, minY: 999 },
  );
  dataY.sort();

  useEffect(() => {
    x.removeAllListeners();
    x.addListener(({ value }) => moveCursor(value));
    moveCursor(0);
  }, [graphData]);

  const scaleX = scaleTime().domain([data[0].x, data[data.length - 1].x]).range([0, width]);
  const scaleY = scaleLinear().domain([minY, maxY]).range([height, 0]);
  const scaleLabelY = scaleQuantile().domain([minY, maxY]).range(dataY);
  const scaleLabelX = scaleQuantile().domain([dataX[0], dataX[dataX.length - 1]]).range(dataX);

  const d3 = { shape };
  const line =
    d3.shape
      .line()
      .x((d: any) => scaleX(d.x))
      .y((d: any) => scaleY(d.y))
      .curve(d3.shape.curveBasis)(data) || '';
  const properties = path.svgPathProperties(line);
  const lineLength = properties.getTotalLength();

  const moveCursor = (value: number) => {
    const { x, y } = properties.getPointAtLength(lineLength - value);
    // console.log(`x:${x} y:${y}`);
    cursor && cursor.current.setNativeProps({ top: y + cursorRadius, left: x - cursorRadius });
    const labelY = scaleLabelY(scaleY.invert(y));
    const labelX = scaleLabelX(scaleX.invert(x));
    label && label.current.setNativeProps({ text: `${moment(labelX).format('DD.MM.YYYY')}: ${labelY}` });
  };

  const closeModal = (currId: number) => {
    console.log('currId', currId);
    setModalVisible(false);
    reloadGraph(undefined, currId);
  };

  return (
    <View style={styles.container}>
      {loadingGraph && <ActivityIndicator color={'orange'} size={'large'} style={styles.activity}/>}
      <View style={styles.graphHead}>
        <TouchableOpacity style={{ ...styles.graphBtn, backgroundColor: bgColor }}
                          onPress={() => setModalVisible(true)}>
          <Text style={{ ...styles.graphBtnText, color: textColor }}>BYN / {graphCurr} </Text>
        </TouchableOpacity>
        <Animated.View style={styles.graphLabel}>
          <TextInput style={styles.graphLabelText} ref={label} editable={false}/>
        </Animated.View>
      </View>

      <View style={styles.graphContainer}>
        <Svg {...{ width, height }}>
          <Defs>
            <LinearGradient x1={'50%'} y1={'0%'} x2={'50%'} y2={'100%'} id={'gradient'}>
              <Stop stopColor={'#CDE3F8'} offset={'0%'}/>
              <Stop stopColor={'#eef6fd'} offset={'80%'}/>
              <Stop stopColor={'#FEFFFF'} offset={'100%'}/>
            </LinearGradient>
          </Defs>
          <Path d={line} fill={'transparent'} stroke={'#367be2'} strokeWidth={7}/>
          <Path d={`${line} L ${width} ${height} L 0 ${height}`} fill={'url(#gradient)'}/>
        </Svg>
        <View style={styles.graphCursor} ref={cursor}/>
        <Animated.ScrollView
          style={StyleSheet.absoluteFill}
          contentContainerStyle={{ width: lineLength * 2 }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x } } }], { useNativeDriver: true })}
          horizontal
        />
      </View>

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
