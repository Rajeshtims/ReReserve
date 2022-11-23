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
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export default function Setting() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [venmoId, setVenmoId] = useState();
  const [venmoPassword, setVenmoPassword] = useState();
  const ref_1 = useRef();
  const ref_2 = useRef();
  const ref_3 = useRef();
  const ref_4 = useRef();

  const retrieveOldPassword = async () => {
    try {
      value = await AsyncStorage.getItem('password');
      console.log(value);
      setOldPassword(value);
    } catch (error) {
      console.log(e);
    }
  };

  const checkAndSaveCredentials = async () => {
    if (
      email &&
      newPassword &&
      venmoId &&
      venmoPassword &&
      oldPassword == currentPassword
    ) {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', newPassword);
      await AsyncStorage.setItem('venmo_id', venmoId);
      await AsyncStorage.setItem('venmo_password', venmoPassword);
      Alert.alert('Success!', 'Your settings were saved', [
        {
          text: 'Home',
          onPress: () =>
            navigation.navigate('Home', {
              venmo_id: venmoId,
            }),
        },
      ]);
    } else {
      Alert.alert(
        'Error!',
        'It looks like you either left a field blank, or you gave the incorrect current password',
      );
    }
  };
  useEffect(() => {
    if (isLoading) {
      retrieveOldPassword();
      setIsLoading(false);
    }
  }, []);
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
              autoCapitalize="none"
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
