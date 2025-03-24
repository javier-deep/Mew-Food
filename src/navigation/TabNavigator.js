// src/navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import ConsultarHorarios from '../screens/AgregarPorcion';
import EditarPerfil from '../screens/InsertarFotoPerfil';
import Notificaciones from '../screens/Notificaciones';
import AgregarHorarios from '../screens/AgregarHorarios';
import InsertarMascota from '../screens/InsertarMascota';
import ConsultarDetecciones from '../screens/ConsultarDetecciones';
import FastImage from 'react-native-fast-image';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'ConsultarHorarios') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'EditarPerfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Notificaciones') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'AgregarHorarios') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'InsertarMascota') {
            iconName = focused ? 'paw' : 'paw-outline';
          } else if (route.name === 'ConsultarDetecciones') {
            iconName = focused ? 'camera' : 'camera-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '##00daff',
        tabBarInactiveTintColor: 'gray', 
      })}
    >
      <Tab.Screen
        name="ConsultarHorarios"
        component={ConsultarHorarios}
        options={{ title: 'Dispensar' }}
      />
      <Tab.Screen
        name="EditarPerfil"
        component={EditarPerfil}
        options={{ title: 'Perfil' }}
      />
      <Tab.Screen
        name="Notificaciones"
        component={Notificaciones}
        options={{ title: 'Notificaciones' }}
      />
      <Tab.Screen
        name="AgregarHorarios"
        component={AgregarHorarios}
        options={{ title: 'Agregar Horario' }}
      />
      <Tab.Screen
        name="InsertarMascota"
        component={InsertarMascota}
        options={{ title: 'Mascota' }}
      />
      <Tab.Screen
        name="ConsultarDetecciones"
        component={ConsultarDetecciones}
        options={{ title: 'Detecciones' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;