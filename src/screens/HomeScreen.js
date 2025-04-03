import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const InfoUserScreen = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#63d4c5" barStyle="dark-content" />
      
      {/* User Profile Card */}
      <View style={styles.card}>
        {/* Foto de perfil dentro de la tarjeta */}
        <Image 
          source={{ uri: 'https://via.placeholder.com/100' }} 
          style={styles.profileImage} 
        />
        
        <Text style={styles.cardTitle}>Información Personal</Text>
        
        <View style={styles.infoContainer}>
          <TextInput style={styles.input} placeholder="Nombre" />
        </View>
        
        <View style={styles.infoContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Teléfono" 
            keyboardType="phone-pad" 
          />
        </View>
        
        <View style={styles.infoContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Correo" 
            keyboardType="email-address" 
          />
        </View>
        
        <TouchableOpacity 
        style={styles.editButton}
        onPress={() => navigation.navigate("EditarPerfil")}>
          <Text style={styles.editButtonText}>Editar perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Cambiar contraseña</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: '#a3eade',
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 100,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15, // Espacio entre la foto de perfil y el texto
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#fff',
    width: '90%',
    marginVertical: 5,
    borderRadius: 8,
  },
  input: {
    padding: 10,
    fontSize: 16,
    width: '100%',
  },
  editButton: {
    marginTop: 15,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 16,
    color: '#000',
  },
});

export default InfoUserScreen;