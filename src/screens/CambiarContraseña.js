import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CambiarContraseña = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Contraseña</Text>
      <TextInput style={styles.input} placeholder="Contraseña actual" secureTextEntry />
      <TextInput style={styles.input} placeholder="Nueva contraseña" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirmar nueva contraseña" secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cambiar contraseña</Text>
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
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
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

export default CambiarContraseña;