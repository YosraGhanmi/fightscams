import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Login from '../screens/Login';
import HomePage from '../screens/HomePage';
import DetailedPage from '../screens/DetailedPage';

const Stack = createStackNavigator();

export default function StackRoute() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} /> 
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="DetailedPage" component={DetailedPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
