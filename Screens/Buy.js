import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Key to navigations in some components
import {Button} from 'react-native-paper';
import Map from './Map';

export default function Buy({route}) {
  const navigation = useNavigation(); // Key to navigations in some components
  const [initialRegion, setInitialRegion] = useState({
    coords: {
      latitude: route.params.coordinate.latitude,
      longitude: route.params.coordinate.longitude,
    },
  });
  const [marker, setMarker] = useState({
    latitude: route.params.coordinate.latitude,
    longitude: route.params.coordinate.longitude,
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log('Buy Screen: ');
    console.log(route.params.reservationTimes);
    setIsLoading(false);
  }, []);
  return (
    <View style={styles.main}>
      <View style={styles.mapView}>
        <Map
          currentLocation={initialRegion}
          // Map component accepts an array:
          markers={[marker]}
          // Map component accepts an array:
          restaurants={[route.params.restaurant]}
        />
      </View>
      <Button
        onPress={() => {
          navigation.navigate('PurchaseOverview');
        }}>
        <Text>Purchase</Text>
      </Button>
      <View style={styles.buttonContainer}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: '10%',
  },
  sellButton: {
    alignSelf: 'center',
    width: Platform.OS == 'ios' ? '110%' : '80%',
    backgroundColor: 'blue',
    fontColor: 'black',
    marginTop: '5%',
  },
  mapView: {
    marginTop: -90,
    marginBottom: 10,
    height: 400,
    width: 400,
    backgroundColor: 'black',
  },
});
