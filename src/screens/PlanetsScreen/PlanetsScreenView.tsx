import React, {FC, ReactElement} from 'react';
import {FlatList} from 'react-native';
import {PlanetsScreenViewProps} from '@root/screens/PlanetsScreen/types';

export const PlanetsScreenView: FC<PlanetsScreenViewProps> = (
  props: PlanetsScreenViewProps,
): ReactElement<PlanetsScreenViewProps> => {
  const {keyExtractor, renderItem, data, ListHeaderComponent/*, loadData*/} = props;

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      data={data}
      initialNumToRender={data.length}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      onEndReached={
        () => {
          console.log('hello from end');
           // loadData();
        }
      }
    />
  );
};
