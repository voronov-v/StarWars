import React, { useEffect, useState } from 'react';
import { RootNavigator } from './navigators';
import { Provider } from 'react-redux';
import { ThemeWrapper } from '@root/components/ThemeWrapper';
import { Spinner } from '@root/components/Spinner/Spinner';
import { initStore, store } from '@root/redux/store';

export const App: React.FC = (): React.ReactElement => {
  const [tmpStore, setTmpStore] = useState(store);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      const store = await initStore();
      setTmpStore(store);
      setIsLoad(true);
    };
    initApp();
  }, []);

  return (
    <Provider store={tmpStore}>
      {!isLoad ? (
        <Spinner />
      ) : (
        <ThemeWrapper>
          <RootNavigator />
        </ThemeWrapper>
      )}
    </Provider>
  );
};
