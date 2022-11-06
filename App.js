import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import Sell from './Screens/Sell';
import Signup from './Screens/Signup';
import Reservations from './Screens/Reservations';
// A new renderer for Google Maps on Android will become the default through a progressive rollout starting in June 2022 at the earliest.
// https://developers.google.com/maps/documentation/android-sdk/renderer
//import {enableLatestRenderer} from 'react-native-maps';
//enableLatestRenderer();

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        <Stack.Screen
          name="Signup"
          component={Signup}
          //options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Sell"
          component={Sell}
          //options={{headerShown: false}}
        />
        <Stack.Screen
          name="Reservations"
          component={Reservations}
          //options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
