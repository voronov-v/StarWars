import { ReactNode } from 'react';

export type CustomDatePickerIOSPropsType = {
  onCancel: () => void;
  onConfirm: (date: Date) => void;
  date?: Date;
  mode?: 'date' | 'time' | 'datetime';
  onHideAfterConfirm?: (date: Date) => void;
  isVisible?: boolean;

  minuteInterval?: number
  cancelTextIOS?: string;
  cancelTextStyle?: any;
  confirmTextIOS?: string;
  confirmTextStyle?: any;
  contentContainerStyleIOS?: any;
  cancelButtonContainerStyleIOS?: any;
  customCancelButtonIOS?: ReactNode;
  customConfirmButtonIOS?: ReactNode;
  customConfirmButtonWhileInteractingIOS?: ReactNode;
  customDatePickerIOS?: ReactNode | any;
  customTitleContainerIOS?: ReactNode;
  dismissOnBackdropPressIOS?: boolean;
  hideTitleContainerIOS?: boolean;
  isDarkModeEnabled?: boolean;
  datePickerContainerStyleIOS?: any;
  neverDisableConfirmIOS?: boolean;
  onDateChange?: (date: Date) => void;
  pickerRefCb?: () => void;
  reactNativeModalPropsIOS?: any;
  titleIOS?: string;
  titleStyle?: any;
};
