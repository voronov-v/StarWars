import React from 'react';
import {RootNavigator} from './navigators';
import {SafeAreaView} from 'react-native';
import {storeObject} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import './i18n';

export const App: React.FC = (): React.ReactElement => {
  const {store, persistor} = storeObject;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
          <RootNavigator/>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};
