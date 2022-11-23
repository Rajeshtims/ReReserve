import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Setting() {
  // this is to toggle show/hide password
  const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState();
  const [current_password, setCurrentPassword] = useState();
  const [new_password, setNewPassword] = useState();
  const [venmo_id, setVenmoId] = useState();
  const [venmo_password, setVenmoPassword] = useState();

  const handlePasswordChange = text => {
    console.log(text);
    setCurrentPassword(text);
  };

  const checkAndSaveCredentials = () => {
    retrieveData = async key => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value != null) {
          console.log(value);
          //return value;
        }
      } catch (error) {
        console.log('Failed to retrieve' + key);
      }
    };

    const savedEmail = retrieveData('email');
    const savedPassword = retrieveData('password');
    const savedVenmo = retrieveData('venmo_id');
    const savedVenmoPassword = retrieveData('venmo_password');

    // TODO reading the text input is giving errors
    // key-value pair is returned
    console.log(savedPassword);
    console.log(current_password);

    if (
      email &&
      current_password &&
      new_password &&
      venmo_id &&
      venmo_password
    ) {
      console.log('None of the entered values are null');

      if (savedPassword === current_password) {
        console.log(
          'Entered password is correct. Now we can modify stored credentials',
        );
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('password', new_password);
        AsyncStorage.setItem('venmo_id', venmo_id);
        AsyncStorage.setItem('venmo_password', venmo_password);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView style={{flex: 1}}>
          <View style={styles.sectionContainer}>
            <Text style={styles.highlight}> Change Setting </Text>
            <TextInput
              style={styles.inputArea}
              placeholder="Email"
              autoComplete="email"
              keyboardType="email-address"
              onChangeText={text => setEmail(text)}
              // returnKeyType="next"
              // onSubmitEditing={() => {
              //   this.currentPassword.focus();
              // }}
              // this is to prevent keyboard flickering when pressing return
              // blurOnSubmit={false}
            />
            <TextInput
              style={styles.inputArea}
              placeholder="Current Password"
              secureTextEntry={true}
              autoCorrect={false}
              onChangeText={text => handlePasswordChange(text)}
              // ref={input => {
              //   this.currentPassword = input;
              // }}
              // returnKeyType="next"
              // onSubmitEditing={() => {
              //   this.newPassword.focus();
              // }}
              // blurOnSubmit={false}
            />

            <TextInput
              style={styles.inputArea}
              placeholder="New Password"
              secureTextEntry={secure}
              autoCorrect={false}
              onChangeText={text => setNewPassword(text)}
              // returnKeyType="next"
              // ref={input => {
              //   this.newPassword = input;
              // }}
              // onSubmitEditing={() => {
              //   this.venmoId.focus();
              // }}
              // blurOnSubmit={false}
            />
            <TextInput
              style={styles.inputArea}
              placeholder="Venmo ID"
              onChangeText={text => setVenmoId(text)}
              // returnKeyType="next"
              // ref={input => {
              //   this.venmoId = input;
              // }}
              // onSubmitEditing={() => {
              //   this.venmoPassword.focus();
              // }}
              // blurOnSubmit={false}
            />
            <TextInput
              style={styles.inputArea}
              placeholder="Venmo Password"
              onChangeText={text => setVenmoPassword(text)}
              // ref={input => {
              //   this.venmoPassword = input;
              // }}
              // returnKeyType="next"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                checkAndSaveCredentials();
              }}>
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: '#1e88e5',
    margin: 10,
  },
  highlight: {
    fontWeight: '400',
    fontSize: 16,
  },
  inputArea: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    minWidth: 200,
    borderRadius: 8,
  },
  sectionContainer: {
    marginTop: 10,
    alignItems: 'center',
    display: 'flex',
    height: '100%',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
