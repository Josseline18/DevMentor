import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "../Styles/RegistroStyle";
import { API_URL } from "../config/api";
import { setCurrentUser } from "../services/sessionService";

export default function Login({ navigation }) {

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const redirectTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const iniciarSesion = async () => {
    if (!correo || !password) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          correo,
          contrasena: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.detail || "Credenciales incorrectas");
        return;
      }

      const usuario = data?.usuario;
      if (!usuario?.id || !usuario?.nombre || !usuario?.correo) {
        Alert.alert("Error", "El login no devolvio los datos del usuario");
        return;
      }

      setCurrentUser({
        id: Number(usuario.id),
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      });

      setLoginSuccess(true);
      redirectTimeoutRef.current = setTimeout(() => {
        navigation.navigate("DevMentor");
      }, 2500);

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo iniciar sesión");
    }

  };

  if (loginSuccess) {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={[styles.title, { marginTop: 16 }]}>Bienvenido</Text>
          <Text style={styles.registerText}>Cargando tu panel...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Image
          source={require("../../assets/images/POO.jpg")}
          style={styles.headerImage}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Bienvenido!</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={correo}
          onChangeText={setCorreo}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={iniciarSesion}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            No tienes una cuenta?{" "}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate("Register")}
            >
              Registrarse ahora
            </Text>
          </Text>
        </View>

      </View>
    </View>
  );
}