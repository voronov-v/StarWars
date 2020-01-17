import React, { FC, ReactElement, useEffect, useState } from 'react';
import { View, Text, ListRenderItemInfo, TouchableOpacity } from 'react-native';
import { PlanetsScreenView } from './PlanetsScreenView';
import { PlanetType, RenderItem } from './types';
import { styles } from './styles';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import { getIsDarkMode, getPlanets } from '../../selectors';
import { LOAD_PLANETS } from '../../redux/reducers/planetsReducer';
import { useTranslation } from 'react-i18next';
import { themeType } from '@root/redux/reducers/settingsReducer';
import { DARK_THEME, PRIMARY_THEME } from '@root/consts/themes';
import { ErrorView } from '@root/components/ErrorView';

export const PlanetsScreen: FC<NavigationStackScreenProps> = (
  props: NavigationStackScreenProps,
): ReactElement<NavigationStackScreenProps> => {
  const { navigation } = props;
  const { t } = useTranslation('planetsScreen');
  const dispatch = useDispatch();

  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary, primaryVar, primaryVarBg] = [
    theme.ON_BACKGROUND,
    theme.BACKGROUND,
    theme.PRIMARY,
    theme.PRIMARY_VAR,
    theme.PRIMARY_VAR_BG,
  ];

  const planets = useSelector(getPlanets);
  const { loading, planetsList, errMsg, nextUrl } = planets;
  const [dataToRender, setDataToRender] = useState(planetsList);

  useEffect(() => {
    if (planetsList.length === 0) dispatch({ type: LOAD_PLANETS, payload: { planetsList } });
  }, [dispatch]);

  useEffect(() => setDataToRender(planetsList), [planetsList]);

  const renderItem: RenderItem = ({ item }: ListRenderItemInfo<PlanetType>): ReturnType<RenderItem> => {
    const onPress = () => {
      navigation.navigate('PlanetInfo', { planetData: item });
    };

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{ ...styles.item }}>
          <View>
            <Text style={{ ...styles.title, color: primary }}>{item.name}</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: primary }}>
              {t('population')} {item.population}
            </Text>
            <Text style={{ color: primary }}>
              {t('climate')} {item.climate}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: PlanetType) => item.url + item.name;

  const filterList = (text: string) => {
    if (text) {
      const tmp = planetsList.filter((e) => e.name.toLowerCase().indexOf(text.toLowerCase()) !== -1);
      setDataToRender(tmp);
    } else setDataToRender(planetsList);
  };

  if (errMsg !== '')
    return (
      <ErrorView
        errMsg={errMsg}
        reloadMsg={'Load Planets!'}
        dispatch={() => {
          if (planetsList.length === 0) dispatch({ type: LOAD_PLANETS, payload: { planetsList } });
        }}
      />
    );

  const loadNext = () => {
    if (!loading && nextUrl) dispatch({ type: LOAD_PLANETS, payload: { nextUrl } });
  };

  return (
    <PlanetsScreenView
      data={dataToRender}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      isDarkMode={isDarkMode}
      loading={loading}
      loadNext={loadNext}
      filterList={filterList}
      bgColor={bgColor}
      primaryVarBg={primaryVarBg}
      primaryVar={primaryVar}
      textColor={textColor}
      t={t}
    />
  );
};
