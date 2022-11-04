import React from 'react';
import type {Node} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import Sell from './Screens/Sell';
import Signup from './Screens/Signup';
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
          //options={{headerShown: false}}
        />
        <Stack.Screen
          name="Sell"
          component={Sell}
          //options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
