import React from "react";
import { View, Text, Button, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";

import { apiFetch } from "../config/api";

export default function UploadMaterialScreen({ route }) {

  // Recibe datos del AdvisorProfile
  const { advisor } = route.params;

  // ⚠️ Temporal: luego puedes elegir materia desde lista
  const materiaSeleccionada = 2;

  const seleccionarArchivo = async () => {

    try {

      const result =
        await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
        });

      if (result.canceled) return;

      const file = result.assets[0];

      const formData = new FormData();

      formData.append("file", {
        uri: file.uri,
        name: file.name,
        type: "application/pdf",
      });

      const response = await apiFetch(

        `/contents/upload/?id_perfil=${advisor.id_perfil}&id_materia=${materiaSeleccionada}`,

        {
          method: "POST",
          body: formData,
        }

      );

      if (response.ok) {

        Alert.alert(
          "Éxito",
          "Archivo subido correctamente"
        );

      } else {

        Alert.alert(
          "Error",
          "No se pudo subir el archivo"
        );

      }

    } catch (error) {

      console.log(error);

      Alert.alert(
        "Error",
        "Ocurrió un error al subir"
      );

    }

  };

  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Text style={{ marginBottom: 20 }}>
        Subir material PDF
      </Text>

      <Button
        title="Seleccionar archivo"
        onPress={seleccionarArchivo}
      />

    </View>

  );

}