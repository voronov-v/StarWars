import React, { useEffect, useState } from 'react';
import { RootNavigator } from './navigators';
import { Provider } from 'react-redux';
import { ThemeWrapper } from '@root/components/ThemeWrapper';
import { Spinner } from '@root/components/Spinner/Spinner';
import { initStore, store } from '@root/redux/store';

export const App: React.FC = (): React.ReactElement => {
  const [tmpStore, setTmpStore] = useState(store);
  const [loading, setIsLoading] = useState(true);
  console.log('App loading', loading);
  useEffect(() => {
    const initApp = async () => {
      const store = await initStore();
      await setTmpStore(store);
      await setIsLoading(false);
    };
    initApp();
  }, []);

  return (
    <Provider store={tmpStore}>
      {loading ? (
        <Spinner />
      ) : (
        <ThemeWrapper>
          <RootNavigator />
        </ThemeWrapper>
      )}
    </Provider>
  );
};
