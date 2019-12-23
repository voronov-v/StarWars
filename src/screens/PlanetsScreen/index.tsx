import React, {FC, ReactElement, useEffect, useState} from 'react';
import {View, Text, ListRenderItemInfo, TouchableOpacity, Button} from 'react-native';
import {PlanetsScreenView} from './PlanetsScreenView';
import {PlanetType, RenderItem} from './types';
import {styles} from './styles';
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {Spinner} from "../../components/Spinner/Spinner";
import {useDispatch, useSelector} from "react-redux";
import {getIsDarkMode, getPlanets} from "../../selectors";
import {LOAD_PLANETS} from "../../redux/reducers/planetsReducer";
import {useTranslation} from "react-i18next";
import {themeType} from "@root/redux/reducers/settingsReducer";
import {DARK_THEME, PRIMARY_THEME} from "@root/consts/themes";
import {ErrorView} from "@root/components/ErrorView";
import {FilterTextInput} from "@root/components/FilterTextInput";

export const PlanetsScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement<NavigationStackScreenProps> => {
  const {navigation} = props;
  const {t} = useTranslation('planetsScreen');
  const dispatch = useDispatch();

  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY];

  const planets = useSelector(getPlanets);
  const {loading, planetsList, errMsg, nextUrl} = planets;
  const [dataToRender, setDataToRender] = useState(planetsList);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (planetsList.length === 0) dispatch({type: LOAD_PLANETS, payload: {planetsList}})
  }, [dispatch]);

  useEffect(() => setDataToRender(planetsList), [planetsList]);

  const renderItem: RenderItem = ({item}: ListRenderItemInfo<PlanetType>): ReturnType<RenderItem> => {
    const onPress = () => {
      navigation.navigate('PlanetInfo', {planetData: item});
    };

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={{...styles.item}}>
          <View>
            <Text style={{...styles.title, color: primary}}>{item.name}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: primary}}>{t('population')} {item.population}</Text>
            <Text style={{color: primary}}>{t('climate')} {item.climate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item: PlanetType) => item.url + item.name;

  const filterList = (text: string) => {
    console.log('filterList ' + text);
    if (text) {
      const tmp = planetsList.filter(e => e.name.toLowerCase().indexOf(text.toLowerCase()) !== -1);
      setDataToRender(tmp);
    } else setDataToRender(planetsList);
  };

  const renderHeader = () => {
    return <View style={{alignItems: 'center'}}>
      <Button color={'red'} title={t('load more planets')}
              onPress={() => {
                if (!loading && nextUrl) dispatch({type: LOAD_PLANETS, payload: {nextUrl}})
              }}/>
      <Text style={{...styles.headText, color: textColor}}>{t('headTitle')}</Text>
      {/*@ts-ignore*/}
      <FilterTextInput filterList={filterList} setFilter={setFilter} filter={filter}/>
    </View>
  };

  if (errMsg !== "") return (
    <ErrorView errMsg={errMsg} reloadMsg={'Load Planets!'} dispatch={() => {
      if (planetsList.length === 0) dispatch({type: LOAD_PLANETS, payload: {planetsList}})
    }}
    />
  );

  return (
    <View style={{...styles.container, backgroundColor: bgColor}}>
      {loading
        ? <Spinner/>
        : <PlanetsScreenView ListHeaderComponent={renderHeader}
                             data={dataToRender}
                             renderItem={renderItem}
                             keyExtractor={keyExtractor}/>}
    </View>
  );
};
