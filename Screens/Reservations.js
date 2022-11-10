import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView} from 'react-native';
import {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Key to navigations in some components
import {NavigationContainer} from '@react-navigation/native';

export default function Reservations({route}) {
  const navigation = useNavigation();
  useEffect(() => {
    console.log('Rservations Screen:');
    console.log(route.params.allRestaurants);
  });
  return (
    <View style={{marginTop: 15}}>
      <Text style={styles.label}>Available Reservations</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.column}>
          {route.params.allRestaurants.map((el, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('Buy', {
                  selectedRestaurant: el,
                  coordinate: route.params.markers[index],
                  restaurant: route.params.allRestaurants[index],
                })
              }
              style={styles.button}>
              <Text>{el.restaurant}</Text>
              <Text>{el.adress}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: 'aliceblue',
  },
  scrollView: {
    height: '100%',
  },
  column: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'lightgray',
    alignSelf: 'center',
    marginHorizontal: '2%',
    marginTop: '2%',
    marginBottom: 10,
    minWidth: '90%',
    // Wont work because <Text> is child element
    //textAlign: 'center',
    // Instead:
    display: 'flex',
    alignItems: 'center',
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
    fontStyle: 'italic',
  },
  subText: {
    fontSize: 16,
    fontWeight: '400',
  },
});
