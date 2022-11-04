import React, {useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

export default function Sell() {
  const [restaurant, setRestaurant] = useState();
  const [price, setPrice] = useState();
  const [location, setLocation] = useState();
  const [time, setTime] = useState();
  const [venmoID, setVenmoID] = useState();
  const onChangeRestaurant = text => {
    setRestaurant(text);
  };
  const onChangePrice = text => {
    setPrice(text);
  };
  const onChangeLocation = text => {
    setLocation(text);
  };
  const onChangeTime = text => {
    setTime(text);
  };
  const onChangeVenmo = text => {
    setVenmoID(text);
  };
  const handleSend = async () => {
    await fetch('https://team13.egrep6021ad.repl.co/create/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        restaurant: restaurant,
        time_of_reservation: time,
      }),
    });
    console.log('Complete POST');
  };

  useEffect(() => {
    console.log(restaurant);
  });
  return (
    <View style={styles.main}>
      <TextInput
        style={styles.input}
        value={restaurant}
        placeholder="restaurant"
        onChangeText={text => onChangeRestaurant(text)}
      />
      <TextInput
        style={styles.input}
        value={location}
        placeholder="location"
        onChangeText={text => onChangeLocation(text)}
      />
      <TextInput
        style={styles.input}
        value={price}
        placeholder="price"
        onChangeText={text => onChangePrice(text)}
      />
      <TextInput
        style={styles.input}
        value={time}
        placeholder="time"
        onChangeText={text => onChangeTime(text)}
      />
      <TextInput
        style={styles.input}
        value={venmoID}
        placeholder="venmo ID"
        onChangeText={text => onChangeVenmo(text)}
      />

      <Button title="SELL" onPress={() => handleSend()} />
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
  input: {
    height: 40,
    width: '50%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
