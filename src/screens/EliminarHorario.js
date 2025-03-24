import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EliminarHorario = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Estás seguro de eliminar este horario?</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    backgroundColor: '#00daff',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EliminarHorario;