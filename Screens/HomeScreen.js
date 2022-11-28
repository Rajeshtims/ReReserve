import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native'; // Key to navigations in some components
import {Button} from 'react-native-paper';
import Map from './Map';
// https://github.com/Agontuk/react-native-geolocation-service
import Geolocation from 'react-native-geolocation-service';

//https://unsplash.com/photos/nf5xNohfFkk
const image = {
  uri: 'https://images.unsplash.com/photo-1661699627895-407d542b78d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
};
export default function HomeScreen({route}) {
  const navigation = useNavigation();
  // Flag for when the screen is loaded:
  const [isLoading, setIsLoading] = useState(true);
  // State variable to hold the remote database's data:
  const [data, setData] = useState();
  const [restrauntCoords, setRestaurantCoords] = useState([]);
  const [location, setLocation] = useState(null);
  const isFocused = useIsFocused();
  const setIsLoadingPropFunction = async arg => {
    setIsLoading(arg);
  };

  // Function to query remote server / DB:
  const fetchData = async () => {
    console.log('Fetching...');
    try {
      // Get the users current location:
      await Geolocation.getCurrentPosition(
        position => {
          console.log('[USER LOCATION]');
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
      // Store all of the coordinates from the restaurants in an array for map markers:
      let temp = [];
      for (let i = 0; i < res.length; i++) {
        temp.push(JSON.parse(res[i].coordinates));
      }
      setRestaurantCoords(temp);
      console.log('[RESERVATION DATA DELIVERED FROM SERVER]');
    } catch (error) {
      console.error(error);
    }
  };

  // When screen loads:
  useEffect(() => {
    console.log('[RENDER::] Home Screen:');
    if (isLoading) {
      fetchData();
      setIsLoading(false);
    }
    return () => {
      console.log('[SCREEN NOT IN FOCUS::]');
      !isFocused ? fetchData() : null;
    };
  }, [isFocused]);
  return (
    <ImageBackground
      source={image}
      style={styles.main}
      imageStyle={{opacity: 0.4}}>
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
          style={styles.buyButton}
          onPress={() =>
            navigation.navigate('Reservations', {
              allRestaurants: data,
              markers: restrauntCoords,
              venmo_id: route.params.venmo_id,
            })
          }>
          <Text style={{color: 'black', fontWeight: '500', fontSize: 22}}>
            Buy Reservation
          </Text>
        </Button>
        <Button
          style={styles.sellButton}
          onPress={() => {
            navigation.navigate("Sell Reservation's", {
              coordinates: location,
              venmo_id: route.params.venmo_id,
            });
          }}>
          <Text style={{color: 'black', fontWeight: '500', fontSize: 22}}>
            Sell Reservation
          </Text>
        </Button>
        <Button
          style={styles.settingsButton}
          onPress={() => {
            navigation.navigate('Setting');
          }}>
          <Text style={{color: 'black', fontWeight: '500', fontSize: 22}}>
            Settings
          </Text>
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#D9E3F0',
    marginTop: '12%',
    height: '100%',
  },
  buttonContainer: {
    marginTop: '10%',
  },
  buyButton: {
    alignSelf: 'center',
    width: Platform.OS == 'ios' ? 300 : 200,
    height: Platform.OS == 'ios' ? 50 : null,
    backgroundColor: '#4091BF',

    display: 'flex',
    justifyContent: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  sellButton: {
    alignSelf: 'center',
    width: Platform.OS == 'ios' ? 300 : 200,
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
  settingsButton: {
    alignSelf: 'center',
    width: Platform.OS == 'ios' ? 300 : 200,
    height: Platform.OS == 'ios' ? 50 : null,
    backgroundColor: '#C1E1C5',
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
    height: '50%',
    width: '100%',
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
