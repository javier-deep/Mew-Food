import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Image } from 'expo-image';

const InsertarMascota = ({ navigation }) => {
  return (
    <ImageBackground source={require('../assets/Patron_colas.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Ingresa a tu Mascota</Text>

        <Image
          source={require('../assets/anima2.gif')}
          style={styles.gif}
        />

        <TextInput style={styles.input} placeholder="Nombre de la mascota" />
        <TextInput style={styles.input} placeholder="Raza" />
        <TextInput style={styles.input} placeholder="Color" />
        <TextInput style={styles.input} placeholder="Peso" />
        <TextInput style={styles.input} placeholder="Edad" />
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(214, 252, 250, 0.58)',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#317D7D',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#A8DCD9',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#104F55',
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#68C3B7',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#E0F2F1',
    fontWeight: 'bold',
  },
  gif: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
  },
});

export default InsertarMascota;
