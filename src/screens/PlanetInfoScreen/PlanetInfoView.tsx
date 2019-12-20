import React, { FC } from 'react';
import { SectionList } from 'react-native';
import { PlanetInfoViewProps } from './types';

export const PlanetInfoView: FC<PlanetInfoViewProps> = (props: PlanetInfoViewProps) => {
  const { sections, listHeaderComponent, renderSectionHeader, keyExtractros, renderItem, bgColor } = props;
  return (
    <SectionList style={{backgroundColor: bgColor}}
                 sections={sections}
                 ListHeaderComponent={listHeaderComponent}
                 renderSectionHeader={renderSectionHeader}
                 keyExtractor={keyExtractros}
                 renderItem={renderItem}
                 contentContainerStyle={{backgroundColor: 'green'}}
    />
  );
};
