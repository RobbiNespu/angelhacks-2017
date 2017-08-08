import { Dimensions, StyleSheet } from 'react-native';

const win = Dimensions.get('window');
const styles = StyleSheet.create({
  foodView: {
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    width: win.width,
    alignItems: 'center'
  },
  providerTitle: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'white',
    width: win.width,
    padding: 15,
    color: '#0C3029'
  },
  foodItem: {
    width: win.width,
    height: 140,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F2F876',
    backgroundColor: '#FFFFFF'
  },
  foodInfo: {
    width: win.width,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#FFFFFF',
    marginTop: 10
  },
  item: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0E564C'
  },
  quantity: {
    fontSize: 15
  },
  price: {
    fontSize: 17
  },
  addButton: {
    backgroundColor: '#1FAF9A',
    display: 'inline-block',
    padding: 10,
  },
  addButtonText: {
    color: 'white'
  }
})

export default styles;