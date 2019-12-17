import React from 'react';
import { RootNavigator } from './navigators';
import { SafeAreaView } from 'react-native';
import { store } from './redux/store';
import { Provider } from 'react-redux';

export const App: React.FC = (): React.ReactElement => {

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <RootNavigator />
      </SafeAreaView>
    </Provider>
  );
};
