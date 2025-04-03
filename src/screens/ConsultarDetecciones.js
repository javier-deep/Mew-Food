import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const ConsultarDetecciones = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Último registro del nivel de agua:</Text>
      <Text style={styles.date}>27 de Enero de 2025 a las 18:19</Text>
      <Text style={styles.status}>Estado: Bajo</Text>
      
      <Text style={styles.title}>Detección:</Text>
      <Text style={styles.date}>27 de Enero de 2025 a las 18:19</Text>
      
      <Text style={styles.title}>Detección:</Text>
      <Text style={styles.date}>27 de Enero de 2025 a las 15:36</Text>
      
      <Text style={styles.title}>Detección:</Text>
      <Text style={styles.date}>27 de Enero de 2025 a las 13:54</Text>
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
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
  },
  date: {
    fontSize: 14,
    color: "#333",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    color: "red",
  },
});

export default ConsultarDetecciones;