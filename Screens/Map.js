import React, {useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {View, Text, StyleSheet, Platform} from 'react-native';
// Re-usable component to display the map
export default function Map(props) {
  useEffect(() => {
    // When the map initially loads, fetch data:
    console.log('Map:');
    console.log('Restaurants to mark:');
    console.log(props.restaurants);
    console.log('Marker locations:');
    console.log(props.markers);
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: props.currentLocation.coords.latitude,
          longitude: props.currentLocation.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {props.markers.map((el, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: el.latitude,
              longitude: el.longitude,
            }}
            title={props.restaurants[index].restaurant}
            description={props.restaurants[index].adress}
          />
        ))}
      </MapView>
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
