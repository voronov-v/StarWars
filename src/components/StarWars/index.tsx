import React, {useEffect, useRef} from 'react';
import {ScrollView, View, Image, Text} from 'react-native';
import {useState} from "react";
import {styles} from "@root/components/StarWars/styles";

export const StarWars = (props: any) => {
  const {content, contentStyle, episode, title, titleStyle} = props;
  const [start, setStart] = useState(0);
  const scrollView = useRef(null);

  useEffect((): any => {
    const activeInterval = setInterval(scrolling, 100);
    return () => {
      clearInterval(activeInterval);
    }
  }, [start]);

  const scrolling = () => {
    //@ts-ignore
    scrollView.current && scrollView.current.scrollTo({x: 0, y: start, animated: true});
    setStart(prevState => prevState + 3)
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flex: 1, backgroundColor: 'black'}}>
        <Image style={{position: 'absolute', width: '100%', height: '30%'}}
               source={require('./transform.png')}/>
        <ScrollView style={styles.container}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.contentContainer}
                    scrollEnabled={false}
                    ref={scrollView}>
          <Text style={[styles.textStyle, {fontSize: 32, paddingBottom: 10}, titleStyle]}>Episode {episode}</Text>
          <Text style={[styles.textStyle, {fontSize: 32, paddingBottom: 40}, titleStyle]}>{title}</Text>
          <Text style={[styles.textStyle, contentStyle]}>{content}</Text>
        </ScrollView>
      </View>
    </View>
  );
};
