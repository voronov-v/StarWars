import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    transform: [
      {perspective: 400},
      {rotateX: '30deg'},
    ],
  },
  contentContainer: {
    paddingTop: 200,
    margin: 80,
    alignItems: 'center',
    paddingBottom: 170,
  },
  textStyle: {
    color: '#feda4a',
    fontSize: 23,
    lineHeight: 30,
    fontWeight: '800',
    textAlign: 'justify',
  },
});
