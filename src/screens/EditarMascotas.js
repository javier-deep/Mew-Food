import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const EditarMascotas = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Mascota</Text>
      <TextInput style={styles.input} placeholder="Nombre de la mascota" />
      <TextInput style={styles.input} placeholder="Raza" />
      <TextInput style={styles.input} placeholder="Edad" />
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
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
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#00daff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFA500',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditarMascotas;