import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
  email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
  telefono: Yup.string()
    .matches(/^\d{10}$/, "El teléfono debe tener 10 dígitos")
    .required("El teléfono es obligatorio"),
  password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("La contraseña es obligatoria"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("La confirmación es obligatoria"),
});

const Registro = ({ navigation }) => {
  const handleRegister = async (values) => {
    try {
      const response = await fetch("http://192.168.1.103:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert("Éxito", "Registro exitoso");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.error);
      }
    } catch (error) {
      Alert.alert("Error", "Error de conexión");
    }
  };

  return (
    <View style={styles.wrapper}>
      <Image source={require("../assets/MEWFOOD.png")} style={styles.logo} resizeMode="contain" />
      <View style={styles.container}>
        <Text style={styles.title}>Registro</Text>
        <Formik
          initialValues={{ nombre: "", email: "", telefono: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                onChangeText={handleChange("nombre")}
                onBlur={handleBlur("nombre")}
                value={values.nombre}
              />
              {touched.nombre && errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Teléfono"
                onChangeText={handleChange("telefono")}
                onBlur={handleBlur("telefono")}
                value={values.telefono}
                keyboardType="numeric"
                maxLength={10}
              />
              {touched.telefono && errors.telefono && <Text style={styles.error}>{errors.telefono}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

              <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                secureTextEntry
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.error}>{errors.confirmPassword}</Text>
              )}

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Registrarse</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#8DE0D6",
    padding: 20,
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
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#A5FFE0",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  link: {
    color: "#0000FF",
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 15,
  },
});

export default Registro;

