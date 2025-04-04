import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import TabNavigator from './TabNavigator';
import Registro from '../screens/Registro'; 
import ListaMascotas from '../screens/ListaMascotas';
import EditarPerfil from '../screens/EditarPerfil';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registro" 
          component={Registro} 
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="EditarPerfil" 
          component={EditarPerfil} 
          options={{ headerShown: true }} 
        />
        <Stack.Screen
          name="EditarMascota" 
          component={ListaMascotas} 
          options={{ headerShown: true }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
