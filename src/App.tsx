import React from 'react';
import { RootNavigator } from './navigators';
import { SafeAreaView } from 'react-native';

export const App: React.FC = (): React.ReactElement => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RootNavigator />
    </SafeAreaView>
  );
};
