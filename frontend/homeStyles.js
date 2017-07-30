import { Dimensions, StyleSheet } from 'react-native';

const win = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  infoContainer: {
    backgroundColor: 'white',
    opacity: 0.9,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  image: {
    width: win.width,
    height: 250,
    position: 'absolute'
  },
  restaurant: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
    height: 250
  },
  button: {
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    width: win.width,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10,
    marginLeft: 0,
    backgroundColor: '#FFFFAC'
  },
  buttonOrange: {
      display: 'flex',
      alignItems: 'center',
      width: win.width,
      paddingTop: 15,
      paddingBottom: 15,
      marginTop: 10,
      backgroundColor: '#FEB971'
  },
  buttonRed: {
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      width: win.width,
      paddingTop: 15,
      paddingBottom: 15,
      marginTop: 10,
      backgroundColor: '#CBFF85'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 20,
    color: '#0C2F28',
    fontWeight: 'bold'
  },
  title: {
    fontSize: 25,
    width: win.width,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  address: {
    fontSize: 15,
    marginBottom: 5
  },
  welcome: {
    backgroundColor: 'white',
    width: win.width,
    fontSize: 30,
    padding: 10,
    width: win.width,
    color: '#11493E',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default styles;
