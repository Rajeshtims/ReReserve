import React, {useState} from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Setting: () => Node = () => {
    // this is to toggle show/hide password
  const [secure, setSecure] = useState(true);
  return (
    <View style={styles.sectionContainer}>
    <Text style = {styles.highlight}> Change Setting </Text>
    <TextInput 
      style = {styles.inputArea}
      placeholder='Email'
      autoComplete='email'
      keyboardType='email-address'
      returnKeyType="next"
      onSubmitEditing={() => { this.currentPassword.focus(); }}
      blurOnSubmit={false} // this is to prevent keyboard flickering when pressing return
    />
    // we need to retrieve the locally stored password and check if the now entered password matches
    <TextInput 
      style = {styles.inputArea}
      placeholder='Current Password'
      secureTextEntry={true}
      autoCorrect={false}
      ref={(input) => { this.currentPassword = input;}}
      returnKeyType="next"
      onSubmitEditing={() => { this.newPassword.focus(); }}
      blurOnSubmit={false}
    />
    // for some reason this is not working [on my machine]
    {/* {
    <Icon style={{ paddingRight: 15, }}
    name={secure ? "eye" : 'eye-slash'}
    size={20} color='gray' 
    onPress={() => setSecure(!secure)} />
    } */}
    <TextInput 
      style = {styles.inputArea}
      placeholder='New Password'
      secureTextEntry={secure}
      autoCorrect={false}
      returnKeyType="next"
      ref={(input) => { this.newPassword = input;}}
      onSubmitEditing={() => { this.venmoId.focus(); }}
      blurOnSubmit={false}
    />
    <TextInput 
      style = {styles.inputArea}
      placeholder='Venmo ID'
      returnKeyType="next"
      ref={(input) => { this.venmoId = input;}}
      onSubmitEditing={() => { this.venmoPassword.focus(); }}
      blurOnSubmit={false}
    />
    <TextInput 
      style = {styles.inputArea}
      placeholder='Venmo Password'
      ref={(input) => { this.venmoPassword = input;}}
      returnKeyType="next"
    />

    <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Save</Text>
    </TouchableOpacity>
  </View>
  );
};

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
  highlight : {
    fontWeight : '400',
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
    // justifyContent: "center",
    alignItems: "center",
    display :"flex",
    height: "100%"
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default App;
