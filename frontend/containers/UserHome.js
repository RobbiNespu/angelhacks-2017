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
	static navigationOptions = {
    title: 'Restaurants'
  };
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
				this.setState({foodProviders: resp.data.providers});
			}

		})
		.catch(err => {
			console.log('priyasarkarerr')
			console.log('ERR', err)
		})
	}

	render() {
		return (
			<ScrollView>
			<Button title="View Map" onPress={() => this.props.navigation.navigate('Map')} />
			<Text style={[styles.welcome, {fontFamily: 'Avenir'}]}>Welcome {this.props.navigation.state.params.firstName} :)</Text>
			<TouchableOpacity onPress={() => this.props.navigation.navigate('UserProfile', {user: this.props.navigation.state.params.user})}>
				<Text style={{fontFamily: 'Avenir'}}>{this.props.navigation.state.params.firstName}'s profile </Text>
			</TouchableOpacity>
       {this.state.foodProviders && this.state.foodProviders.map((provider, index) => {
         return <View key={index} style={styles.container}>
									<View style={styles.restaurant}>
										<Image
											style={styles.image}
											source={{uri: provider.imgURL}}
										/>
										<TouchableOpacity style={styles.infoContainer} onPress={() => this.props.navigation.navigate('FoodView', {providerId: provider._id})}>
											<View style={styles.restContainer}>
												<Text style={[styles.title, {fontFamily: 'Avenir'}]}>{provider.name}</Text>
												<Text style={[styles.description, {fontFamily: 'Avenir'}]}>{provider.type}</Text>
												<Text style={[styles.address, {fontFamily: 'Avenir'}]}>{provider.location}</Text>
											</View>
										</TouchableOpacity>
									</View>
						<Text> Available from: {provider.availableInterval[0].start} until {provider.availableInterval[1].end}</Text>
				</View>
       })}
			</ScrollView>
			)
	}
}

export default RestaurantPreview;
