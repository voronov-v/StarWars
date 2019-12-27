import React from 'react';
import {RootNavigator} from './navigators';
import {storeObject} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeWrapper} from '@root/components/ThemeWrapper';

export const App: React.FC = (): React.ReactElement => {
  const {store, persistor} = storeObject;

  const onBeforeLift = () => console.log('PersistGate onBeforeLift');

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} onBeforeLift={onBeforeLift}>
        <ThemeWrapper>
          <RootNavigator screenProps={{language: store.getState().settings.language}}/>
        </ThemeWrapper>
      </PersistGate>
    </Provider>
  );
};
