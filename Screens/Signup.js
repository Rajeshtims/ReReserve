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
  Alert,
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
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [venmoID, setVenmoID] = useState();
  const [venmoPassword, setVenmoPassword] = useState();

  const [storedEmail, setStoredEmail] = useState(null);
  const [storedVenmoID, setStoredVenmoID] = useState(null);

  // Function to get user's current Android location:
  const requestAndroidLocation = async () => {
    try {
      let access = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location for posting reservations?',
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
    try {
      const access = await Geolocation.requestAuthorization('always').then(
        res => {
          console.log('[LOCATION PERMISSION]' + res);
        },
      );
    } catch (e) {
      console.log(e);
    }
  };

  // Similiar to listeners:
  const onChangeFirstName = text => {
    setFirstName(text);
  };
  const onChangeLastName = text => {
    setLastName(text);
  };
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
    // Make sure none of the fields are left blank:
    if (firstName == null)
      return Alert.alert('You need to enter your first name!');
    if (lastName == null)
      return Alert.alert('You need to enter your last name!');
    if (email == null) return Alert.alert('You need to enter a valid email!');
    if (password == null)
      return Alert.alert('You need to enter a valid password!');
    if (venmoID == null)
      return Alert.alert('You need to enter a valid venmo ID!');
    if (venmoPassword == null)
      return Alert.alert('You need to enter a valid venmo password!');
    // Save the data locally:
    try {
      AsyncStorage.setItem(`email`, email);
      AsyncStorage.setItem(`password`, password);
      AsyncStorage.setItem(`venmo_id`, venmoID);
      AsyncStorage.setItem(`venmo_password`, venmoPassword);
      AsyncStorage.setItem(`first_name`, firstName);
      AsyncStorage.setItem(`last_name`, lastName);
    } catch (error) {
      console.log(error);
    }
    // Navigate to the home screen:
    return navigation.navigate('Home', {
      venmo_id: venmoID,
    });
  };
  // Fetch local data from local DB:
  const getLocalData = async () => {
    try {
      const email = await AsyncStorage.getItem(`email`);
      const temp_venmo_id = await AsyncStorage.getItem(`venmo_id`);
      setStoredEmail(email);
      setStoredVenmoID(temp_venmo_id);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    console.log('[RENDER::] Signup Screen:');
    // Get location permission, and previously stored data:
    if (isLoading) {
      if (Platform.OS == 'ios') requestIphoneLocation();
      if (Platform.OS == 'android') requestAndroidLocation();
      getLocalData();
    }
    // Check if user already registered, if so... forward to home screen:
    if (storedEmail != null)
      navigation.navigate('Home', {
        venmo_id: storedVenmoID,
      });
  }, [storedEmail, storedVenmoID]); // Reload component if these vars change
  return (
    <View style={styles.main}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={firstName}
          autoCorrect={false}
          placeholder="First Name: "
          placeholderTextColor={'#455A64'}
          onChangeText={text => onChangeFirstName(text)}
        />
        <TextInput
          style={styles.input}
          value={lastName}
          autoCorrect={false}
          placeholder="Last Name: "
          placeholderTextColor={'#455A64'}
          onChangeText={text => onChangeLastName(text)}
        />
        <TextInput
          style={styles.input}
          value={email}
          autoCorrect={false}
          keyboardType={'email-address'}
          placeholder="Email: "
          placeholderTextColor={'#455A64'}
          onChangeText={text => onChangeEmail(text)}
        />
        <TextInput
          style={styles.input}
          value={password}
          autoCorrect={false}
          secureTextEntry={true}
          placeholder="Password: "
          placeholderTextColor={'#455A64'}
          onChangeText={text => onChangePassword(text)}
        />
        <TextInput
          style={styles.input}
          value={venmoID}
          autoCorrect={false}
          keyboardType={'email-address'}
          placeholder="Venmo ID: "
          placeholderTextColor={'#455A64'}
          onChangeText={text => onChangeVenmoID(text)}
        />
        <TextInput
          style={styles.input}
          value={venmoPassword}
          secureTextEntry={true}
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
  },
  inputContainer: {
    marginTop: 55,
    padding: 10,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    color: 'black',
  },
  registerButton: {
    width: 150,
    backgroundColor: 'blue',
    fontColor: 'black',
  },
});
