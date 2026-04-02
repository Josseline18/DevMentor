import React, { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { styles, ui } from "../Styles/writeReviewStyles";

const usuarioActual = {
  id: 1,
  nombre: "Camila Yazmin Coutiño",
};

const materias = [
  { id: 1, nombre: "Calculo Integral" },
  { id: 2, nombre: "Programacion Orientada a Objetos" },
  { id: 3, nombre: "Bases de Datos" },
  { id: 4, nombre: "Redes de Computadoras" },
];

const asesores = [
  { id: 1, nombre: "Cesar Ivan Jimenez" },
  { id: 2, nombre: "Limber de Jesus Morales" },
  { id: 3, nombre: "Monserrat Garcia" },
  { id: 4, nombre: "Edgar Alejandro Rodriguez" },
];

function SelectorModal({ visible, title, options, onClose, onSelect }) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{title}</Text>
          <FlatList
            data={options}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalOption}
                activeOpacity={0.8}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.modalOptionText}>{item.nombre}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.modalSeparator} />}
          />
        </View>
      </Pressable>
    </Modal>
  );
}

function RatingStars({ rating, onChange }) {
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map((value) => (
        <TouchableOpacity
          key={value}
          activeOpacity={0.75}
          onPress={() => onChange(value)}
          style={styles.starTouch}
        >
          <Ionicons
            name={value <= rating ? "star" : "star-outline"}
            size={ui.star}
            color={value <= rating ? "#1E5BE0" : "#C0C5D2"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function WriteReviewScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [materia, setMateria] = useState(materias[0]);
  const [asesor, setAsesor] = useState(asesores[0]);
  const [calificacion, setCalificacion] = useState(0);
  const [comentario, setComentario] = useState("");
  const [modalType, setModalType] = useState(null);

  const modalTitle = useMemo(() => {
    if (modalType === "materia") return "Selecciona materia";
    if (modalType === "asesor") return "Selecciona asesor";
    return "";
  }, [modalType]);

  const modalData = useMemo(() => {
    if (modalType === "materia") return materias;
    if (modalType === "asesor") return asesores;
    return [];
  }, [modalType]);

  const handleSelect = (item) => {
    if (modalType === "materia") {
      setMateria(item);
      return;
    }

    if (modalType === "asesor") {
      setAsesor(item);
    }
  };

  const payloadPreview = {
    idUsuario: usuarioActual.id,
    idAsesor: asesor?.id,
    idMateria: materia?.id,
    calificacion,
    comentario,
  };

  void payloadPreview;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View style={styles.container}>
          <View style={[styles.header, { paddingTop: insets.top + 6 }]}> 
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.goBack()}
              style={styles.headerIconButton}
            >
              <Ionicons name="chevron-back" size={ui.iconBack} color="#1E5BE0" />
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Reseña en curso</Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => navigation.navigate("ReviewScreen")}
              style={styles.headerIconButton}
            >
              <Ionicons name="close" size={ui.iconClose} color="#1E5BE0" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.formScroll}
            contentContainerStyle={styles.formScrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.formSection}>
              <Text style={styles.label}>Usuario</Text>
              <View style={styles.readOnlyInput}>
                <Text style={styles.readOnlyText}>{usuarioActual.nombre}</Text>
              </View>

              <Text style={styles.label}>Materia</Text>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.selectorInput}
                onPress={() => setModalType("materia")}
              >
                <Text style={styles.selectorText}>{materia?.nombre}</Text>
                <Ionicons name="chevron-down" size={ui.iconSelect} color="#8D93A3" />
              </TouchableOpacity>

              <Text style={styles.label}>Asesor</Text>
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.selectorInput}
                onPress={() => setModalType("asesor")}
              >
                <Text style={styles.selectorText}>{asesor?.nombre}</Text>
                <Ionicons name="chevron-down" size={ui.iconSelect} color="#8D93A3" />
              </TouchableOpacity>

              <View style={styles.ratingRow}>
                <Text style={styles.label}>Calificación promedio</Text>
                <RatingStars rating={calificacion} onChange={setCalificacion} />
              </View>

              <TextInput
                style={styles.commentInput}
                multiline
                placeholder="Tell us everything."
                placeholderTextColor="#9DA3B4"
                value={comentario}
                onChangeText={setComentario}
                textAlignVertical="top"
              />
            </View>
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}> 
            <TouchableOpacity activeOpacity={1} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Guardar reseña</Text>
              <Ionicons name="checkmark" size={ui.iconSave} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      <SelectorModal
        visible={Boolean(modalType)}
        title={modalTitle}
        options={modalData}
        onClose={() => setModalType(null)}
        onSelect={handleSelect}
      />
    </SafeAreaView>
  );
}
