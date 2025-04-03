import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ListaMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("usuarioId");
        const storedEmail = await AsyncStorage.getItem("userEmail");

        if (!storedUserId && !storedEmail) {
          setError("No se encontró usuarioId ni email en AsyncStorage.");
          setLoading(false);
          return;
        }

        let data = [];
        // Intentar buscar por usuarioId
        if (storedUserId) {
          const response = await fetch(
            `http://192.168.1.103:3000/mascotas/buscar?usuarioId=${storedUserId}`
          );
          if (response.ok) {
            const responseData = await response.json();
            data = responseData;
          } else {
            setError("No se pudo obtener mascotas por ID.");
          }
        }

        // Si no se encontraron mascotas con usuarioId, buscar por email
        if ((!data || data.length === 0) && storedEmail) {
          const response = await fetch(
            `http://192.168.1.103:3000/mascotas/buscar?email=${storedEmail}`
          );
          if (response.ok) {
            const responseData = await response.json();
            data = responseData;
          } else {
            setError("No se pudo obtener mascotas por Email.");
          }
        }

        if (Array.isArray(data) && data.length > 0) {
          setMascotas(data);
        } else {
          setMascotas([]);
        }
      } catch (error) {
        setError("Error al obtener datos.");
        console.error("❌ Error en la solicitud fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMascotas();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Cargando tus mascotas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {mascotas.length === 0 ? (
        <Text style={styles.noMascotas}>No tienes mascotas registradas.</Text>
      ) : (
        <FlatList
          data={mascotas}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
  source={{
    uri: item.foto && item.foto.startsWith("http")
      ? item.foto
      : `http://192.168.1.103:3000${item.foto}`,
  }}
  style={styles.image}
/>

              <View style={styles.details}>
                <Text style={styles.name}>{item.nombre}</Text>
                <Text style={styles.info}>Raza: {item.raza || "No disponible"}</Text>
                <Text style={styles.info}>Color: {item.color || "No disponible"}</Text>
                <Text style={styles.info}>Peso: {item.peso || "No disponible"} kg</Text>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert("Editar datos", `Editar información de ${item.nombre}`)
                  }
                  style={styles.editButton}
                >
                  <Text style={styles.editButtonText}>Editar datos</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  card: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  info: {
    fontSize: 14,
    color: "#555",
  },
  editButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMascotas: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ListaMascotas;
