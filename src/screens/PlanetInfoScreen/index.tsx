import React, {FC, ReactElement, useEffect, useState,} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {NavigationStackScreenProps} from 'react-navigation-stack';
import {PlanetInfoView} from './PlanetInfoView';
import {Button, Text, TouchableOpacity, View} from 'react-native';
import {
  ItemInfoProps,
  KeyExtractor,
  PlanetInfoDataType,
  RenderItem,
  RenderSectionHeaderType
} from './types';
import {Spinner} from '@root/components/Spinner/Spinner';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {DARK_THEME, PRIMARY_THEME} from '@root/consts/themes';
import {LOAD_PLANET_INFO} from "@root/redux/reducers/planetsReducer";
import {getIsDarkMode, getPlanets} from "@root/selectors";
import {useTranslation} from "react-i18next";
import {themeType} from "@root/redux/reducers/settingsReducer";
import {PlanetType} from "@root/screens/PlanetsScreen/types";

export const PlanetInfoScreen: FC<NavigationStackScreenProps> = (props: NavigationStackScreenProps): ReactElement<NavigationStackScreenProps> => {
  const {navigation} = props;
  const {t} = useTranslation('planetInfoScreen');
  const dispatch = useDispatch();

  const isDarkMode: boolean = useSelector(getIsDarkMode);
  const theme: themeType = isDarkMode ? DARK_THEME : PRIMARY_THEME;
  const [textColor, bgColor, primary] = [theme.ON_BACKGROUND, theme.BACKGROUND, theme.PRIMARY];

  const planetData: PlanetType = navigation.getParam('planetData');
  const {loading, planetsList, errMsg} = useSelector(getPlanets);
  console.log('PlanetInfoScreen planetsList:', planetsList);

  useEffect(() => {
    dispatch({
      type: LOAD_PLANET_INFO,
      payload: {...planetData}
    });
  }, []);

  if (loading) return <Spinner/>;

  if (errMsg !== "") return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Text>error: {errMsg}</Text>
      <Button title={'load films'} onPress={() => dispatch({
        type: LOAD_PLANET_INFO,
        payload: {...planetData}
      })}/>
    </View>
  );

  //@ts-ignore
  const {films, residents} = planetsList.find(e => e.name === planetData.name).planetInfo || {films: [], residents: []};

  const planetInfoData: PlanetInfoDataType[] = [
    {title: t('filmsTitleSection'), icon: 'eyeo', data: films},
    {title: t('residentsTitleSection'), icon: 'meh', data: residents},
  ];

  const keyExtractor: KeyExtractor = (item) => item.url;

  //@ts-ignore
  const renderItem: RenderItem = ({item}) => <InfoWithState item={item} type={item.episode_id ? 'film' : ''}/>;

  const renderSectionHeader = ({section: {title, icon}}: RenderSectionHeaderType) => {
    return <Icon style={{...styles.containerIcon, backgroundColor: bgColor}} name={icon} size={30}
                 color={textColor}> {title}</Icon>;
  };

  const InfoWithState: FC<ItemInfoProps> = ({item, type}) => {
    const [hiddenInfo, setHiddenInfo] = useState(false);

    return (
      <TouchableOpacity onPress={() => setHiddenInfo(!hiddenInfo)}>
        {type === 'film'
          ?
          <View style={{backgroundColor: bgColor}}>
            <Text style={{...styles.textBoldMd, color: primary}}>Episode {item.episode_id}: {item.title}</Text>
            <Text style={{...styles.textBoldMd, color: primary}}>{item.release_date}</Text>
            {hiddenInfo && <Text style={{...styles.textSm, color: textColor}}>{item.opening_crawl}</Text>}
          </View>
          :
          <View style={{backgroundColor: bgColor}}>
            <Text style={{...styles.textBoldMd, color: primary}}>{item.name} ({item.gender}) was born
              in {item.birth_year}</Text>
            {hiddenInfo && <View>
              <Text style={{...styles.textSm, color: textColor}}>basic info:</Text>
              <Text style={{...styles.textSm, color: textColor}}>eye_color: {item.eye_color}</Text>
              <Text style={{...styles.textSm, color: textColor}}>hair_color: {item.hair_color}</Text>
              <Text style={{...styles.textSm, color: textColor}}>skin_color: {item.skin_color}</Text>
              <Text style={{...styles.textSm, color: textColor}}>mass: {item.mass}</Text>
            </View>
            }
          </View>
        }
      </TouchableOpacity>
    )
  };

  const listHeaderComponent = () => {
    return (
      <>
        <View style={{...styles.containerHead, backgroundColor: bgColor}}>
          <Icon name={'dribbble'} size={40} color={textColor}> {planetData.name}</Icon>
        </View>
        <View style={{backgroundColor: bgColor}}>
          <Icon style={{...styles.containerIcon, backgroundColor: bgColor}} name={'infocirlceo'} size={30}
                color={textColor}>
            {t('infoTitleSection')}
          </Icon>
          <Text style={{...styles.textBoldMd, color: textColor}}>{t('climate')} {planetData.climate}</Text>
          <Text style={{...styles.textBoldMd, color: textColor}}>{t('diameter')} {planetData.diameter}</Text>
          <Text style={{...styles.textBoldMd, color: textColor}}>{t('gravity')} {planetData.gravity}</Text>
          <Text style={{...styles.textBoldMd, color: textColor}}>{t('population')} {planetData.population}</Text>
          <Text style={{...styles.textBoldMd, color: textColor}}>{t('terrain')} {planetData.terrain}</Text>
        </View>
      </>
    );
  };

  return (
    <PlanetInfoView sections={planetInfoData}
                    keyExtractor={keyExtractor}
                    renderSectionHeader={renderSectionHeader}
                    listHeaderComponent={listHeaderComponent}
                    renderItem={renderItem}
                    bgColor={bgColor}/>
  )
};
