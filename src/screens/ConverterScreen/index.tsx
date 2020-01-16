import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Picker, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getIsDarkMode, getRates } from '@root/selectors';
import { themeType } from '@root/redux/reducers/settingsReducer';
import { DARK_THEME, PRIMARY_THEME } from '@root/consts/themes';
import { styles } from './styles';
import DateTimePicker from '@root/components/CustomDateTimePicker';
import moment, { DurationInputArg1, DurationInputArg2 } from 'moment';
//@ts-ignore
import { Row, Rows, Table, TableWrapper } from 'react-native-table-component';
import { LOAD_CURRENCY_RATES_ON_DATE } from '@root/redux/reducers/currencyReducer';
import { Spinner } from '@root/components/Spinner/Spinner';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/AntDesign';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import { chartTimeIntervalType, chartViewDataType, CustomLineChartProps } from "./types";
import axios from 'axios';

export const ConverterScreen: FC = (): ReactElement => {
  const dispatch = useDispatch();

  const [datePicker, setDatePicker] = useState(moment(new Date()).format('DD.MM.YYYY'));
  const [chartInterval, setChartInterval] = useState('w');
  const [chartData, setChartData] = useState([]);

  const chartTimeIntervals: chartTimeIntervalType[] = [
    { name: '1 Week', shortName: 'w', shiftType: 'days', shiftAmount: 7 },
    { name: '1 Month', shortName: 'm', shiftType: 'months', shiftAmount: 1 },
    { name: '3 Months', shortName: '3m', shiftType: 'months', shiftAmount: 3 },
    { name: '6 Months', shortName: '6m', shiftType: 'months', shiftAmount: 6 },
    { name: '1 Year', shortName: 'y', shiftType: 'years', shiftAmount: 1 },
  ];

  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [converterToggle, setConverterToggle] = useState(true);

  const currency = useSelector(getRates);
  const { currencyRates, loading } = currency;

  const rowsData = currencyRates
    ? currencyRates.map((e) => [e.Cur_Name, e.Cur_OfficialRate, e.Cur_Abbreviation, e.Cur_Scale])
    : [];
  const [ratesToRender, setRatesToRender] = useState(currencyRates || []);

  useEffect(() => {
    const date = moment(datePicker, 'DD.MM.YYYY').format('YYYY-MM-DD');
    dispatch({ type: LOAD_CURRENCY_RATES_ON_DATE, payload: { date } });
  }, [datePicker]);

  useEffect(() => {
    setRatesToRender(currencyRates || []);
  }, [currencyRates]);

  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary, errColor] = [
    theme.ON_BACKGROUND,
    theme.BACKGROUND,
    theme.PRIMARY,
    theme.ERROR,
  ];
  const [err, setErr] = useState({ isError: false, errMsg: '' });

  const onChangeFieldText = (code: string, value: string) => {
    setErr({ isError: true, errMsg: '' });
    if (!/^\d*\.?\d*$/.test(value)) {
      setErr({ isError: false, errMsg: `Invalid input on ${code} currency field` });
      return;
    }

    const field = ratesToRender.find((e) => e.Cur_Abbreviation === code)!;
    const bynVal =
      value !== '' ? (Number.parseFloat(value) * field.Cur_OfficialRate) / field.Cur_Scale : 0;
    console.log(`code: ${code}: ${value} BYN: ${bynVal}`);

    const tmp = [...ratesToRender].map((e) => {
      if (bynVal === 0) {
        e.Cur_Value = '';
      } else if (e.Cur_Abbreviation === code) {
        e.Cur_Value = value;
      } else {
        e.Cur_Value = (
          Math.round((bynVal / e.Cur_OfficialRate) * e.Cur_Scale * 100) / 100
        ).toString();
      }
      return e;
    });
    console.log('tmp', tmp);
    setRatesToRender(tmp);
  };

  const onChangeFieldCurrency = (nextVal: string, prevVal: string) => {
    console.log(`nextVal: ${nextVal} prevVal: ${prevVal}`);
    //   if (nextVal !== prevVal) {
    //     console.log(`${prevVal} => ${nextVal}`);
    //     const currField = currArr.find((e) => e.curr_code === prevVal);
    //     if (!currField) {
    //       console.log('currField', currField);
    //       onChangeFieldText(nextVal, currField!.value);
    //     } else Alert.alert('Error', 'Your currency already exists in the list');
    //   }
  };

  const handleDatePicked = (date: Date) => {
    const dat = moment(date).format('DD.MM.YYYY');
    setDatePicker(dat);
    setIsDateTimePickerVisible(false);
  };

  const onChartIntervalChange = async (shortName: string, shiftType: DurationInputArg2, shiftAmount: DurationInputArg1) => {
    const dateFrom = moment(datePicker, 'DD.MM.YYYY').add(-shiftAmount, shiftType).format('YYYY.MM.DD');
    const dateTo = moment(datePicker, 'DD.MM.YYYY').format('YYYY.MM.DD');
    console.log(`dateFrom ${dateFrom.toString()} dateTo: ${dateTo.toString()}`);

    const data = await axios.get('http://www.nbrb.by/API/ExRates/Rates/Dynamics/145', {
      params: { startDate: dateFrom, endDate: dateTo }
    });
    console.log('data', data.data);

    setChartData(data.data);
    setChartInterval(shortName)
  };

  if (loading) {
    return <Spinner/>;
  }

  return (
    <View style={{ ...styles.container, backgroundColor: bgColor }}>
      <TouchableOpacity
        style={styles.changeDateContainer}
        onPress={() => setIsDateTimePickerVisible(true)}
      >
        <Text style={{ color: primary, fontSize: 20 }}>{datePicker} </Text>
        <Icon name={'calendar'} size={25} color={primary}/>
      </TouchableOpacity>

      <View style={styles.tableWrapper}>
        <Table borderStyle={{}}>
          <Row
            data={['Currency', 'Rate', 'Code', 'Count']}
            style={{ ...styles.tableHead, borderColor: textColor }}
            flexArr={[2, 1, 1, 1]}
            textStyle={{ color: textColor, textAlign: 'center', fontSize: 18, fontWeight: 'bold', fontStyle: 'italic' }}
          />
          <TableWrapper style={{ flexDirection: 'row' }}>
            <Rows
              data={rowsData}
              flexArr={[2, 1, 1, 1]}
              style={{ height: 30 }}
              textStyle={{ color: textColor, textAlign: 'center', fontSize: 15 }}
            />
          </TableWrapper>
        </Table>
      </View>

      <Collapsible collapsed={err.isError}>
        <Text style={{ color: errColor, fontSize: 22 }}>{err.errMsg}</Text>
      </Collapsible>

      <TouchableOpacity onPress={() => setConverterToggle(!converterToggle)}>
        <Text style={{ color: textColor, paddingBottom: 15 }}>toggle</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row' }}>
        {chartTimeIntervals.map(e => {
          return (
            <TouchableOpacity key={e.shortName}
                              style={{ paddingHorizontal: 7 }}
                              onPress={() => onChartIntervalChange(e.shortName, e.shiftType, e.shiftAmount)}>
              <Text style={[{
                fontSize: 18,
                fontWeight: '500'
              }, chartInterval === e.shortName ? { color: primary } : { color: textColor }]}>{e.shortName}</Text>
            </TouchableOpacity>
          )
        })}
      </View>

      {converterToggle && chartData.length > 0 && <CustomLineChart chartData={chartData || []}/>}

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
              {Platform.OS === 'android' && (
                <Text style={{ color: textColor }}>{e.Cur_Abbreviation}</Text>
              )}
              <Picker
                selectedValue={e.Cur_Abbreviation}
                onValueChange={(itemValue) => onChangeFieldCurrency(itemValue, e.Cur_Abbreviation)}
                style={styles.pickerStyle}
                itemStyle={{ ...styles.pickerItemStyle, color: primary }}
              >
                {ratesToRender.map((e) => (
                  <Picker.Item
                    key={e.Cur_ID}
                    label={e.Cur_Abbreviation}
                    value={e.Cur_Abbreviation}
                  />
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

const CustomLineChart: FC<CustomLineChartProps> = (props: CustomLineChartProps): ReactElement<CustomLineChartProps> => {
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

  return (
    <View style={{ height: 340, flexDirection: 'row', backgroundColor: 'white', padding: 20 }}>
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
