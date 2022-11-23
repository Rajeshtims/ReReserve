import React, {useState, useEffect, useRef} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';

export default function Setting() {
  // this is to toggle show/hide password
  // const [secure, setSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [venmoId, setVenmoId] = useState('');
  const [venmoPassword, setVenmoPassword] = useState('');

  // const handleCurrentPasswordChange = text => {
  //   console.log(text);
  //   setCurrentPassword(text);
  // };

  // const handleNewPasswordChange = text => {
  //   console.log(text);
  //   setNewPassword(text);
  // };

  // const handleEmailChange = text => {
  //   console.log(text);
  //   setEmail(text);
  // };

  // const handleVenmoIdChange = text => {
  //   console.log(text);
  //   setVenmoId(text);
  // };

  // const handleVenmoPasswordChange = text => {
  //   console.log(text);
  //   setVenmoPassword(text);
  // };

  const checkAndSaveCredentials = async () => {
    retrieveData = async key => {
      try {
        value = await AsyncStorage.getItem(key);
        if (value != null) {
          // TODO
          // this prints the correct value in console but returns Object
          console.log(value);
          return value + '';
        }
      } catch (error) {
        console.log('Failed to retrieve' + key);
        return null;
      }
    };

    const savedEmail = await retrieveData('email');
    const savedPassword = await retrieveData('password');
    const savedVenmo = await retrieveData('venmo_id');
    const savedVenmoPassword = await retrieveData('venmo_password');

    if (email && newPassword && venmoId && venmoPassword) {
      console.log('None of the entered values are null');
      console.log(
        'User entered the following: ',
        '\n\t' + email,
        '\n\t' + currentPassword,
        '\n\t' + newPassword,
        '\n\t' + venmoId,
        '\n\t' + venmoPassword,
      );

      console.log(
        'savedPassword === currentPassword' + savedPassword === currentPassword,
      );

      console.log(
        'Saved data are: ',
        '\n\t' + savedEmail,
        '\n\t' + savedPassword,
        '\n\t' + savedVenmo,
        '\n\t' + savedVenmoPassword,
      );

      if (savedPassword === currentPassword) {
        console.log(
          'Entered password is correct. Now we can modify stored credentials',
        );
        AsyncStorage.setItem('email', email);
        AsyncStorage.setItem('password', newPassword);
        AsyncStorage.setItem('venmo_id', venmoId);
        AsyncStorage.setItem('venmo_password', venmoPassword);
      }
    } else {
      if (!email) {
        Alert.alert('Email is invalid');
      } else if (!currentPassword) {
        Alert.alert('Current password is invalid');
      } else if (!newPassword) {
        Alert.alert('New password is invalid');
      } else if (!venmoId) {
        Alert.alert('VenmoID is invalid');
      } else if (!venmoPassword) {
        Alert.alert('VenmoPassword is invalid');
      }
    }
  };
  useEffect(() => {
    checkAndSaveCredentials();
  });
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
              onChangeText={e => setEmail(e)}
              returnKeyType="next"
              onSubmitEditing={() => {
                ref_1.current.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              style={styles.inputArea}
              placeholder="Current Password"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={e => setCurrentPassword(e)}
              ref={ref_1}
              returnKeyType="next"
              onSubmitEditing={() => {
                ref_2.current.focus();
              }}
              blurOnSubmit={false}
            />

            <TextInput
              style={styles.inputArea}
              placeholder="New Password"
              // secureTextEntry={secure}
              autoCorrect={false}
              onChangeText={e => setNewPassword(e)}
              returnKeyType="next"
              ref={ref_2}
              onSubmitEditing={() => {
                ref_3.current.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              style={styles.inputArea}
              placeholder="Venmo ID"
              onChangeText={e => setVenmoId(e)}
              returnKeyType="next"
              ref={ref_3}
              onSubmitEditing={() => {
                ref_4.current.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              style={styles.inputArea}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Venmo Password"
              onChangeText={e => setVenmoPassword(e)}
              ref={ref_4}
              returnKeyType="done"
              onSubmitEditing={() => checkAndSaveCredentials()}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => checkAndSaveCredentials()}>
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
