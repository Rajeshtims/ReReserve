import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  ImageBackground,
} from 'react-native';
import {Button, Surface} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Buy from './Buy';
//import {restaurant, date} from './Reservations';
import AsyncStorage from '@react-native-async-storage/async-storage';

//https://unsplash.com/photos/mAHzkCjWc20
const image = {
  uri: 'https://images.unsplash.com/photo-1635548166842-bf67bacbefaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
};
export default function Purchase({route}) {
  const navigation = useNavigation();
  const [id, setId] = useState(route.params.id);

  const handleSend = async () => {
    const venmo_password = await AsyncStorage.getItem(`venmo_password`);
    const email = await AsyncStorage.getItem(`email`);
    const res = await fetch('https://team13.egrep6021ad.repl.co/purchase/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        venmo_id: route.params.venmo_id,
        password: venmo_password,
        email: email,
      }),
    });
    Alert.alert('Sold!', 'Confirmation #: \nReservation name: ', [
      {
        text: 'Home',
        onPress: () =>
          navigation.navigate('Home', {
            venmo_id: route.params.venmo_id,
          }),
      },
    ]);
  };

  useEffect(() => {
    console.log('[RENDER::] ConfirmPurchase Screen');
  }, []);
  return (
    <ImageBackground
      imageStyle={{
        height: '100%',
        width: '100%',
        opacity: 0.8,
        resizeMode: 'cover',
        flex: 1,
      }}
      source={image}
      style={styles.main}>
      <Surface style={styles.reservationInfo} elevation={5}>
        <Text style={styles.title}>Reservation Details</Text>
        <Text style={styles.fontSize}>Restaurant:</Text>
        <Text style={styles.subText}>{route.params.restaurantName}</Text>
        <Text style={styles.fontSize}>Capacity: </Text>
        <Text style={styles.subText}>{route.params.tableSize} people</Text>
        <Text style={styles.fontSize}>Price: </Text>
        <Text style={styles.subText}>$ {route.params.price}</Text>
        <Text style={styles.fontSize}>Date of reservation:</Text>
        <Text style={styles.subText}>{route.params.date}</Text>
        <Button style={styles.sellButton} onPress={() => handleSend()}>
          <Text style={{color: 'black', fontWeight: '600', fontSize: 21}}>
            {'Buy Now!'}
          </Text>
        </Button>
      </Surface>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  main: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    //backgroundColor: '#7BDCB5',
    display: 'flex',
    alignItems: 'center',
  },
  reservationInfo: {
    backgroundColor: 'white',
    height: '76%',
    width: Dimensions.get('window').width - 50,
    borderRadius: 10,
    marginTop: '15%',
    padding: 8,
    opacity: 0.9,
  },
  sellButton: {
    alignSelf: 'center',
    marginTop: '5%',
    backgroundColor: '#00D084',
    width: Platform.OS == 'ios' ? 300 : '80%',
    height: Platform.OS == 'ios' ? 50 : null,
    display: 'flex',
    justifyContent: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  fontSize: {
    fontSize: 24,

    margin: 7,
    //textAlign: 'center',
  },
  subText: {
    fontSize: 21,
    fontWeight: '300',
    paddingLeft: 7,
    paddingBottom: 10,
    fontStyle: 'italic',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    textDecorationLine: 'underline',
    margin: 5,
  },
});
