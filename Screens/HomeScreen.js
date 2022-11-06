import React, {useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Key to navigations in some components
import {Button} from 'react-native-paper';
import Map from './Map';
export default function HomeScreen() {
  const navigation = useNavigation(); // Key to navigations in some components

  useEffect(() => {
    console.log('render');
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
          onPress={() => navigation.navigate('Reservations')}>
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
