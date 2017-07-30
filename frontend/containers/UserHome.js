import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	ListView,
	Image,
	Button,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import SearchBar from 'react-native-searchbar'
import styles from '../homeStyles.js';
import axios from 'axios';

const items = [
1337,
'janeway',
[ 4, 2, 'tree' ],
];

class RestaurantPreview extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      		foodProviders: []
    	}
	}

	componentWillMount(){
	var self = this;
		console.log('POOPIE')
		axios.get('http://localhost:3000/providers')
		.then(resp => {
			console.log('priyasarkar')
			if(resp.data.success){
				console.log('RESP w providers', resp.data.providers)
				this.setState({foodProviders: resp.data.providers}, () => {
					console.log("SUCCESS", this.state.foodProviders)
				});
				console.log(this.state.foodProviders)
			}

		})
		.catch(err => {
			console.log('priyasarkarerr')
			console.log('ERR', err)
		})
	}

	render() {
		if (this.state.foodProviders.length === 0) {
			return (
				<Text>Loading...</Text>
			)
		}
		else{
		return (
			<ScrollView>
			<Text style={[styles.welcome, {fontFamily: 'Avenir'}]}>Welcome {this.props.navigation.state.params.firstName} :)</Text>
			<TouchableOpacity onPress={() => this.props.navigation.navigate('Map')} ><View style={styles.button}><Text>View Map</Text></View></TouchableOpacity>
			<TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfile', {user: this.props.navigation.state.params.user})}>
				<View style={styles.buttonRed}><Text style={{fontFamily: 'Avenir'}}>{this.props.navigation.state.params.firstName}'s profile </Text></View>
			</TouchableOpacity>
       {this.state.foodProviders && this.state.foodProviders.map((provider, index) => {
         return <View key={index} style={styles.container}>
									<View style={styles.restaurant}>
										<Image
											style={styles.image}
											source={{uri: provider.imgURL}}
										/>
										<TouchableOpacity style={styles.infoContainer} onPress={() => this.props.navigation.navigate('FoodView', {providerId: provider._id, userId: this.props.navigation.state.params.userId})}>
											<View style={styles.restContainer}>
												<Text style={[styles.title, {fontFamily: 'Avenir'}]}>{provider.name}</Text>
												<Text style={[styles.description, {fontFamily: 'Avenir'}]}>{provider.type}</Text>
												<Text style={[styles.address, {fontFamily: 'Avenir'}]}>{provider.location}</Text>
											</View>
										</TouchableOpacity>
										<Text> Available from: {provider.intervalAvailable[0] ?  provider.intervalAvailable[0]: "2017-07-30 15:00:00"} until {provider.intervalAvailable[1] ? provider.intervalAvailable[1] : "2017-07-30 17:00:00"}</Text>

									</View>
				</View>
       })}
			</ScrollView>
			)
	}
	}
}

export default RestaurantPreview;
