import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../Styles/RegistroStyle";

export default function Login({ navigation }) {
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
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
        />

        <Text style={styles.link}>
          ¿Olvidaste la contraseña?
        </Text>

        <TouchableOpacity style={styles.button}>
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