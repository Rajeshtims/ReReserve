import React, {useRef, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Key to navigations in some components
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signup() {
  const navigation = useNavigation(); // Key to navigations in some components
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [venmoID, setVenmoID] = useState();
  const [venmoPassword, setVenmoPassword] = useState();

  const onChangeEmail = text => {
    setEmail(text);
  };
  const onChangePassword = text => {
    setPassword(text);
  };
  const onChangeVenmoID = text => {
    setVenmoID(text);
  };
  const onChangeVenmoPassword = text => {
    setVenmoPassword(text);
  };

  const saveLocalData = async () => {
    try {
      AsyncStorage.setItem(`email`, email);
      AsyncStorage.setItem(`password`, password);
      AsyncStorage.setItem(`venmo_id`, venmoID);
      AsyncStorage.setItem(`venmo_password`, venmoPassword);
    } catch (error) {
      console.log(error);
    }
  };
  const getLocalData = async () => {
    try {
      const email = await AsyncStorage.getItem(`email`);
      if (email != null) navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (isLoading) getLocalData();
  }, []);
  return (
    <View style={styles.main}>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Email: "
        onChangeText={text => onChangeEmail(text)}
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Password: "
        onChangeText={text => onChangePassword(text)}
      />
      <TextInput
        style={styles.input}
        value={venmoID}
        placeholder="Venmo ID: "
        onChangeText={text => onChangeVenmoID(text)}
      />
      <TextInput
        style={styles.input}
        value={venmoPassword}
        placeholder="Venmo Password: "
        onChangeText={text => onChangeVenmoPassword(text)}
      />

      <Button
        title="Signup!"
        onPress={() => {
          saveLocalData();
          console.log(email, password, venmoID, venmoPassword);
        }}
      />
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
