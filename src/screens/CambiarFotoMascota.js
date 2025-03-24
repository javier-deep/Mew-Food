import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CambiarFotoMascota = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Foto de Mascota</Text>
      <Image source={require('../assets/mascota-placeholder.jpg')} style={styles.image} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cambiar foto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  button: {
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

export default CambiarFotoMascota;