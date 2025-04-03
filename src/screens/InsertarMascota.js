import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const InsertarMascota = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [raza, setRaza] = useState("");
  const [color, setColor] = useState("");
  const [peso, setPeso] = useState("");
  const [foto, setFoto] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  // Obtener el usuario actual al cargar la pantalla
  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();
        console.log("Claves en AsyncStorage:", keys);

        const usuarioString = await AsyncStorage.getItem("Usuario");
        console.log("Contenido de Usuario:", usuarioString);

        if (!usuarioString) {
          console.warn("No se encontró usuario en AsyncStorage");
          // Limpiar cualquier token inválido
          await AsyncStorage.removeItem("userToken");
          navigation.replace("Login");
          return;
        }

        const usuario = JSON.parse(usuarioString);
        if (!usuario?._id) {
          console.warn("El usuario no tiene un _id válido");
          await AsyncStorage.removeItem("Usuario");
          await AsyncStorage.removeItem("userToken");
          navigation.replace("Login");
          return;
        }

        setUserId(usuario._id);
        console.log("ID de usuario obtenido:", usuario._id);
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
        await AsyncStorage.removeItem("Usuario");
        await AsyncStorage.removeItem("userToken");
        navigation.replace("Login");
      } finally {
        setIsLoadingUser(false);
      }
    };

    obtenerUsuario();
  }, [navigation]);

  // Selección de imagen con manejo de permisos
  const seleccionarImagen = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permisos requeridos", "Necesitas permitir el acceso a la galería para seleccionar una imagen");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // ← Corrección aquí
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error al seleccionar imagen:", error);
      Alert.alert("Error", "No se pudo seleccionar la imagen");
    }
  };

  const guardarMascota = async () => {
    if (!nombre || !raza || !color || !peso || !foto) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos y selecciona una foto");
      return;
    }
  
    if (!userId) {
      Alert.alert("Error de sesión", "Tu sesión ha expirado. Serás redirigido al inicio de sesión");
      await AsyncStorage.removeItem("Usuario");
      await AsyncStorage.removeItem("userToken");
      navigation.replace("Login");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('raza', raza);
      formData.append('color', color);
      formData.append('peso', peso);
      formData.append('usuarioId', userId);
  
      const filename = foto.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image';
  
      formData.append('foto', {
        uri: foto,
        name: filename,
        type
      });
  
      console.log("Enviando datos al servidor...", formData);
      const response = await fetch("https://api-proyecto-qsxg.onrender.com/registrar-mascota", {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
  
      if (response.ok) {
        Alert.alert("Éxito", "Mascota registrada correctamente");
        // Limpiar el formulario
        setNombre("");
        setRaza("");
        setColor("");
        setPeso("");
        setFoto(null);
      } else {
        Alert.alert("Error", data.error || "Ocurrió un error al registrar la mascota");
      }
    } catch (error) {
      console.error("Error al registrar mascota:", error);
      Alert.alert("Error de conexión", "No se pudo conectar con el servidor. Intenta nuevamente");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelar = () => {
    setNombre("");
    setRaza("");
    setColor("");
    setPeso("");
    setFoto(null);
  };

  if (isLoadingUser) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Verificando sesión...</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={require("../assets/Patron_boca.png")} style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Ingresa a tu mascota</Text>

          <Image source={require("../assets/anima.gif")} style={styles.gif} />

          <Text style={styles.label}>Nombre</Text>
          <TextInput 
            style={styles.input} 
            value={nombre} 
            onChangeText={setNombre} 
            placeholder="Nombre" 
            editable={!isSubmitting}
          />

          <Text style={styles.label}>Raza</Text>
          <TextInput 
            style={styles.input} 
            value={raza} 
            onChangeText={setRaza} 
            placeholder="Raza" 
            editable={!isSubmitting}
          />

          <Text style={styles.label}>Color</Text>
          <TextInput 
            style={styles.input} 
            value={color} 
            onChangeText={setColor} 
            placeholder="Color" 
            editable={!isSubmitting}
          />

          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            value={peso}
            onChangeText={setPeso}
            placeholder="Peso"
            keyboardType="numeric"
            editable={!isSubmitting}
          />

          <Text style={styles.label}>Foto</Text>
          <TouchableOpacity 
            style={styles.imageButton} 
            onPress={seleccionarImagen}
            disabled={isSubmitting}
          >
            <Text style={styles.imageButtonText}>
              {foto ? "Imagen seleccionada" : "Seleccionar imagen"}
            </Text>
          </TouchableOpacity>

          {foto && (
            <Image 
              source={{ uri: foto }} 
              style={styles.previewImage} 
              resizeMode="contain"
            />
          )}

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, isSubmitting && styles.buttonDisabled]} 
              onPress={guardarMascota}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={styles.buttonText}>Guardar</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]} 
              onPress={cancelar}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 255)",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: "#000",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 20,
  },
  container: {
    backgroundColor: "rgb(174, 238, 238)",
    padding: 20,
    borderRadius: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#000",
  },
  gif: {
    width: width * 0.4,
    height: width * 0.4,
    alignSelf: "center",
    marginBottom: 10,
  },
  label: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
    color: "#000",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    width: "100%",
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    width: "100%",
    marginBottom: 20,
  },
  imageButtonText: {
    color: "#000",
    fontSize: 16,
  },
  previewImage: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 15,
    borderRadius: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#B2FFFF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default InsertarMascota;