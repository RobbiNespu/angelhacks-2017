import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ListView,
    Alert,
    Button,
    Dimensions,
    AsyncStorage
} from 'react-native';
import FoodItemRestView from '../components/FoodItemRestView';
import styles from '../RestaurantViewStyles.js';
import axios from 'axios';


class RestaurantView extends React.Component {
    static navigationOptions = {
        title: 'RestaurantView'
    };

    constructor( props ) {
        super( props );
        this.state = {
            items: []
        }
    }

    deleteItem( item ) {
        axios.post( 'http://locolhost:3000/providers/' + this.props.navigation.state.params.id + "/delete-item",
            { itemId: item._id }
        );
    }

    addItem() {
        this.props.navigation.navigate( 'AddItem', {providerId: this.props.navigation.state.params.id} );
    }

    allAvailable() {
      console.log('making all products available');

    }

    componentWillMount() {
      console.log('PROVIDER ID 2', this.props.navigation.state.params.id);
        axios.get( 'http://localhost:3000/providers/' + this.props.navigation.state.params.id + '/items' )
            .then(( resp ) => {
              console.log("HERE FiRST", this.state);
                this.setState( { items: resp.data.provider.forSale }, () => {
                  console.log("HERE", this.state);
                })
            })
            .catch(( err ) => {
                console.log( 'error getting items from food provider', err );
            } );
    }
    render() {
        if (this.state.items.length === 0) {
          return (<View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontFamily: 'Avenir'}}>No Items :(</Text>
            <TouchableOpacity style={ styles.addButton } onPress={ this.addItem.bind( this ) }><Text>+</Text></TouchableOpacity>
          </View>)
        }
        return (
        <View style={ styles.infoContainer }>
          <TouchableOpacity style={ styles.availableAll } onPress={ this.allAvailable.bind( this ) }>
            <Text style={[ {color: 'white', fontFamily: 'Avenir'}]}>Make all available now</Text>
          </TouchableOpacity>
            { this.state.items.length !== 0 && this.state.items.map(( item, index ) => {
                return <FoodItemRestView
                    key={ index}
                    providerId={this.props.navigation.state.params.id}
                    itemId={item._id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    unit={item.unit}
                    admin={ true }
                    function={ this.deleteItem.bind( this ) }
                />
            })}
            <TouchableOpacity style={ styles.addButtonRest } onPress={ this.addItem.bind( this ) }>
              <Text style={{color: 'white', fontFamily: 'Avenir'}}>+</Text>
            </TouchableOpacity>
        </View>
        )
    }
}

export default RestaurantView;
