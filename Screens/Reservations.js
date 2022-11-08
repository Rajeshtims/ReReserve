import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView} from 'react-native';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Key to navigations in some components
// import Buy from "./Buy"
import {NavigationContainer} from '@react-navigation/native';

const Entries = [
  {name: 'ONE', address: 'Lorem Address'},
  {name: 'TWO', address: 'Lorem Address'},
  {name: 'THREE', address: 'Lorem Address'},
  {name: 'FOUR', address: 'Lorem Address'},
  {name: 'FIVE', address: 'Lorem Address'},
  {name: 'SIX', address: 'Lorem Address'},
  {name: 'SEVEN', address: 'Lorem Address'},
  {name: 'EIGHT', address: 'Lorem Address'},
  {name: 'NINE', address: 'Lorem Address'},
  {name: 'TEN', address: 'Lorem Address'},
];

export default function Reservations() {
  const navigation = useNavigation();
  return (
    <ScrollView style={{padding: 10, flex: 1}}>
      <Text style={styles.label}>Available Navigations</Text>

      <View style={styles.column}>
        {Entries.map(props => (
          <TouchableOpacity
            // TODO
            // instead of props.name, we shall use reservation ID as key
            key={props.name}
            onPress={() => console.log('Buy triggered')}
            // navigation.navigate("Buy")
            style={styles.button}>
            <Text style={styles.buttonLabel}>{props.name}</Text>
            <Text style={[styles.buttonLabel, styles.subText]}>
              {props.address}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>

    //    // <Stack.Screen name="Profile" component={ProfileScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue',
  },
  column: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    marginHorizontal: '2%',
    marginTop: '2%',
    marginBottom: 10,
    minWidth: '90%',
    textAlign: 'center',
  },
  selected: {
    backgroundColor: 'coral',
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
  },
  selectedLabel: {
    color: 'white',
  },
  label: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  subText: {
    fontSize: 16,
    fontWeight: '400',
  },
});
