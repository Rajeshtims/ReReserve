import React from 'react';
import {View, Text, StyleSheet, Platform, ScrollView} from 'react-native';
import {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Key to navigations in some components
import {NavigationContainer} from '@react-navigation/native';

export default function Reservations({route}) {
  const navigation = useNavigation();
  const [filteredRestaurants, setFilteredRestaurants] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const filter_restaurants = () => {
    const all_restaurants = route.params.allRestaurants;
    let map = {};
    for (let i = 0; i < all_restaurants.length; i++) {
      let curr = all_restaurants[i];
      if (!(curr.restaurant in map)) {
        // Set the key to restaurant name
        map[curr.restaurant] = {
          // Value is an object {reservationTimes = [], address: string}
          reservationTimes: [curr.reservation],
          address: curr.adress,
          coordinates: JSON.parse(curr.coordinates),
        };
      } else {
        let arr = map[curr.restaurant].reservationTimes;
        arr = [...arr, curr.reservation];
        map[curr.restaurant].reservationTimes = arr;
      }
    }
    setFilteredRestaurants(map);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      filter_restaurants();
    }

    console.log('Rservations Screen:');
    if (filteredRestaurants !== null) {
      console.log(filteredRestaurants);
    }
  }, [filteredRestaurants, isLoading]);
  return (
    <View style={{marginTop: 15}}>
      <Text style={styles.label}>Available Reservations</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.column} key={filteredRestaurants}>
          {isLoading
            ? null
            : Object.entries(filteredRestaurants).map(([key, v]) => {
                return (
                  <TouchableOpacity
                    key={key}
                    style={styles.button}
                    onPress={() =>
                      navigation.navigate('Buy', {
                        selectedRestaurant: key,
                        coordinate: filteredRestaurants[key].coordinates,
                        restaurant: key,
                        reservationTimes:
                          filteredRestaurants[key].reservationTimes,
                      })
                    }>
                    <Text>{key}</Text>
                    <Text>{filteredRestaurants[key].address}</Text>
                  </TouchableOpacity>
                );
              })}
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
