import React, {useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import {View, Text, StyleSheet, Platform} from 'react-native';
// Re-usable component to display the map
export default function Map() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Query the "restaurants" database from backend server:
  const fetchData = async () => {
    console.log('Fetching...');
    try {
      const response = await fetch('https://team13.egrep6021ad.repl.co/fetch/');
      const json = await response.json();
      // Store the array of restaurant objects to state variable:
      setData(json);
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    // When the map initially loads, fetch data:
    if (isLoading) {
      fetchData();
      setIsLoading(false);
    }
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
