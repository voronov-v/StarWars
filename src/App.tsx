import React from 'react';
import {RootNavigator} from './navigators';
import {View, Text} from 'react-native';
import {storeObject} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import {ThemeWrapper} from "@root/components/ThemeWrapper";

export const App: React.FC = (): React.ReactElement => {
  const {store, persistor} = storeObject;

  const Loading = () => {
    return <View style={{justifyContent: 'center', alignItems: 'center'}}><Text>loading...</Text></View>
  };

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading/>} persistor={persistor}>
        <ThemeWrapper>
          <RootNavigator/>
        </ThemeWrapper>
      </PersistGate>
    </Provider>
  );
};
