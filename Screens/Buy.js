import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
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
    console.log(route.params.headCounts);
    console.log(route.params.ids);
    console.log(route.params.prices);
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
      <ScrollView style={styles.buttonContainer}>
        {route.params.reservationTimes.map((el, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() =>
              navigation.navigate('Purchase Details', {
                restaurantName: route.params.restaurant,
                tableSize: route.params.headCounts[index],
                price: route.params.prices[index],
                id: route.params.ids[index],
                time: el,
                date: route.params.dates[index],
                venmo_id: route.params.venmo_id,
              })
            }>
            <Text style={{color: 'black'}}>{el}</Text>
            <Text style={{color: 'black'}}>
              Table size: {route.params.headCounts[index]}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#FCEEC3',
  },
  sellButton: {
    alignSelf: 'center',
    width: Platform.OS == 'ios' ? '110%' : '80%',
    backgroundColor: 'blue',
    fontColor: 'black',
    marginTop: '5%',
  },
  mapView: {
    position: 'relative',
    width: Platform.OS == 'ios' ? 300 : 200,
    height: Platform.OS == 'ios' ? 50 : null,
    height: 400,
    width: 400,
    backgroundColor: 'black',
  },
  buttonContainer: {
    marginTop: '5%',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#FDD5C6',
    alignSelf: 'center',
    marginHorizontal: '2%',
    marginTop: '2%',
    marginBottom: 10,
    minWidth: '90%',
    display: 'flex',
    alignItems: 'center',
  },
});
