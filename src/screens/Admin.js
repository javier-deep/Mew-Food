import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const usuarios = [
  { id: '1', nombre: 'Usuario 1', correo: 'usuario1@example.com' },
  { id: '2', nombre: 'Usuario 2', correo: 'usuario2@example.com' },
];

const Admin = ({ navigation }) => {


  return (
        <ImageBackground source={require('../assets/gato-fondo2.jpg')} style={styles.background}>
    <View style={styles.container}>
      <Text style={styles.title}>Administración</Text>
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>Nombre: {item.nombre}</Text>
            <Text style={styles.text}>Correo: {item.correo}</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditarMascotas')}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {}}>
              <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('InsertarMascota')}>
        <Text style={styles.buttonText}>Insertar</Text>
      </TouchableOpacity>
    </View>
        </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
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
    borderBottomColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#797d7f'
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fadbd8',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '',
    fontWeight: 'bold',
  },
});

export default Admin;