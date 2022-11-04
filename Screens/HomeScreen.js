import React, {useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Key to navigations in some components
import {Button} from 'react-native-paper';

export default function HomeScreen() {
  const navigation = useNavigation(); // Key to navigations in some components

  useEffect(() => {
    console.log('render');
  }, []);
  return (
    <View style={styles.main}>
      <View style={styles.mapView}></View>
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
    backgroundColor: 'black',
    height: '50%',
    width: '90%',
    marginTop: -65,
  },
});
