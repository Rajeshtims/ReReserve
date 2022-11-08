import React, {useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Key to navigations in some components
import {Button} from 'react-native-paper';
import Map from './Map';
export default function HomeScreen() {
  const navigation = useNavigation(); // Key to navigations in some components
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
    if (isLoading) {
      fetchData();
      setIsLoading(false);
    }
    console.log('Home Screen:');
  }, []);
  return (
    <View style={styles.main}>
      <View style={styles.mapView}>
        <Map />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.sellButton}
          onPress={() => navigation.navigate('Sell')}>
          <Text style={{color: 'white'}}>Sell Reservation</Text>
        </Button>
        <Button
          style={styles.sellButton}
          onPress={() =>
            navigation.navigate('Reservations', {
              allRestaurants: data,
            })
          }>
          <Text style={{color: 'white'}}>Buy Reservation</Text>
        </Button>
      </View>
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
