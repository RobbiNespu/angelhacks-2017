import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Button,
  Dimensions
} from 'react-native';
import styles from '../addItemStyles.js';
import axios from 'axios';

const win = Dimensions.get('window');

class AddItems extends React.Component {
  static navigationOptions = {
    title: 'AddItems'
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      quantity: '',
      unit: '',
      price: '',
      description: '',
      store: ''
    }
  }

  componentDidMount() {
  }

  onPressCancel(e) {
    e.preventDefault();
    this.props.navigation.navigate('RestaurantView', {id: this.props.navigation.state.params.providerId});
  }

  onPressSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/providers/' + this.props.navigation.state.params.providerId + '/new-item', {
      name: this.state.name,
      quantity: this.state.quantity,
      unit: this.state.unit,
      price: this.state.price,
      description: this.state.description,
      store: this.props.navigation.state.params.providerId
    })
    .then((resp) => {
      console.log('RESP', resp.data.response);
      console.log('SUBMITTED');
      Alert.alert(
        'Added to your items',
        'Users will now be able to grab that item at a discounted price.',
        [{ text: 'Okay!', onPress: () => this.props.navigation.navigate('RestaurantView', {id: this.props.navigation.state.params.providerId}) }] // Button
      )
      
    })
    .catch((err) => {
      console.log('error posting items to food provider page', err);
    })
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.title}>Add as Items Up for Grabs</Text>
        <TextInput
        style={styles.inputField}
        onChangeText={(name) => this.setState({name})}
        placeholder="Item name"
        value={this.state.name}
        />
        <TextInput
        style={styles.inputField}
        onChangeText={(quantity) => this.setState({quantity})}
        placeholder="Quantity"
        value={this.state.quantity}
        />
        <TextInput
        style={styles.inputField}
        onChangeText={(unit) => this.setState({unit})}
        placeholder="Unit"
        value={this.state.unit}
        />
        <TextInput
        style={styles.inputField}
        onChangeText={(price) => this.setState({price})}
        placeholder="Price per unit"
        value={this.state.price}
        />
        <TextInput
        style={styles.inputField}
        onChangeText={(description) => this.setState({description})}
        placeholder="Item description"
        value={this.state.description}
        />
        <TouchableOpacity onPress={(e) => this.onPressCancel(e)}>
        <View
        style={styles.button}
        ><Text>Cancel</Text></View>
        </TouchableOpacity>
        <TouchableOpacity onPress={(e) => this.onPressSubmit(e)}>
        <View
          style={styles.buttonOrange}
          title="Submit"
          color="#841584"
        ><Text>Submit</Text></View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default AddItems;
