import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const horarios = [
  { id: '1', hora: '08:00 AM', porcion: '50g' },
  { id: '2', hora: '12:00 PM', porcion: '30g' },
  { id: '3', hora: '06:00 PM', porcion: '50g' },
];

const ConsultarHorarios = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horarios de Comida</Text>
      <FlatList
        data={horarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>Hora: {item.hora}</Text>
            <Text style={styles.text}>Porción: {item.porcion}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AgregarHorarios')}>
        <Text style={styles.buttonText}>Agregar Horario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#00daff',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ConsultarHorarios;