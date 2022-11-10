import React, {useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Key to navigations in some components
import {Button} from 'react-native-paper';
import Map from './Map';
// https://github.com/Agontuk/react-native-geolocation-service
import Geolocation from 'react-native-geolocation-service';

export default function HomeScreen({route}) {
  const navigation = useNavigation();
  // Flag for when the screen is loaded:
  const [isLoading, setIsLoading] = useState(true);
  // State variable to hold the remote database's data:
  const [data, setData] = useState();
  const [restrauntCoords, setRestaurantCoords] = useState([]);
  const [location, setLocation] = useState(null);

  // Function to query remote server / DB:
  const fetchData = async () => {
    console.log('Fetching...');
    try {
      // Get the users current location:
      Geolocation.getCurrentPosition(
        position => {
          console.log('\tLongitude: ' + position.coords.longitude);
          console.log('\tLatitude: ' + position.coords.latitude);
          setLocation(position);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
      // Query all of the restuarants:
      const response = await fetch('https://team13.egrep6021ad.repl.co/fetch/');
      const res = await response.json();
      // Store the array of restaurant objects to state variable:
      setData(res);
      console.log('Reservations in database:');
      console.log(res);
      // Store all of the coordinates from the restaurants in an array for map markers:
      let temp = [];
      for (let i = 0; i < res.length; i++) {
        temp.push(JSON.parse(res[i].coordinates));
      }
      setRestaurantCoords(temp);
    } catch (error) {
      console.error(error);
    }
  };

  // When screen loads:
  useEffect(() => {
    if (isLoading) {
      fetchData();
      setIsLoading(false);
    }
    console.log('Home Screen:');
  }, [location]);
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.mapView}>
        {restrauntCoords.length == 0 || location == null ? null : (
          <Map
            // Pass in the names of all the restaurants
            restaurants={data}
            // Pass array of coordinates to dipsplay map markers:
            markers={restrauntCoords}
            // Pass the current location into the map:
            currentLocation={location}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.sellButton}
          onPress={() =>
            navigation.navigate('Reservations', {
              allRestaurants: data,
              markers: restrauntCoords,
            })
          }>
          <Text style={{color: 'black', fontWeight: '400', fontSize: 20}}>
            Buy Reservation
          </Text>
        </Button>
        <Button
          style={styles.sellButton}
          onPress={() => {
            navigation.navigate('Sell');
          }}>
          <Text style={{color: 'black', fontWeight: '400', fontSize: 20}}>
            Sell Reservation
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#7BDCB5',
    marginTop: '10%',
    height: '90%',
  },
  buttonContainer: {
    marginTop: '10%',
  },
  sellButton: {
    alignSelf: 'center',
    width: Platform.OS == 'ios' ? 300 : '80%',
    height: Platform.OS == 'ios' ? 50 : null,
    backgroundColor: '#FF8A65',
    marginTop: '10%',
    display: 'flex',
    justifyContent: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  mapView: {
    marginTop: '-2%',
    height: 400,
    width: 400,
    backgroundColor: 'black',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});

/*
           // For every restaurant, get grid coordinate:
      let temp = [];
 
      // Put all the coordinates for restaurants into state array:
      setRestaurantCoords(temp);
      for (let i = 0; i < res.length; i++) {
        await Geocoder.from(res[i].adress)
          .then(json => {
            var location = json.results[0].geometry.location;
            let latLng = {
              latitude: location.lat,
              longitude: location.lng,
            };
            temp.push(latLng);
          })
          .catch(error => console.warn(error));
      }*/
