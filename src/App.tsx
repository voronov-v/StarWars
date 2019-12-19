import React from 'react';
import {RootNavigator} from './navigators';
import {SafeAreaView, View, Text} from 'react-native';
import {storeObject} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";

export const App: React.FC = (): React.ReactElement => {
  const {store, persistor} = storeObject;

  const Loading = () => {
    return <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>loading...</Text></View>
  };

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading/>} persistor={persistor}>
        <SafeAreaView style={{flex: 1}}>
          <RootNavigator/>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};
