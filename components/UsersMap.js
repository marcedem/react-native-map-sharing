import React from 'react';
import { StyleSheet, View, processColor } from 'react-native';
import MapView from 'react-native-maps';


const usersMap = props => {
	let userLocationMarker = null;
	if(props.userLocation){
		userLocationMarker = 	<MapView.Marker coordinate={props.userLocation} />;
	}

	// creating as many markers as places recorded in our databases
	const usersMarkers = props.usersPlaces.map(userPlace => <MapView.Marker coordinate={userPlace} key={userPlace.id} />);

	return (
			<View style={styles.mapContainer}>
					<MapView
						initialRegion={{
							latitude: 48.210033,
							longitude: 16.363449,
							latitudeDelta: 0.0322,
							longitudeDelta: 0.0421,
						}}
						region={props.userLocation}
						style={styles.map}>
						{userLocationMarker}
						{usersMarkers}
					</MapView>
			</View>
	);

}

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: 200,
        marginTop: 20
    },
    map: {
        width: '100%',
        height: '100%'
    }
});

export default usersMap;