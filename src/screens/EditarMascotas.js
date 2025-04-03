import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PetProfileScreen = () => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const { petId } = route.params;

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await fetch(`https://api-proyecto-qsxg.onrender.com/mascotas/${petId}`);
        const data = await response.json();
        setPet(data);
      } catch (error) {
        console.error('Error fetching pet:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [petId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!pet) {
    return (
      <View style={styles.container}>
        <Text>No se pudo cargar la información de la mascota</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pet.nombre}</Text>
      
      {pet.foto && (
        <Image 
          source={{ uri: `https://api-proyecto-qsxg.onrender.com${pet.foto}` }} 
          style={styles.petImage}
        />
      )}
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Raza:</Text>
        <Text style={styles.value}>{pet.raza}</Text>
        
        <Text style={styles.label}>Color:</Text>
        <Text style={styles.value}>{pet.color}</Text>
        
        <Text style={styles.label}>Peso:</Text>
        <Text style={styles.value}>{pet.peso} kg</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.editButton}
        onPress={() => navigation.navigate('EditPet', { pet })}
      >
        <Text style={styles.editButtonText}>Editar datos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  petImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#555',
  },
  value: {
    fontSize: 16,
    marginLeft: 10,
    color: '#666',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PetProfileScreen;