import AsyncStorage from '@react-native-community/async-storage';

export const loadState = () => {
  try {
    console.log('trying to loadState');
    const customState = AsyncStorage.getItem('customState');
    console.log('customState', customState)
    if (customState === null) {
      return undefined;
    }
    //@ts-ignore
    return JSON.parse(customState);

  } catch (err) {
    console.log('loadState err', err);
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    console.log('trying to saveState', state);
    const customState = JSON.stringify(state);
    AsyncStorage.setItem('customState', customState);
  } catch (err) {
    console.log('saveState err', err)
  }
};
