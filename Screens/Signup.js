// https://reactjs.org/docs/hooks-effect.html
import React, {useEffect, useState} from 'react';
// https://reactnative.dev/docs/components-and-apis
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
// https://reactnativepaper.com/
import {Button} from 'react-native-paper';
// https://reactnavigation.org/docs/getting-started
import {useNavigation} from '@react-navigation/native';
// https://github.com/react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// https://github.com/Agontuk/react-native-geolocation-service
import Geolocation from 'react-native-geolocation-service';

export default function Signup() {
  // Key to navigation:
  const navigation = useNavigation();
  // Init. state variables:
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [venmoID, setVenmoID] = useState();
  const [venmoPassword, setVenmoPassword] = useState();
  const [location, setLocation] = useState(null);
  const [storedEmail, setStoredEmail] = useState(null);

  // Function to get user's current Android location:
  const requestAndroidLocation = async () => {
    try {
      let access = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
    } catch (err) {
      console.log(err);
    }
  };
  // Function to get user's current iPhone location:
  const requestIphoneLocation = async () => {
    const access = await Geolocation.requestAuthorization('always').then(
      res => {
        console.log(res);
      },
    );
  };

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
  // Save the input local DB:
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
  // Fetch local data from local DB:
  const getLocalData = async () => {
    try {
      const email = await AsyncStorage.getItem(`email`);
      setStoredEmail(email);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // Get location permission, and previously stored data:
    if (isLoading) {
      if (Platform.OS == 'ios') requestIphoneLocation();
      if (Platform.OS == 'android') requestAndroidLocation();
      getLocalData();
    }
    // Check if user already registered, if so... forward to home screen:
    if (storedEmail != null)
      navigation.navigate('Home', {
        location: location,
      });
  }, [location, storedEmail]); // Reload component if these vars change
  return (
    <View style={styles.main}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email: "
          placeholderTextColor={'#455A64'}
          onChangeText={text => onChangeEmail(text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          placeholder="Password: "
          placeholderTextColor={'#455A64'}
          onChangeText={text => onChangePassword(text)}
        />
        <TextInput
          style={styles.input}
          value={venmoID}
          placeholder="Venmo ID: "
          placeholderTextColor={'#455A64'}
          onChangeText={text => onChangeVenmoID(text)}
        />
        <TextInput
          style={styles.input}
          value={venmoPassword}
          placeholder="Venmo Password: "
          placeholderTextColor={'#455A64'}
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
// Styles to use throughout the component:
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
