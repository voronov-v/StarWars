import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    transform: [
      {perspective: 300},
      {rotateX: '30deg'},
    ],
  },
  contentContainer: {
    paddingTop: 200,
    margin: 80,
    alignItems: 'center',
    paddingBottom: 200,
  },
  textStyle: {
    color: '#feda4a',
    fontSize: 23,
    lineHeight: 30,
    fontWeight: '800',
    textAlign: 'justify',
  },
});
