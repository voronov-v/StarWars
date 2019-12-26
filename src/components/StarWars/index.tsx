import React, {useEffect, useRef} from 'react';
import {ScrollView, View, Image, Text} from 'react-native';
import {useState} from "react";
import {styles} from "@root/components/StarWars/styles";

export const StarWars = (props: any) => {
  const {content, contentStyle, episode, title, titleStyle} = props;
  const [start, setStart] = useState(0);
  const [scrollInterval, setScrollInterval] = useState(0);
  const scrollView = useRef(null);

  useEffect((): any => {
    const activeInterval: any = setInterval(scrolling, 10);
    setScrollInterval(activeInterval);
    return () => {
      clearInterval(scrollInterval);
      setScrollInterval(0);
    }
  }, [start]);

  const scrolling = () => {
    //@ts-ignore
    scrollView.current && scrollView.current.scrollTo({x: 0, y: start, animated: true});
    setStart(prevState => prevState + 3)
  };

  const onScrollFunc = ({nativeEvent}: any) => {
    //@ts-ignore
    const {contentOffset, contentSize} = nativeEvent;
    console.log('contentSize.height', contentSize.height/2+100);
    console.log('contentOffset.y', contentOffset.y);

    if (start > contentSize.height/2+100) {
      // console.log('time to stop');
      clearInterval(scrollInterval);
      setScrollInterval(0);
    }

  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}} onLayout={({nativeEvent}) => {
      console.log('View layout nativeEvent.layout', nativeEvent.layout);
    }}>
      <Image style={{position: 'absolute', width: '100%', height: '30%'}} source={require('./transform.png')}/>
      <ScrollView style={styles.container}
                  scrollEventThrottle={16}
                  pagingEnabled={true}
                  contentContainerStyle={styles.contentContainer}
                  scrollEnabled={scrollInterval === 0}
                  onScroll={(event) => onScrollFunc(event)}
                  ref={scrollView}>
        <Text style={[styles.textStyle, {fontSize: 32, paddingBottom: 10}, titleStyle]}>Episode {episode}</Text>
        <Text style={[styles.textStyle, {fontSize: 32, paddingBottom: 40}, titleStyle]}>{title}</Text>
        <Text style={[styles.textStyle, contentStyle]}>{content}</Text>
      </ScrollView>
    </View>
  );
};
