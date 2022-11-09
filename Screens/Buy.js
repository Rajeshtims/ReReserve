import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Key to navigations in some components
import {Button} from 'react-native-paper';
import Map from './Map';

export default function Buy({route}) {
  const navigation = useNavigation(); // Key to navigations in some components

  useEffect(() => {
    console.log('Buy Screen: ');
    console.log(route.params.allRestaurants);
  }, []);
  return (
    <View style={styles.main}>
      <View style={styles.mapView}>
        <Map />
      </View>
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
