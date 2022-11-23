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
  // const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [venmoId, setVenmoId] = useState('');
  const [venmoPassword, setVenmoPassword] = useState('');

  const [savedPassword, setSavedPassword] = useState();

  const checkAndSaveCredentials = async () => {
    const retrieveData = async (item, saveFunction) => {
      try {
        const value = await AsyncStorage.getItem(item);
        // DO NOT REMOVE THIS LOG 
        // probably because of lazy retrieval, the data is not retrieved without log
        console.log(value);
        saveFunction(value);
      } catch (error) {
        console.log(error);
      }
    };

    if (
      email &&
      currentPassword &&
      newPassword &&
      venmoId &&
      venmoPassword
      ) {
        console.log('None of the entered values are null');
        // console.log("User entered the following: ", 
        //     "\n\t"+email, "\n\t"+currentPassword,
        //     "\n\t"+newPassword, "\n\t"+venmoId, 
        //     "\n\t"+venmoPassword
        //     )

        retrieveData('password', setSavedPassword);
        // console.log("savedPassword === currentPassword : ", savedPassword === currentPassword);
        // console.log("Saved password is: ", "\t", savedPassword);
      if (savedPassword === currentPassword) {
        console.log('Entered password is correct. Now we can modify stored credentials',);
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('password', newPassword);
        AsyncStorage.setItem('venmo_id', venmoId);
        AsyncStorage.setItem('venmo_password', venmoPassword);
      }
    }
  };
  // useEffect(() => {
  //   checkAndSaveCredentials();
  // });
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
              onChangeText={setEmail}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.currentPassword.focus();
              }}
              this is to prevent keyboard flickering when pressing return
              blurOnSubmit={false}
            />
            <TextInput
              style={styles.inputArea}
              placeholder="Current Password"
              secureTextEntry={true}
              autoCorrect={false}
              onChangeText={setCurrentPassword}
              ref={input => {
                this.currentPassword = input;
              }}
              returnKeyType="next"
              onSubmitEditing={() => {
                this.newPassword.focus();
              }}
              blurOnSubmit={false}
            />

            <TextInput
              style={styles.inputArea}
              placeholder="New Password"
              secureTextEntry={secure}
              autoCorrect={false}
              onChangeText={setNewPassword}
              returnKeyType="next"
              ref={input => {
                this.newPassword = input;
              }}
              onSubmitEditing={() => {
                this.venmoId.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              style={styles.inputArea}
              placeholder="Venmo ID"
              onChangeText={setVenmoId}
              returnKeyType="next"
              ref={input => {
                this.venmoId = input;
              }}
              onSubmitEditing={() => {
                this.venmoPassword.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              style={styles.inputArea}
              placeholder="Venmo Password"
              onChangeText={setVenmoPassword}
              ref={input => {
                this.venmoPassword = input;
              }}
              returnKeyType="next"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={
                checkAndSaveCredentials
              }>
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
