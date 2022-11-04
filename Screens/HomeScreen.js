import React, {useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Key to navigations in some components

export default function HomeScreen() {
  const navigation = useNavigation(); // Key to navigations in some components

  useEffect(() => {
    console.log('render');
  }, []);
  return (
    <View style={styles.main}>
      <Button title="sell" onPress={() => navigation.navigate('Sell')} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: '100%',
    width: '100%',
    backgroundColor: 'yellow',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
