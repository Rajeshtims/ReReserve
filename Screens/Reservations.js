import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView} from 'react-native';
import {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Key to navigations in some components
// import Buy from "./Buy"
import {NavigationContainer} from '@react-navigation/native';

export default function Reservations({route}) {
  const navigation = useNavigation();
  useEffect(() => {
    console.log('Rservations Screen:');
    console.log(route.params.allRestaurants);
  });
  return (
    <ScrollView style={{padding: 10, flex: 1}}>
      <Text style={styles.label}>Available Navigations</Text>

      <View style={styles.column}>
        {route.params.allRestaurants.map((el, index) => (
          <TouchableOpacity
            // TODO
            // instead of props.name, we shall use reservation ID as key
            key={index}
            onPress={() =>
              navigation.navigate('Buy', {
                allRestaurants: route.params.allRestaurants,
              })
            }
            style={styles.button}>
            <Text>{el.restaurant}</Text>
            <Text>{el.adress}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>

    //    // <Stack.Screen name="Profile" component={ProfileScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    /*
        <Text style={styles.buttonLabel}>{index.name}</Text>
            <Text style={[styles.buttonLabel, styles.subText]}>
              {index.address}
            </Text>*/
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
