import React, { useState } from 'react';
import { DatePickerIOS, Text, TouchableHighlight, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { styles } from './styles';

import { CustomDatePickerIOSPropsType } from './types';
import { colors } from '@root/components/CustomDateTimePicker/CustomDatePickerIOS/colors';

export const CustomDatePickerIOS = (props: CustomDatePickerIOSPropsType) => {
  // console.log('props', props);
  const {
    cancelTextIOS = 'Cancel',
    confirmTextIOS = 'Confirm',
    date = new Date(),
    dismissOnBackdropPressIOS = true,
    hideTitleContainerIOS = false,
    isDarkModeEnabled = false,
    isVisible = false,
    mode = 'date',
    neverDisableConfirmIOS = false,
    onHideAfterConfirm = () => {},
    onDateChange = () => {},
    reactNativeModalPropsIOS = {},
    titleIOS = 'Pick a date',
    minuteInterval = 1,
    cancelTextStyle,
    confirmTextStyle,
    contentContainerStyleIOS,
    cancelButtonContainerStyleIOS,
    customCancelButtonIOS,
    customConfirmButtonIOS,
    customConfirmButtonWhileInteractingIOS,
    customDatePickerIOS,
    customTitleContainerIOS,
    datePickerContainerStyleIOS,
    pickerRefCb,
    titleStyle,
    ...otherProps
  } = props;

  const [myDate, setMyDate] = useState(date);
  const [userIsInteractingWithPicker, setUserIsInteractingWithPicker] = useState(false);
  const [myMinuteInterval, setMyMinuteInterval] = useState(minuteInterval);
  const [myConfirmed, setMyConfirmed] = useState(false);

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.date.valueOf() !== nextProps.date.valueOf()) {
  //     this.setState({
  //       date: nextProps.date
  //     });
  //   }
  // }

  const handleCancel = () => {
    setMyConfirmed(false);
    props.onCancel();
    resetDate();
  };

  const handleConfirm = () => {
    setMyConfirmed(true);
    props.onConfirm(myDate);
    resetDate();
  };

  const resetDate = () => {
    setMyDate(date);
  };

  const handleModalShow = () => {
    setMyMinuteInterval(minuteInterval);
  };

  const handleModalHide = () => {
    if (myConfirmed) {
      onHideAfterConfirm(myDate);
    }
  };

  const handleDateChange = (date: Date) => {
    setMyDate(date);
    setUserIsInteractingWithPicker(false);
    onDateChange(date);
  };

  const handleUserTouchInit = () => {
    // custom date picker shouldn't change this param
    if (!props.customDatePickerIOS) {
      setUserIsInteractingWithPicker(true);
    }
    return false;
  };

  const titleContainer = (
    <View style={styles.titleContainer}>
      <Text style={[styles.title, titleStyle]}>{titleIOS}</Text>
    </View>
  );

  let confirmButton;
  if (customConfirmButtonIOS) {
    if (customConfirmButtonWhileInteractingIOS && userIsInteractingWithPicker) {
      confirmButton = customConfirmButtonWhileInteractingIOS;
    } else {
      confirmButton = customConfirmButtonIOS;
    }
  } else {
    confirmButton = <Text style={[styles.confirmText, confirmTextStyle]}>{confirmTextIOS}</Text>;
  }

  const cancelButton = <Text style={[styles.cancelText, cancelTextStyle]}>{cancelTextIOS}</Text>;
  const DatePickerComponent = customDatePickerIOS || DatePickerIOS;
  const reactNativeModalProps = {
    onBackdropPress: dismissOnBackdropPressIOS ? handleCancel : () => null,
    ...reactNativeModalPropsIOS,
  };
  const backgroundColor = isDarkModeEnabled ? colors.BACKGROUND_COLOR_DARK : colors.BACKGROUND_COLOR_LIGHT;

  return (
    <ReactNativeModal
      isVisible={isVisible}
      style={[styles.contentContainer, contentContainerStyleIOS]}
      onModalHide={handleModalHide}
      onModalShow={handleModalShow}
      backdropOpacity={0.4}
      {...reactNativeModalProps}
    >
      <View style={[styles.datepickerContainer, { backgroundColor }, datePickerContainerStyleIOS]}>
        {!hideTitleContainerIOS && (customTitleContainerIOS || titleContainer)}
        {
          //@ts-ignore
          <View onStartShouldSetResponderCapture={!neverDisableConfirmIOS ? handleUserTouchInit : null}>
            <DatePickerComponent
              ref={pickerRefCb}
              mode={mode}
              minuteInterval={myMinuteInterval}
              {...otherProps}
              date={myDate}
              onDateChange={handleDateChange}
            />
          </View>
        }
        <TouchableHighlight
          style={styles.confirmButton}
          underlayColor={colors.HIGHLIGHT_COLOR}
          onPress={handleConfirm}
          disabled={!neverDisableConfirmIOS && userIsInteractingWithPicker}
        >
          {confirmButton}
        </TouchableHighlight>
      </View>

      <TouchableHighlight
        style={[styles.cancelButton, { backgroundColor }, cancelButtonContainerStyleIOS]}
        underlayColor={colors.HIGHLIGHT_COLOR}
        onPress={handleCancel}
      >
        {customCancelButtonIOS || cancelButton}
      </TouchableHighlight>
    </ReactNativeModal>
  );
};
