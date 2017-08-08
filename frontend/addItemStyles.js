import { Dimensions, StyleSheet } from 'react-native';

const win = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    //fontFamily: 'Avenir',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: '#1FAF9A'
  },
  inputField: {
    height: 60,
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold'
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
  buttonLabel: {
    textAlign: 'center',
    fontSize: 20,
    color: '#0C2F28',
    fontWeight: 'bold'
  }
})

export default styles;