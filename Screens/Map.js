import React, {useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import {View, Text, StyleSheet, Platform} from 'react-native';
// Re-usable component to display the map
export default function Map(props) {
  //const [data, setData] = useState();
  //const [isLoading, setIsLoading] = useState(true);
  //const setAllRestaurants() = useState(props.setAllRestaurants);
  // Query the "restaurants" database from backend server:

  useEffect(() => {
    // When the map initially loads, fetch data:
    console.log('loaded map:');
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        //liteMode={true}
        initialRegion={{
          latitude: 33.75272,
          longitude: -84.38649,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
