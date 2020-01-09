import React, { FC, ReactElement } from 'react';
import { FlatList } from 'react-native';
import { FilmsScreenViewProps } from './types';

export const FilmsScreenView: FC<FilmsScreenViewProps> = (
  props: FilmsScreenViewProps,
): ReactElement<FilmsScreenViewProps> => {
  const { keyExtractor, renderItem, data } = props;

  return (
    <FlatList
      data={data}
      initialNumToRender={data.length}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};
