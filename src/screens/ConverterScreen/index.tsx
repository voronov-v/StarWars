import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Picker, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getIsDarkMode, getRates } from '@root/selectors';
import { themeType } from '@root/redux/reducers/settingsReducer';
import { DARK_THEME, PRIMARY_THEME } from '@root/consts/themes';
import { styles } from './styles';
import DateTimePicker from '@root/components/CustomDateTimePicker';
import moment, { DurationInputArg1, DurationInputArg2 } from 'moment';
import { LOAD_CURRENCY_RATES_ON_DATE } from '@root/redux/reducers/currencyReducer';
import { Spinner } from '@root/components/Spinner/Spinner';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { CustomLineChart } from '@root/components/CustomLineChart';
import { ChartTimeIntervalsBar } from '@root/components/ChartTimeIntervalsBar';
import { CurrencyRatesTable } from '@root/components/CurrencyRatesTable';

export const ConverterScreen: FC = (): ReactElement => {
  const dispatch = useDispatch();

  const { currencyRates = [], loading } = useSelector(getRates);
  const isDarkMode = useSelector(getIsDarkMode);

  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary, errColor] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY, theme.ERROR];

  const [err, setErr] = useState({ isError: false, errMsg: '' });
  const [datePicker, setDatePicker] = useState(moment(new Date()).format('DD.MM.YYYY'));
  const [chartInterval, setChartInterval] = useState('w');
  const [chartData, setChartData] = useState([]);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [converterToggle, setConverterToggle] = useState(true);
  const [ratesToRender, setRatesToRender] = useState(currencyRates);

  useEffect(() => {
    const date = moment(datePicker, 'DD.MM.YYYY').format('YYYY-MM-DD');
    dispatch({ type: LOAD_CURRENCY_RATES_ON_DATE, payload: { date } });
  }, [datePicker]);

  useEffect(() => {
    setRatesToRender(currencyRates || []);
  }, [currencyRates]);

  const onChangeFieldText = (code: string, value: string) => {
    setErr({ isError: true, errMsg: '' });
    if (!/^\d*\.?\d*$/.test(value)) {
      setErr({ isError: false, errMsg: `Invalid input on ${code} currency field` });
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

  const handleDatePicked = (date: Date) => {
    const dat = moment(date).format('DD.MM.YYYY');
    setDatePicker(dat);
    setIsDateTimePickerVisible(false);
  };

  const onChartIntervalChange = async (
    shortName: string,
    shiftType: DurationInputArg2,
    shiftAmount: DurationInputArg1,
  ) => {
    if (chartInterval !== shortName || chartData.length === 0) {
      const dateFrom = moment(datePicker, 'DD.MM.YYYY')
        .add(-shiftAmount, shiftType)
        .format('YYYY.MM.DD');
      const dateTo = moment(datePicker, 'DD.MM.YYYY').format('YYYY.MM.DD');
      console.log(`dateFrom ${dateFrom.toString()} dateTo: ${dateTo.toString()}`);

      const data = await axios.get('http://www.nbrb.by/API/ExRates/Rates/Dynamics/145', {
        params: { startDate: dateFrom, endDate: dateTo },
      });
      console.log('data', data.data);

      setChartData(data.data);
      setChartInterval(shortName);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <View style={{ ...styles.container, backgroundColor: bgColor }}>
      <TouchableOpacity style={styles.changeDateContainer} onPress={() => setIsDateTimePickerVisible(true)}>
        <Text style={{ color: primary, fontSize: 20 }}>{datePicker} </Text>
        <Icon name={'calendar'} size={25} color={primary} />
      </TouchableOpacity>

      <CurrencyRatesTable ratesToRender={ratesToRender} textColor={textColor} />

      <ChartTimeIntervalsBar
        onChartIntervalChange={onChartIntervalChange}
        activeChartInterval={chartInterval}
        activeColor={primary}
        inactiveColor={textColor}
      />
      <CustomLineChart chartData={chartData} />

      <TouchableOpacity onPress={() => setConverterToggle(!converterToggle)}>
        <Text style={{ color: textColor, paddingBottom: 15 }}>toggle</Text>
      </TouchableOpacity>

      <Collapsible collapsed={err.isError}>
        <Text style={{ color: errColor, fontSize: 22 }}>{err.errMsg}</Text>
      </Collapsible>

      <Collapsible collapsed={converterToggle}>
        {ratesToRender.map((e) => {
          return (
            <View key={e.Cur_ID} style={styles.currencyFieldContainer}>
              <TextInput
                style={{ ...styles.converterInput, borderBottomColor: textColor, color: textColor }}
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
                  <Picker.Item key={e.Cur_ID} label={e.Cur_Abbreviation} value={e.Cur_Abbreviation} />
                ))}
              </Picker>
            </View>
          );
        })}
      </Collapsible>

      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={() => setIsDateTimePickerVisible(false)}
        date={moment(datePicker, 'DD.MM.YYYY').toDate()}
      />
    </View>
  );
};
