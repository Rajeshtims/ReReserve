import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Key to navigations in some components
import {NavigationContainer} from '@react-navigation/native';
//https://unsplash.com/photos/KNTrdpk-gTg
const image = {
  uri: 'https://images.unsplash.com/photo-1666595621164-3bc9f9ab7f3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
};
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
          headCounts: [curr.headcount],
          prices: [curr.price],
          ids: [curr.id],
          dates: [curr.date],
        };
      } else {
        let times = map[curr.restaurant].reservationTimes;
        times = [...times, curr.reservation];
        let headcounts = map[curr.restaurant].headCounts;
        headcounts = [...headcounts, curr.headcount];
        let ids = map[curr.restaurant].ids;
        ids = [...ids, curr.id];
        let prices = map[curr.restaurant].prices;
        prices = [...prices, curr.price];
        let dates = map[curr.restaurant].dates;
        dates = [...dates, curr.date];

        map[curr.restaurant].reservationTimes = times;
        map[curr.restaurant].headCounts = headcounts;
        map[curr.restaurant].ids = ids;
        map[curr.restaurant].prices = prices;
        map[curr.restaurant].dates = dates;
      }
    }
    setFilteredRestaurants(map);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      filter_restaurants();
    }
    console.log('[RENDER::] Rservations Screen');
    return () => {
      console.log('[UNMOUNTING::] Reservations Screen');
    };
  }, []);
  return (
    <ImageBackground imageStyle={{opacity: 0.8}} source={image}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.column}>
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
                        headCounts: filteredRestaurants[key].headCounts,
                        prices: filteredRestaurants[key].prices,
                        ids: filteredRestaurants[key].ids,
                        dates: filteredRestaurants[key].dates,
                        venmo_id: route.params.venmo_id,
                      })
                    }>
                    <Text style={{color: 'black', fontSize: 20, padding: 5}}>
                      {key}
                    </Text>
                    <Text style={{color: 'black', fontStyle: 'italic'}}>
                      {filteredRestaurants[key].address}
                    </Text>
                  </TouchableOpacity>
                );
              })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'aliceblue',
  },
  scrollView: {
    height: '100%',
    marginTop: 20,
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
    backgroundColor: 'white',
    alignSelf: 'center',
    marginHorizontal: '2%',
    marginTop: '2%',
    marginBottom: 10,
    minWidth: '95%',
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
