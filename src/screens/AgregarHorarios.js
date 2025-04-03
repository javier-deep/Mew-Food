import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground } from "react-native";
import { Image } from "expo-image"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const AgregarHorarios = ({ navigation }) => {
  const [grams, setGrams] = useState("");

  const handleManualDispense = async () => {
    if (!grams || isNaN(grams) || grams <= 0) {
      alert("Por favor, ingresa una cantidad válida en gramos.");
      return;
    }

    const email = await AsyncStorage.getItem("userEmail");
    if (!email) {
      alert("Error: No se encontró el email del usuario.");
      return;
    }

    fetch("http://192.168.1.X/dispensar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, grams }),
    })
      .then(response => response.json())
      .then(data => console.log("Dispensado manualmente:", data))
      .catch(error => console.error("Error al enviar datos:", error));
  };

  return (
    <ImageBackground source={require("../assets/Patron_boca.png")} style={styles.background} imageStyle={{ opacity: 0.3 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.title}>Dispensación Manual</Text>
          <Image source={require("../assets/anima3.gif")} style={styles.gif} />
          
          <View style={styles.card}>
            <Text style={styles.label}>Gramos</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={grams}
              onChangeText={setGrams}
              placeholder="Ingresa la cantidad"
              placeholderTextColor="#666"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleManualDispense}>
            <Text style={styles.buttonText}>Dispensar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  background: { flex: 1, resizeMode: "cover" },
  gif: { width: 150, height: 150, alignSelf: "center", marginTop: 20 },
  body: { padding: 20, alignItems: "center", justifyContent: "center", flex: 1 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, color: "#333" },
  card: { backgroundColor: "rgb(160, 237, 230)", padding: 20, borderRadius: 15, width: "90%", marginVertical: 10 },
  label: { fontSize: 18, marginBottom: 10, fontWeight: "600", color: "#333" },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 10, fontSize: 16, width: "100%" },
  button: { backgroundColor: "#B2FFFF", padding: 15, borderRadius: 25, marginTop: 20, alignItems: "center", width: "80%", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 },
  buttonText: { fontSize: 18, fontWeight: "600", color: "#333" },
  backText: { marginTop: 20, color: "#007BFF", fontSize: 16, fontWeight: "600" },
});


export default AgregarHorarios;