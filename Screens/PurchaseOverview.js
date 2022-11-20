import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Buy from './Buy';
import {restaurant, date} from './Reservations';

export default function Purchase({route}) {
  const navigation = useNavigation();
  const [id, setId] = useState(route.params.id)

  const handleSend = async () => {
    fetch('https://team13.egrep6021ad.repl.co/purchase/', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id : id,
          }),
        });   
    Alert.alert("Sold!");
    navigation.navigate('Home');
  };

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
        onPress={() => handleSend()}>
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
    backgroundColor: '#7BDCB5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sellButton: {
    marginTop: '15%',
    backgroundColor: '#FF8A65',
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
  fontSize2: {
    fontSize: 24,
    padding: 20,
  },
});
