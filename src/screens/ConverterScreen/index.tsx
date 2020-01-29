import React, { FC, MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getIsDarkMode, getCurrency } from '@root/selectors';
import { themeType } from '@root/redux/reducers/settingsReducer';
import { DARK_THEME, PRIMARY_THEME } from '@root/consts/themes';
import { styles } from './styles';
import { onChartIntervalChangeType } from './types';
import moment from 'moment';
import 'moment/locale/ru';
import { LOAD_CURRENCY_GRAPH_DATA, LOAD_CURRENCY_RATES_ON_DATE } from '@root/redux/reducers/currencyReducer';
import { Spinner } from '@root/components/Spinner/Spinner';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/AntDesign';
import { CurrencyRatesTable } from '@root/components/CurrencyRatesTable';
import DateTimePicker from '@react-native-community/datetimepicker';
import { chartTimeIntervals, ChartTimeIntervalsBar } from '@root/components/ChartTimeIntervalsBar';
import { DrawerActions } from 'react-navigation-drawer';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { CustomGraph } from '@root/components/CustomGraph';

export const ConverterScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const { currencyRates, loading, currencyGraphData, loadingGraph, graphCurr, graphInterval } = useSelector(
    getCurrency,
  );
  const isDarkMode = useSelector(getIsDarkMode);

  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary, errColor, primaryVarBg, primaryLight] = [
    theme.ON_BACKGROUND,
    theme.BACKGROUND,
    theme.PRIMARY,
    theme.ERROR,
    theme.PRIMARY_VAR_BG,
    theme.PRIMARY_LIGHT,
  ];
  const _panel: MutableRefObject<null> = useRef(null);

  const [err, setErr] = useState({ isError: false, errMsg: '' });
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [ratesToRender, setRatesToRender] = useState(currencyRates);
  const [isGraphFaded, setIsGraphFaded] = useState(1);
  const [converterFade, setConverterFade] = useState(new Animated.Value(isGraphFaded));
  const [graphFade, setGraphFade] = useState(new Animated.Value(+!isGraphFaded));
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const date = moment(datePickerValue).format('YYYY-MM-DD');
    dispatch({ type: LOAD_CURRENCY_RATES_ON_DATE, payload: date });
    graphInterval !== '' && reloadGraph();
  }, [datePickerValue]);

  useEffect(() => {
    setRatesToRender(currencyRates);
  }, [currencyRates]);

  const onChangeFieldText = (code: string, value: string) => {
    setErr({ isError: true, errMsg: '' });
    if (!/^\d*\.?\d*$/.test(value)) {
      setErr({
        isError: false,
        errMsg: `Invalid input on ${code} currency field`,
      });
      return;
    }

    const field = ratesToRender.find((e) => e.Cur_Abbreviation === code)!;
    const bynVal = value !== '' ? (Number.parseFloat(value) * field.Cur_OfficialRate) / field.Cur_Scale : 0;
    console.log(`code: ${code}: ${value} BYN: ${bynVal}`);

    const tmp = [...ratesToRender].map((e) => {
      if (bynVal === 0) {
        e.Cur_Value = '';
      } else if (e.Cur_Abbreviation === code) {
        e.Cur_Value = value;
      } else {
        e.Cur_Value = (Math.round((bynVal / e.Cur_OfficialRate) * e.Cur_Scale * 100) / 100).toString();
      }
      return e;
    });
    console.log('tmp', tmp);
    setRatesToRender(tmp);
  };

  const reloadGraph: onChartIntervalChangeType = async (
    shortName = graphInterval || 'w',
    currId = ratesToRender.find((rate) => rate.Cur_Abbreviation === graphCurr)!.Cur_ID,
  ) => {
    if (graphInterval !== shortName || currencyGraphData.length === 0 || currId !== undefined) {
      const intervalObj = chartTimeIntervals.find((interval) => interval.shortName === shortName)!;
      const dateFrom = moment(datePickerValue)
        .add(-intervalObj.shiftAmount, intervalObj.shiftType)
        .format('YYYY.MM.DD');
      const dateTo = moment(datePickerValue).format('YYYY.MM.DD');

      dispatch({
        type: LOAD_CURRENCY_GRAPH_DATA,
        payload: { dateFrom: dateFrom.toString(), dateTo: dateTo.toString(), currId, graphInterval: shortName },
      });
    }
  };

  const setDate = (event: any, date?: Date | undefined) => {
    console.log('event', event);
    if (event.type === 'set' || event.type === 'dismissed') {
      setIsDatePickerVisible(false);
    }
    setDatePickerValue(date || datePickerValue);
  };

  const toggleGraph = () => {
    if (isGraphFaded === 0) {
      Animated.timing(converterFade, { toValue: 1, duration: 2000 }).start();
      setGraphFade(new Animated.Value(0));
    } else {
      Animated.timing(graphFade, { toValue: 1, duration: 2000 }).start();
      setConverterFade(new Animated.Value(0));
    }
    setIsGraphFaded(+!isGraphFaded);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={{ ...styles.container, backgroundColor: bgColor, ...{ opacity: modalVisible ? 0.3 : 1 } }}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{ position: 'absolute', left: 10, top: 10 }}
      >
        <Icon name={'menu-fold'} size={30} color={primary} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.changeDateContainer}
        onPress={() => {
          setIsDatePickerVisible(!isDatePickerVisible);
          //@ts-ignore
          Platform.OS === 'ios' && _panel.current.show();
        }}
      >
        <Text style={{ ...styles.title, color: primary }}>{moment(datePickerValue).format('ddd DD.MM.Y')}</Text>
        <Icon name={'calendar'} size={30} color={primary} />
      </TouchableOpacity>

      <CurrencyRatesTable ratesToRender={ratesToRender} textColor={textColor} />

      <TouchableOpacity
        style={{ ...styles.toggleGraphBtn, backgroundColor: primaryLight }}
        onPress={() => toggleGraph()}
      >
        <Icon name={isGraphFaded ? 'linechart' : 'bank'} size={25} color={bgColor} style={{ alignSelf: 'center' }}>
          {isGraphFaded === 1 ? ' График' : ' Конвертер'}
        </Icon>
      </TouchableOpacity>

      {isGraphFaded === 1 ? (
        <Animated.View style={{ opacity: converterFade }}>
          {ratesToRender.map((e) => {
            return (
              <View key={e.Cur_ID} style={styles.currencyFieldContainer}>
                <TextInput
                  style={{
                    ...styles.converterInput,
                    borderBottomColor: textColor,
                    color: textColor,
                  }}
                  placeholder={'0'}
                  placeholderTextColor={textColor}
                  keyboardType={'decimal-pad'}
                  value={e.Cur_Value}
                  onChangeText={(text) => onChangeFieldText(e.Cur_Abbreviation, text)}
                />
                <Text style={{ ...styles.currencyText, color: textColor }}>{e.Cur_Abbreviation}</Text>
              </View>
            );
          })}
        </Animated.View>
      ) : (
        <Animated.View style={{ opacity: graphFade }}>
          <ChartTimeIntervalsBar
            reloadGraph={reloadGraph}
            activeChartInterval={graphInterval}
            activeColor={primary}
            btnBgColor={primaryVarBg}
            inactiveColor={textColor}
          />
          {currencyGraphData.length > 0 && (
            <CustomGraph
              graphData={currencyGraphData}
              loadingGraph={loadingGraph}
              ratesToRender={ratesToRender}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              graphCurr={graphCurr}
              reloadGraph={reloadGraph}
              bgColor={primaryLight}
              textColor={bgColor}
            />
          )}
        </Animated.View>
      )}

      <Collapsible collapsed={err.isError}>
        <Text style={{ color: errColor, fontSize: 22 }}>{err.errMsg}</Text>
      </Collapsible>

      <SlidingUpPanel
        ref={_panel}
        draggableRange={{ top: Dimensions.get('screen').height / 3.3, bottom: 0 }}
        onBottomReached={() => setIsDatePickerVisible(false)}
      >
        {(dragHandler: any) => (
          <>
            {isDatePickerVisible && (
              <View style={styles.sliderWrapper}>
                <View style={styles.sliderHeader} {...dragHandler}>
                  <View style={{ ...styles.sliderHeaderItem, backgroundColor: textColor }} />
                </View>
                <View style={{ backgroundColor: 'white' }}>
                  <DateTimePicker
                    value={datePickerValue}
                    mode={'date'}
                    is24Hour={true}
                    display='default'
                    onChange={setDate}
                    maximumDate={new Date()}
                  />
                </View>
              </View>
            )}
          </>
        )}
      </SlidingUpPanel>
    </View>
  );
};
