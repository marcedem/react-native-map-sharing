import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import FetchLocation from './components/fetchLocation';
import UsersMap from './components/UsersMap';

export default class App extends React.Component {
  state = {
    userLocation: null,
    usersPlaces: []
  }

  getUserLocationHandler = () => {
    navigator
      .geolocation
      .getCurrentPosition(position => {
        console.log(position);
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0421
          }
        });

        fetch('https://react-native-map-1515597452763.firebaseio.com/mapLocations.json', {
            method: 'POST',
            body: JSON.stringify({latitude: position.coords.latitude, longitude: position.coords.longitude})
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
      }, err => {
        console.log(err)
      }, {
        enableHighAccuracy: true,
        timeout: 7000,
        maximumAge: 10000
      });
  }

  getUsersPlacesHandler = () => {
    fetch('https://react-native-map-1515597452763.firebaseio.com/mapLocations.json')
      .then(res => res.json())
      .then(parsedRes => {
        const placesArray = [];
        for (const key in parsedRes) {
          placesArray.push({latitude: parsedRes[key].latitude, longitude: parsedRes[key].longitude, id: key});
        }
        this.setState({usersPlaces: placesArray});
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{
          marginBottom: 20
        }}>
          <Button title="Get user places" onPress={this.getUsersPlacesHandler}/>
        </View>
        <FetchLocation onGetLocation={this.getUserLocationHandler}/>
        <UsersMap
          userLocation={this.state.userLocation}
          usersPlaces={this.state.usersPlaces}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
