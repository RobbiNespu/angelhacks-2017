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
  AsyncStorage,
  ActivityIndicator,
  Image
} from 'react-native';
import axios from 'axios';
import styles from '../formStyles.js';


class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login'
    };
    constructor( props ) {
        super( props );
        this.state = {
            username: "",
            password: ""
        }
    }
    loginUser( username, password ) {
        console.log("USR", username);
        console.log("USR", password);

        axios.post( 'http://localhost:3000/login', {
            username: this.state.username,
            password: this.state.password
        } )
        .then( response => {
            console.log("RESPONSE", response);
            if (! response.data.firstName) {
                console.log("SUCCESS");
                this.props.navigation.navigate('RestaurantView', {name: response.data.name, id: response.data.providerId});
            }
            else {
                this.props.navigation.navigate('Home', {firstName: response.data.firstName, lastName: response.data.lastName, userId: response.data.userId, user: response.data.user} );
            }
        } )
        .catch( err => {
            Alert.alert(
                'Invalid Login',
                'Your username or password is incorrect. Register or try again',
                [{ text: 'Dismiss Button' }] // Button
            )
            console.log(err);
        } );
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../img/logo.png')} style={styles.image}/>
                <TextInput
                    style={styles.textInput}
                    placeholder="Enter your username"
                    onChangeText={ ( text ) => this.setState( { username: text } ) }
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={ true }
                    placeholder="Enter your password"
                    onChangeText={ ( text ) => this.setState( { password: text } ) }
                />
                <TouchableOpacity style={styles.button} onPress={ () => this.loginUser( this.state.username, this.state.password ) }>
                    <Text style={[styles.buttonLabel, {fontFamily: 'Avenir'}]}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonOrange} onPress={ () => this.props.navigation.navigate( 'Register', { admin: false } ) }>
                    <Text style={[styles.buttonLabel, {fontFamily: 'Avenir'}]}>Register User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRed} onPress={ () => this.props.navigation.navigate( 'Register', { admin: true } ) }>
                    <Text style={[styles.buttonLabel, {fontFamily: 'Avenir'}]}>Register Restaurant</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default LoginScreen;
