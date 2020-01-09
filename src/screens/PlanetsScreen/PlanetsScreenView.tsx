import React, { FC, ReactElement } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { PlanetsScreenViewProps } from '@root/screens/PlanetsScreen/types';
import { styles } from '@root/screens/PlanetsScreen/styles';
import { CustomButton } from '@root/components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Spinner } from '@root/components/Spinner/Spinner';

export const PlanetsScreenView: FC<PlanetsScreenViewProps> = (
  props: PlanetsScreenViewProps,
): ReactElement<PlanetsScreenViewProps> => {
  const {
    keyExtractor,
    renderItem,
    data,
    isDarkMode,
    loading,
    loadNext,
    filterList,
    bgColor,
    primaryVarBg,
    primaryVar,
    textColor,
    t,
  } = props;

  return (
    <View style={{ ...styles.container, backgroundColor: bgColor }}>
      <CustomButton
        wrapperStyle={{ position: 'absolute', right: 20, bottom: 20, zIndex: 1 }}
        bgStyle={{ backgroundColor: primaryVarBg }}
        onPress={loadNext}
      >
        <Icon name={'expand-more'} size={40} color={primaryVar} />
      </CustomButton>

      <Text style={{ ...styles.headText, color: textColor }}>{t('headTitle')}</Text>
      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <Icon name={'filter-list'} size={30} color={textColor} />
        <TextInput
          style={{
            ...styles.filterStyle,
            borderColor: textColor,
            backgroundColor: bgColor,
            color: textColor,
          }}
          placeholderTextColor={textColor}
          placeholder={'Filter'}
          onChangeText={(text) => filterList(text)}
        />
      </View>
      {loading ? (
        <Spinner />
      ) : (
        <FlatList
          data={data}
          initialNumToRender={data.length}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          style={{ width: '100%' }}
          indicatorStyle={isDarkMode ? 'white' : 'black'}
          onEndReached={() => {
            console.log('onEndReached');
          }}
        />
      )}
    </View>
  );
};
