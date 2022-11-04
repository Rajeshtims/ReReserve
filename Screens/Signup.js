import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Key to navigations in some components
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';

export default function Signup() {
  const navigation = useNavigation(); // Key to navigations in some components
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [venmoID, setVenmoID] = useState();
  const [venmoPassword, setVenmoPassword] = useState();
  // Similiar to listeners:
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
  // Save the input locally:
  const saveLocalData = async () => {
    try {
      AsyncStorage.setItem(`email`, email);
      AsyncStorage.setItem(`password`, password);
      AsyncStorage.setItem(`venmo_id`, venmoID);
      AsyncStorage.setItem(`venmo_password`, venmoPassword);
    } catch (error) {
      console.log(error);
    }
    navigation.navigate('Home');
  };
  // Fetch local data:
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
    // Check if user already registed, if so... forward to home screen:
    if (isLoading) getLocalData();
  }, []);
  return (
    <View style={styles.main}>
      <View style={styles.inputContainer}>
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
      </View>
      <Button
        style={styles.registerButton}
        onPress={() => {
          saveLocalData();
        }}>
        <Text style={{color: 'white'}}>Register</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginTop: -155,
    padding: 10,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  registerButton: {
    width: 150,
    backgroundColor: 'blue',
    fontColor: 'black',
  },
});
