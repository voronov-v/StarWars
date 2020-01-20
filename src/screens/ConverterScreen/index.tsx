import React, { FC, MutableRefObject, ReactElement, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Picker, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getIsDarkMode, getRates } from '@root/selectors';
import { themeType } from '@root/redux/reducers/settingsReducer';
import { DARK_THEME, PRIMARY_THEME } from '@root/consts/themes';
import { styles } from './styles';
import moment, { DurationInputArg1, DurationInputArg2 } from 'moment';
import { LOAD_CURRENCY_RATES_ON_DATE } from '@root/redux/reducers/currencyReducer';
import { Spinner } from '@root/components/Spinner/Spinner';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { CurrencyRatesTable } from '@root/components/CurrencyRatesTable';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ChartTimeIntervalsBar } from '@root/components/ChartTimeIntervalsBar';
import { CustomLineChart } from '@root/components/CustomLineChart';
import { DrawerActions } from 'react-navigation-drawer';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import SlidingUpPanel from 'rn-sliding-up-panel';

export const ConverterScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement => {
  const { navigation } = props;
  const dispatch = useDispatch();

  const { currencyRates, loading } = useSelector(getRates);
  const isDarkMode = useSelector(getIsDarkMode);

  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary, errColor, primaryVarBg] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY, theme.ERROR, theme.PRIMARY_VAR_BG];

  const _panel: MutableRefObject<null> = useRef(null);

  const [err, setErr] = useState({ isError: false, errMsg: '' });
  const [datePickerValue, setDatePickerValue] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [chartInterval, setChartInterval] = useState('w');
  const [chartData, setChartData] = useState([]);
  const [ratesToRender, setRatesToRender] = useState(currencyRates);
  const [isGraphFaded, setIsGraphFaded] = useState(1);
  const [converterFade, setConverterFade] = useState(new Animated.Value(isGraphFaded));
  const [graphFade, setGraphFade] = useState(new Animated.Value(+!isGraphFaded));

  useEffect(() => {
    const date = moment(datePickerValue).format('YYYY-MM-DD');
    dispatch({ type: LOAD_CURRENCY_RATES_ON_DATE, payload: { date } });
  }, [datePickerValue]);

  useEffect(() => {
    setRatesToRender(currencyRates);
  }, [currencyRates]);

  useEffect(() => {
  }, [chartInterval]);

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

  const onChangeFieldCurrency = (nextVal: string, prevVal: string) => {
    console.log(`nextVal: ${nextVal} prevVal: ${prevVal}`);
  };

  const onChartIntervalChange = async (
    shortName: string,
    shiftType: DurationInputArg2,
    shiftAmount: DurationInputArg1,
  ) => {
    if (chartInterval !== shortName || chartData.length === 0) {
      const dateFrom = moment(datePickerValue)
        .add(-shiftAmount, shiftType)
        .format('YYYY.MM.DD');
      const dateTo = moment(datePickerValue).format('YYYY.MM.DD');
      console.log(`dateFrom ${dateFrom.toString()} dateTo: ${dateTo.toString()}`);

      const data = await axios.get('http://www.nbrb.by/API/ExRates/Rates/Dynamics/145', {
        params: { startDate: dateFrom, endDate: dateTo },
      });
      console.log('data', data.data);

      setChartData(data.data);
      setChartInterval(shortName);
    }
  };

  const setDate = (event: any, date?: Date | undefined) => {
    console.log('event', event);
    console.log('date', date);
    setIsDatePickerVisible(false);
    if (event.type === 'set' || date) {
      setDatePickerValue(date || datePickerValue);
    }
  };

  const toggleGraph = () => {
    if (isGraphFaded === 0) {
      console.log('animated');
      Animated.timing(converterFade, { toValue: 1, duration: 3000 }).start();
      setGraphFade(new Animated.Value(0));
    } else {
      Animated.timing(graphFade, { toValue: 1, duration: 3000 }).start();
      setConverterFade(new Animated.Value(0));
    }
    setIsGraphFaded(+!isGraphFaded);
  };

  if (loading) {
    return <Spinner/>;
  }

  return (
    <View style={{ ...styles.container, backgroundColor: bgColor }}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{ position: 'absolute', left: 10, top: 10 }}
      >
        <Icon name={'menu-fold'} size={30} color={primary}/>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.changeDateContainer}
        onPress={() => {
          setIsDatePickerVisible(!isDatePickerVisible);
          //@ts-ignore
          _panel.current.show();
        }}
      >
        <Text style={{ color: primary, fontSize: 25 }}>{datePickerValue.toDateString()} </Text>
        <Icon name={'calendar'} size={25} color={primary}/>
      </TouchableOpacity>

      <CurrencyRatesTable ratesToRender={ratesToRender} textColor={textColor}/>

      <Collapsible collapsed={err.isError}>
        <Text style={{ color: errColor, fontSize: 22 }}>{err.errMsg}</Text>
      </Collapsible>

      <TouchableOpacity style={{alignItems: 'flex-start', width: '100%', paddingLeft: 10}} onPress={() => toggleGraph()}>
        <Icon name={isGraphFaded ? 'linechart' : 'bank'}
              size={25}
              color={primaryVarBg}>{isGraphFaded === 1 ? ' Graph' : ' Converter'}</Icon>
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
                {Platform.OS === 'android' && <Text style={{ color: textColor }}>{e.Cur_Abbreviation}</Text>}
                <Picker
                  selectedValue={e.Cur_Abbreviation}
                  onValueChange={(itemValue) => onChangeFieldCurrency(itemValue, e.Cur_Abbreviation)}
                  style={styles.pickerStyle}
                  itemStyle={{ ...styles.pickerItemStyle, color: primary }}
                >
                  {ratesToRender.map((e) => (
                    <Picker.Item key={e.Cur_ID} label={e.Cur_Abbreviation} value={e.Cur_Abbreviation}/>
                  ))}
                </Picker>
              </View>
            );
          })}
        </Animated.View>
      ) : (
        <Animated.View style={{ opacity: graphFade }}>
          <ChartTimeIntervalsBar
            onChartIntervalChange={onChartIntervalChange}
            activeChartInterval={chartInterval}
            activeColor={primary}
            inactiveColor={textColor}
          />
          <CustomLineChart chartData={chartData}/>
        </Animated.View>
      )}

      <SlidingUpPanel
        ref={_panel}
        draggableRange={{ top: Dimensions.get('screen').height / 3.3, bottom: 0 }}
        onBottomReached={() => setIsDatePickerVisible(false)}
        backdropOpacity={0.7}
      >
        {(dragHandler: any) => (
          <>
            {isDatePickerVisible && (
              <View style={styles.sliderWrapper}>
                <View style={styles.sliderHeader} {...dragHandler}>
                  <View style={{ ...styles.sliderHeaderItem, backgroundColor: textColor }}/>
                </View>
                <View style={{ backgroundColor: 'white' }}>
                  <DateTimePicker
                    value={datePickerValue}
                    mode={'date'}
                    is24Hour={true}
                    display='default'
                    onChange={setDate}
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
