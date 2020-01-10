export type CustomDatePickerAndroidPropsType = {
  onCancel: () => void;
  onConfirm: (date: Date) => void;
  date?: Date;
  mode?: 'date' | 'time' | 'datetime';
  onHideAfterConfirm?: (date: Date) => void;
  is24Hour?: boolean;
  isVisible?: boolean;
  datePickerModeAndroid?: 'calendar' | 'spinner' | 'default';
  timePickerModeAndroid?: 'clock' | 'spinner' | 'default';
  minimumDate?: Date;
  maximumDate?: Date;
};
