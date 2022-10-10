import { View, Text } from 'react-native'
import React from 'react'
import HomePage from './screens/HomePage'
import LoginPage from './screens/LoginPage'
import RegisterPage from './screens/RegisterPage'
import AddCarPage from './screens/AddCarPage'
import LoadAllCars from './screens/LoadAllCars'
import UpdateCarDetails from './screens/UpdateCarDetails'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="AddCarPage" component={AddCarPage} />
        <Stack.Screen name="LoadAllCars" component={LoadAllCars} />
        <Stack.Screen name="UpdateCarDetails" component={UpdateCarDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}