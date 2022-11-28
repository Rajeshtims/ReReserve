import React, {useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
// Re-usable component to display the map
export default function Map(props) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // When the map initially loads, fetch data:
    console.log('[RENDER::] Map');
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    return () => {
      console.log('[UNMOUNTING::] Map');
    };
  }, []);
  return (
    <View style={isLoading ? styles.activityContainer : styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <MapView
          style={styles.map}
          showsUserLocation={true}
          initialRegion={{
            latitude: props.currentLocation.coords.latitude,
            longitude: props.currentLocation.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {props.markers.length > 0 && props.restaurants.length > 0
            ? props.markers.map((el, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: el.latitude,
                    longitude: el.longitude,
                  }}
                  title={
                    props.restaurants[index]
                      ? props.restaurants[index].restaurant
                      : null
                  }
                  description={
                    props.restaurants[index]
                      ? props.restaurants[index].adress
                      : null
                  }
                />
              ))
            : null}
        </MapView>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  activityContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
