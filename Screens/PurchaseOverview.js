import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Buy from './Buy';
import {restaurant, date} from './Reservations';

export default function Purchase({route}) {
  const navigation = useNavigation();

  useEffect(() => {
    console.log('ConfirmPurchase Screen: ');
    console.log(route.params.id);
  }, []);
  return (
    <View style={styles.main}>
      <Text style={styles.fontSize}>{route.params.restaurantName}</Text>
      <Text style={styles.fontSize}>{route.params.tableSize}</Text>
      <Text style={styles.fontSize}>{route.params.price}</Text>
      <Text style={styles.fontSize}>{route.params.date}</Text>
      <Button
        style={styles.sellButton}
        onPress={() => navigation.navigate('Confirmation')}>
        <Text style={{color: 'black', fontWeight: '400', fontSize: 20}}>
          {'Buy Now!'}
        </Text>
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellButton: {
    marginTop: '15%',
    backgroundColor: 'green',
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
    padding: 20,
  },
});
