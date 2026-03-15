import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import styles from "../Styles/RegistroStyle";

export default function Register({ navigation }) {

  const [estudiante, setEstudiante] = useState(false);
  const [asesor, setAsesor] = useState(false);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.formContainer}>

        <Text style={styles.title}>Registro</Text>

        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} />

        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="nombre@unach.mx"
        />

        <Text style={styles.label}>Telefono</Text>
        <TextInput
          style={styles.input}
          placeholder="000-000-0000"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Crea una contraseña"
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirma la contraseña"
          secureTextEntry
        />

        <Text style={styles.label}>Rol</Text>

        <View style={styles.checkboxContainer}>

          <View style={styles.checkboxItem}>
            <Checkbox
              value={estudiante}
              onValueChange={setEstudiante}
            />
            <Text style={styles.checkboxLabel}>Estudiante</Text>
          </View>

          <View style={styles.checkboxItem}>
            <Checkbox
              value={asesor}
              onValueChange={setAsesor}
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
              Inicia sesion
            </Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>


      </View>

    </SafeAreaView>
  );
}