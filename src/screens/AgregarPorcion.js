import React, { useState } from "react";
import { Image } from "expo-image";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, ImageBackground } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AgregarPorcion = ({ navigation }) => {
  const [grams, setGrams] = useState("");
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setTime(selectedDate);
  };


const handleSchedule = async () => {
  if (!grams || isNaN(grams) || grams <= 0) {
    alert("Por favor, ingresa una cantidad válida en gramos.");
    return;
  }

  const now = new Date();
  const delay = time - now; 

  if (delay < 0) {
    alert("La hora seleccionada ya pasó. Elige una hora futura.");
    return;
  }

  console.log("Programado para", time.toLocaleTimeString(), "con", grams, "gramos");

  const email = await AsyncStorage.getItem("userEmail");
  if (!email) {
    alert("Error: No se encontró el email del usuario.");
    return;
  }

  setTimeout(() => {
    fetch("http://192.168.1.X/dispensar", { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, grams }),
    })
      .then(response => response.json())
      .then(data => console.log("Respuesta ESP32:", data))
      .catch(error => console.error("Error al enviar datos:", error));
  }, delay);
};

  return (
    <ImageBackground source={require("../assets/Patron_boca.png")} style={styles.background} imageStyle={{ opacity: 0.3 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.body}>
          <Text style={styles.title}>Programa comida</Text>
          <Image source={require("../assets/anima3.gif")} style={styles.gif} />

          <View style={styles.card}>
            <Text style={styles.label}>Seleccionar horario</Text>
            <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.inputContainer}>
              <Text style={styles.inputText}>{time.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={false}
                display="spinner"
                onChange={onChange}
              />
            )}
          </View>

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

          <TouchableOpacity style={styles.button} onPress={handleSchedule}>
            <Text style={styles.buttonText}>Aceptar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Volver</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  background: { flex: 1, resizeMode: "cover" },
  gif: { width: 150, height: 150, alignSelf: "center", marginTop: 20 },
  body: { padding: 20, alignItems: "center" },
  title: { fontSize: 26, fontWeight: "bold", marginVertical: 20, color: "#333" },
  card: { backgroundColor: "rgb(160, 237, 230)", padding: 20, borderRadius: 15, width: "100%", marginVertical: 10 },
  label: { fontSize: 18, marginBottom: 10, fontWeight: "600", color: "#333" },
  inputContainer: { backgroundColor: "#fff", padding: 12, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  inputText: { fontSize: 16, color: "#333" },
  input: { backgroundColor: "#fff", padding: 12, borderRadius: 10, fontSize: 16 },
  button: { backgroundColor: "#B2FFFF", padding: 15, borderRadius: 25, marginTop: 20, alignItems: "center", width: "80%", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 5, elevation: 3 },
  buttonText: { fontSize: 18, fontWeight: "600", color: "#" },
  backText: { marginTop: 20, color: "#007BFF", fontSize: 16, fontWeight: "600" }
});

export default AgregarPorcion;
