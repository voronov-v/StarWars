import React, { FC } from 'react';
import { SectionList } from 'react-native';
import { PlanetInfoViewProps } from './types';
import { styles } from './styles';

export const PlanetInfoView: FC<PlanetInfoViewProps> = (props: PlanetInfoViewProps) => {
  const { sections, listHeaderComponent, renderSectionHeader, keyExtractros, renderItem } = props;
  return (
    <SectionList style={styles.container}
                 sections={sections}
                 ListHeaderComponent={listHeaderComponent}
                 renderSectionHeader={renderSectionHeader}
                 keyExtractor={keyExtractros}
                 renderItem={renderItem}/>
  );
};
