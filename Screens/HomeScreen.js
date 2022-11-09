import React, {useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform, SafeAreaView} from 'react-native';
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
    <SafeAreaView style={styles.main}>
      <View style={styles.mapView}>
        <Map />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.sellButton}
          onPress={() => navigation.navigate('Sell')}>
          <Text style={{color: 'black', fontWeight: '400', fontSize: 20}}>
            Sell Reservation
          </Text>
        </Button>
        <Button
          style={styles.sellButton}
          onPress={() =>
            navigation.navigate('Reservations', {
              allRestaurants: data,
            })
          }>
          <Text style={{color: 'black', fontWeight: '400', fontSize: 20}}>
            Buy Reservation
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
