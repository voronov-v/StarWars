import AsyncStorage from '@react-native-community/async-storage';

export const loadState = async () => {
  try {
    const customState = await AsyncStorage.getItem('customState');
    if (customState === null) {
      return {};
    }
    return JSON.parse(customState);
  } catch (err) {
    console.log('loadState err', err);
    return undefined;
  }
};

export const saveState = async (state: any) => {
  try {
    const customState = JSON.stringify(state);
    await AsyncStorage.setItem('customState', customState);
  } catch (err) {
    console.log('saveState err', err);
  }
};
