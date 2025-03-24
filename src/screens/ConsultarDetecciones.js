import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const detecciones = [
  { id: '1', mensaje: 'Gato detectado a las 8:00 AM' },
  { id: '2', mensaje: 'Gato detectado a las 12:00 PM' },
];

const ConsultarDetecciones = ({ navigation }) => {
   return (
    <View style={styles.container}>
      <FlatList
        data={detecciones}
        keyExtractor={(item) => item.fecha}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>Fecha: {item.fecha}</Text>
            <Text>Sensor: {item.sensor}</Text>
            {item.nivel && <Text>Nivel: {item.nivel}</Text>}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
  },
});


export default ConsultarDetecciones;