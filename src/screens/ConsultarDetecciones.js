import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";

const ConsultarDetecciones = ({ route }) => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [correoUsuario, setCorreoUsuario] = useState(""); // O el valor inicial que prefieras

  useEffect(() => {
    const fetchHistorial = async () => {
      if (!correoUsuario) return; // Asegúrate de que haya un correoUsuario antes de hacer la solicitud
  
      try {
        const response = await fetch(`http://192.168.1.102:3000/historial?correo=${correoUsuario}`);
        const data = await response.json();
  
        if (response.ok) {
          setHistorial(data); // Guarda el historial en el estado
        } else {
          console.error("Error al obtener historial:", data.error);
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      } finally {
        setLoading(false); // Cambia el estado de carga
      }
    };
  
    fetchHistorial();
  }, [correoUsuario]); // Agrega correoUsuario como dependencia
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Historial de Detecciones</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : historial.length > 0 ? (
        historial.map((registro, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.date}>
              {new Date(registro.fecha).toLocaleDateString()} a las {new Date(registro.hora).toLocaleTimeString()}
            </Text>
            <Text style={styles.status}>Modo: {registro.modo}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noData}>No hay registros disponibles</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
  },
  date: {
    fontSize: 14,
    color: "#333",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  noData: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
});

export default ConsultarDetecciones;
