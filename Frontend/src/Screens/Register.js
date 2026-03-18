import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import Checkbox from "expo-checkbox";
import styles from "../Styles/RegistroStyle";

export default function Register({ navigation }) {

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [estudiante, setEstudiante] = useState(false);
  const [asesor, setAsesor] = useState(false);


  const registrarUsuario = async () => {

    if (!nombre || !correo || !telefono || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    if (!correo.endsWith("@unach.mx")) {
      Alert.alert("Error", "Debe usar un correo institucional @unach.mx");
      return;
    }

    if (!estudiante && !asesor) {
      Alert.alert("Error", "Seleccione un rol");
      return;
    }

    const rol = estudiante ? "Estudiante" : "Asesor";

    try {

      const response = await fetch("http://10.33.27.59:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre,
          correo,
          telefono,
          contrasena: password,
          rol
        })
      });

      const data = await response.json();

      console.log("STATUS:", response.status);
      console.log("DATA:", data);

      if (!response.ok) {
        Alert.alert("Error", data.message || "Error del servidor");
        return;
      }

      Alert.alert("Éxito", data.message);

      navigation.navigate("Login");

    } catch (error) {

      console.log(error);
      Alert.alert("Error", "No se pudo registrar el usuario");

    }

  };


  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.formContainer}>

        <Text style={styles.title}>Registro</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="nombre@unach.mx"
          value={correo}
          onChangeText={setCorreo}
        />

        <Text style={styles.label}>Telefono</Text>
        <TextInput
          style={styles.input}
          placeholder="000-000-0000"
          value={telefono}
          onChangeText={setTelefono}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Crea una contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirma la contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Text style={styles.label}>Rol</Text>

        <View style={styles.checkboxContainer}>

          <View style={styles.checkboxItem}>
            <Checkbox
              value={estudiante}
              onValueChange={() => {
                setEstudiante(true);
                setAsesor(false);
              }}
            />
            <Text style={styles.checkboxLabel}>Estudiante</Text>
          </View>

          <View style={styles.checkboxItem}>
            <Checkbox
              value={asesor}
              onValueChange={() => {
                setAsesor(true);
                setEstudiante(false);
              }}
            />
            <Text style={styles.checkboxLabel}>Asesor</Text>
          </View>

        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Ya tienes una cuenta?{" "}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate("Login")}
            >
              Inicia sesión
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={registrarUsuario}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}