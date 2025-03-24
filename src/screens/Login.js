import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
});

const saveSession = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
  } catch (error) {
    console.log(error);
  }
};

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://192.168.29.134:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: values.email, password: values.password }),
      });
      const data = await response.json();
      if (response.ok) {
        await saveSession(data.token);
        Alert.alert("Éxito", "Inicio de sesión exitoso");
        navigation.navigate("Main");
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      Alert.alert("Error", "Error de conexión");
    }
    setLoading(false);
  };

  return (
    <View style={styles.wrapper}>
      <Image source={require("../assets/MEWFOOD.png")} style={styles.logo} resizeMode="contain" />
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <Text>Correo:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <Text>Contraseña:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry
              />
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

              <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Iniciar Sesión</Text>}
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
          <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#8DE0D6",
    padding: 30,
    borderRadius: 10,
    width: 350,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: 300,
    alignSelf: "center",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#C6FFFA",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  link: {
    color: "#0000FF",
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 20,
  },
});

export default Login;