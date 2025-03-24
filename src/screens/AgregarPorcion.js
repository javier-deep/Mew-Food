import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Image } from 'expo-image';

const AgregarPorcion = ({ navigation }) => {
  const [horario, setHorario] = useState('20:00');
  const [grams, setGrams] = useState('');

  return (
    <ImageBackground source={require('../assets/Patron_boca.png')} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Programar Comida</Text>

        <Image source={require('../assets/anima3.gif')} style={styles.gif} />

        <Text style={styles.label}>Seleccionar horario</Text>
        <Picker selectedValue={horario} style={styles.picker} onValueChange={(itemValue) => setHorario(itemValue)}>
          <Picker.Item label="8:00 am" value="8:00" />
          <Picker.Item label="9:00 am" value="9:00" />
          <Picker.Item label="10:00 am" value="10:00" />
          <Picker.Item label="11:00 am" value="11:00" />
          <Picker.Item label="12:00 pm" value="12:00" />
          <Picker.Item label="1:00 pm" value="1:00" />
          <Picker.Item label="2:00 pm" value="2:00" />
          <Picker.Item label="3:00 pm" value="3:00" />
          <Picker.Item label="4:00 pm" value="4:00" />
          <Picker.Item label="5:00 pm" value="5:00" />
          <Picker.Item label="6:00 pm" value="6:00" />
          <Picker.Item label="7:00 pm" value="7:00" />
          <Picker.Item label="8:00 pm" value="8:00" />
          <Picker.Item label="9:00 pm" value="9:00" />
          <Picker.Item label="10:00 pm" value="10:00" />
          <Picker.Item label="11:00 pm" value="11:00" />
          <Picker.Item label="12:00 am" value="12:00" />
        </Picker>

        <Text style={styles.label}>Cantidad (en gramos)</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 50g"
          value={grams}
          onChangeText={setGrams}
          keyboardType="numeric"
        />

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
  overlay: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Capa semitransparente para ver la imagen de fondo
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#2A7372',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2A7372',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#A8DCD9',
    borderRadius: 5,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#A8DCD9',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: '#2A7372',
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#57B5AC',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  gif: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
  },
});

export default AgregarPorcion;