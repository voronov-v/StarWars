import React, {FC, ReactElement, useEffect} from 'react';
import {View, Text, ListRenderItemInfo, TouchableOpacity} from 'react-native';
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

export const PlanetsScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement<NavigationStackScreenProps> => {
  const {navigation} = props;
  const {t} = useTranslation('planetsScreen');
  const dispatch = useDispatch();

  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY];

  const planets = useSelector(getPlanets);
  const {loading, planetsList, errMsg} = planets;

  useEffect(() => {
    dispatch({type: LOAD_PLANETS})
  }, []);

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

  if (errMsg !== "") return <ErrorView errMsg={errMsg} dispatch={() => dispatch({type: LOAD_PLANETS})} reloadMsg={'Load Planets!'}/>;

  return (
    <View style={{...styles.container, backgroundColor: bgColor}}>
      <Text style={{...styles.headText, color: textColor}}>{t('headTitle')}</Text>
      <PlanetsScreenView data={planetsList} renderItem={renderItem} keyExtractor={keyExtractor}/>
      {loading ? <Spinner/> : null}
    </View>
  );
};
