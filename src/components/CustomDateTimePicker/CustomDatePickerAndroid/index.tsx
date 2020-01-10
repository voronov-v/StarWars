import React, { useEffect } from 'react';
import { DatePickerAndroid, TimePickerAndroid } from 'react-native';
import { CustomDatePickerAndroidPropsType } from '@root/components/CustomDateTimePicker/CustomDatePickerAndroid/types';

export const CustomDatePickerAndroid = (props: CustomDatePickerAndroidPropsType) => {
  console.log('props', props);
  const {
    date = new Date(),
    mode = 'date',
    datePickerModeAndroid = 'default',
    timePickerModeAndroid = 'default',
    is24Hour = true,
    isVisible = true,
    onHideAfterConfirm = () => {},
  } = props;

  useEffect(() => {
    if (props && isVisible) {
      if (mode === 'date' || mode === 'datetime') {
        showDatePickerAndroid().catch(console.error);
      } else {
        showTimePickerAndroid().catch(console.error);
      }
    }
  }, [isVisible]);

  // useEffect(() => {
  //   if (mode === "date" || mode === "datetime") {
  //     showDatePickerAndroid().catch(console.error);
  //   } else {
  //     showTimePickerAndroid().catch(console.error);
  //   }
  // }, [isVisible]);

  const showDatePickerAndroid = async () => {
    let picked: any;
    try {
      picked = await DatePickerAndroid.open({
        date: date,
        minDate: props.minimumDate,
        maxDate: props.maximumDate,
        mode: datePickerModeAndroid,
      });
    } catch ({ message }) {
      console.warn('Cannot open date picker', message);
      return;
    }

    const { action, year, month, day } = picked;
    if (action !== DatePickerAndroid.dismissedAction) {
      let dat: Date;
      if (date && !isNaN(date.getTime())) {
        let hour = date.getHours();
        let minute = date.getMinutes();
        dat = new Date(year, month, day, hour, minute);
      } else {
        dat = new Date(year, month, day);
      }

      if (mode === 'datetime') {
        // Prepopulate and show time picker
        const timeOptions: any = { is24Hour: is24Hour, mode: timePickerModeAndroid };

        if (date) {
          timeOptions.hour = date.getHours();
          timeOptions.minute = date.getMinutes();
        }

        let pickedTime: any;
        try {
          pickedTime = await TimePickerAndroid.open(timeOptions);
        } catch ({ message }) {
          console.warn('Cannot open time picker', message);
          return;
        }

        const { action: timeAction, hour, minute } = pickedTime;
        if (timeAction !== TimePickerAndroid.dismissedAction) {
          const selectedDate = new Date(year, month, day, hour, minute);
          props.onConfirm(selectedDate);
          onHideAfterConfirm(selectedDate);
        } else {
          props.onCancel();
        }
      } else {
        props.onConfirm(dat);
        onHideAfterConfirm(dat);
      }
    } else {
      props.onCancel();
    }
  };

  const showTimePickerAndroid = async () => {
    let picked: any;
    try {
      picked = await TimePickerAndroid.open({
        hour: date.getHours(),
        minute: date.getMinutes(),
        is24Hour: is24Hour,
        mode: timePickerModeAndroid,
      });
    } catch ({ message }) {
      console.warn('Cannot open time picker', message);
      return;
    }

    const { action, hour, minute } = picked;
    if (action !== TimePickerAndroid.dismissedAction) {
      let dat;
      if (date) {
        // This prevents losing the Date elements, see issue #71
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        dat = new Date(year, month, day, hour, minute);
      } else {
        //@ts-ignore
        dat = new Date().setHours(hour).setMinutes(minute);
      }
      props.onConfirm(dat);
      onHideAfterConfirm(dat);
    } else {
      props.onCancel();
    }
  };

  return <></>;
};
