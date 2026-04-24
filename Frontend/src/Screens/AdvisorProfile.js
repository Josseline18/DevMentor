import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ActivityIndicator,
  Modal,
  StyleSheet
} from "react-native";
import {Calendar, LocaleConfig}  from "react-native-calendars";
import * as Linking from "expo-linking";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { styles, colors } from "../Styles/AdvisorProfileStyle";
import { API_URL, apiFetch } from "../config/api";

LocaleConfig.locales["es"] = {
  monthNames: [
    'Enero','Febrero','Marzo','Abril','Mayo','Junio',
    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
  ],
  monthNamesShort: [
    'Ene','Feb','Mar','Abr','May','Jun',
    'Jul','Ago','Sep','Oct','Nov','Dic'
  ],
  dayNames: [
    'Domingo','Lunes','Martes','Miércoles',
    'Jueves','Viernes','Sábado'
  ],
  dayNamesShort: [
    'Dom','Lun','Mar','Mié','Jue','Vie','Sáb'
  ],
  today: 'Hoy'
};

LocaleConfig.defaultLocale = "es";

export default function AdvisorProfile({ route, navigation }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const [loading, setLoading] = useState(true);

  const [ modalVisible, setModalVisible] = useState(false);
  const [ selectedDate, setSelectedDate] = useState('');

  const advisorParam = route?.params?.advisor || {};

  const [advisor, setAdvisor] = useState({
    name: advisorParam.name || "Asesor",
    role: advisorParam.role || "Asesor",
    especialidad: advisorParam.especialidad || "No especificada",
    materias: Array.isArray(advisorParam.materias) ? advisorParam.materias : [],
    correo: advisorParam.correo || "No disponible",
    telefono: advisorParam.telefono || "No disponible",
    materiales: [],
    estadisticas: advisorParam.estadisticas || {
      alumnosAtendidos: 0,
      calificacionPromedio: 0,
      horasAsesoradas: 0,
    },
  });

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const getAdvisorProfile = async () => {
    if (advisorParam.id_perfil) {
      const response = await apiFetch(`/advisors/${advisorParam.id_perfil}`);
      if (response.ok) return response.json();
    }

    if (advisorParam.id_usuario_auth) {
      const response = await apiFetch(`/advisors/user/${advisorParam.id_usuario_auth}`);
      if (response.ok) return response.json();
    }

    return null;
  };

  const getUserById = async (idUsuario) => {
    if (!idUsuario) return null;

    const response = await apiFetch(`/auth/users/${idUsuario}`);
    if (!response.ok) return null;
    return response.json();
  };

  const getMateriasMap = async () => {
    const response = await apiFetch("/materias");
    if (!response.ok) return {};

    const materias = await response.json();
    if (!Array.isArray(materias)) return {};

    return materias.reduce((acc, materia) => {
      acc[materia.id] = materia.nombre;
      return acc;
    }, {});
  };

  const getMaterialesPorPerfil = async (idPerfil) => {
    try {
      const response = await apiFetch(
        `/contents/perfil/${idPerfil}`
      );

      if (!response.ok) return [];

      return await response.json();
    } catch (error) {
      return [];
    }
  };

  const descargarArchivo = (idContenido) => {

    const url =
      `${API_URL}/contents/download/${idContenido}`;

    Linking.openURL(url);
  };

  const eliminarArchivo = async (idContenido) => {

    try {
      await apiFetch(
        `/contents/${idContenido}`,
        {
          method: "DELETE",
        }
      );

      // Recargar datos
      cargarDatosAsesor();

    } catch (error) {}
  };

  const cargarDatosAsesor = async () => {
    try {
      const advisorProfile = await getAdvisorProfile();

      if (!advisorProfile) {
        setLoading(false);
        return;
      }

      const [user, materiasMap, materiales] = await Promise.all([
        getUserById(advisorProfile.id_usuario_auth),
        getMateriasMap(),
        getMaterialesPorPerfil(advisorProfile.id_perfil),
      ]);

      const materiasNombres = Array.isArray(advisorProfile.materias)
        ? advisorProfile.materias.map((materia) => {
            if (typeof materia === "number") {
              return materiasMap[materia] || `Materia ${materia}`;
            }
            return materia;
          })
        : [];

      setAdvisor((prev) => ({
        ...prev,
        id_perfil: advisorProfile.id_perfil,
        id_usuario_auth: advisorProfile.id_usuario_auth,
        name: user?.nombre || prev.name,
        role: advisorProfile.area_especialidad || user?.rol || prev.role,
        especialidad: advisorProfile.especialidad || prev.especialidad,
        materias: materiasNombres.length > 0 ? materiasNombres : prev.materias,
        correo: user?.correo || prev.correo,
        telefono: user?.telefono || prev.telefono,
        materiales: materiales, // nuevo
      }));
    } catch (error) {
      // Si falla la API, se mantienen los datos de fallback.
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatosAsesor();
  }, []);

  const archivosPorMateria = useMemo(() => {
    const materias = Array.isArray(advisor.materias) ? advisor.materias : [];

    if (materias.length === 0) {
      return {
        "Sin materias registradas": [
          { id: 1, nombre: "Aun no hay material disponible.pdf", tipo: "pdf" },
        ],
      };
    }

    return materias.reduce((acc, materia, index) => {
      acc[materia] = [
        {
          id: index + 1,
          nombre: `Material base de ${materia}.pdf`,
          tipo: "pdf",
        },
      ];
      return acc;
    }, {});
  }, [advisor.materias]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ marginTop: 12, color: colors.text.secondary }}>
            Cargando perfil del asesor...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.card}>
          <View style={styles.profileHeader}>
            <Image source={require("../../assets/icons/user.png")} style={styles.avatar} />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{advisor.name}</Text>
              <Text style={styles.profileRole}>{advisor.role}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons name="school" size={20} color={colors.primary} />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Especialidad: </Text>
                {advisor.especialidad}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="book" size={20} color={colors.info} />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Materias: </Text>
                {Array.isArray(advisor.materias) && advisor.materias.length > 0
                  ? advisor.materias.join(", ")
                  : "No especificadas"}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="mail" size={20} color={colors.orange} />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Correo: </Text>
                {advisor.correo}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="call" size={20} color={colors.success} />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Telefono: </Text>
                {advisor.telefono}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionTitle}>
            <MaterialIcons name="analytics" size={24} color={colors.primary} />
            <Text style={styles.sectionTitleText}>Estadisticas</Text>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{advisor.estadisticas.alumnosAtendidos}</Text>
              <Text style={styles.statLabel}>Alumnos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{advisor.estadisticas.calificacionPromedio}</Text>
              <Text style={styles.statLabel}>Calificacion</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{advisor.estadisticas.horasAsesoradas}</Text>
              <Text style={styles.statLabel}>Horas</Text>
            </View>
          </View>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.actionButton} 
            activeOpacity={0.7} 
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="calendar" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Agendar</Text>
          </TouchableOpacity>

          <Modal
            visible={modalVisible}
            transparent={true}
            animationType = "fade"
          >
            <View style = {styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Selecciona una fecha</Text>
                <Calendar
                  onDayPress={(day) => {
                    setSelectedDate(day.dateString);
                  }}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      selectedColor: '#6C63FF'
                    }
                  }}
                />
                <TouchableOpacity
                style={styles.closeButton}
                onPress={()=> setModalVisible(false)}
                >
                  <Text style={{color: 'white'}}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              navigation.navigate(
                "UploadMaterialScreen",
                { advisor: advisor }
              )
            }
          >
            <Ionicons
              name="cloud-upload"
              size={20}
              color={colors.primary}
            />
            <Text style={styles.actionButtonText}>
              Subir material
            </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.expandableHeader}
            onPress={() => toggleSection("materiales")}
            activeOpacity={0.7}
          >
            <View style={styles.sectionTitle}>
              <Ionicons name="folder" size={24} color={colors.primary} />
              <Text style={styles.sectionTitleText}>Materiales disponibles</Text>
            </View>
            <Ionicons
              name={expandedSection === "materiales" ? "chevron-up" : "chevron-down"}
              size={24}
              color={colors.text.secondary}
            />
          </TouchableOpacity>

          {expandedSection === "materiales" && (
            <View style={styles.expandableContent}>
              {advisor.materiales && advisor.materiales.length > 0 ? (

                advisor.materiales.map((archivo) => (

                  <View
                    key={archivo.id_contenido}
                    style={styles.archivoItem}
                  >

                    <Text
                      style={styles.archivoNombre}
                      numberOfLines={1}
                    >
                      {archivo.nombre_archivo}
                    </Text>

                    <View style={{ flexDirection: "row" }}>

                      {/* Descargar */}
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() =>
                          descargarArchivo(
                            archivo.id_contenido
                          )
                        }
                      >
                        <Ionicons
                          name="download"
                          size={18}
                          color={colors.primary}
                        />
                      </TouchableOpacity>

                      {/* Eliminar */}
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() =>
                          eliminarArchivo(
                            archivo.id_contenido
                          )
                        }
                      >
                        <Ionicons
                          name="trash"
                          size={18}
                          color="red"
                        />
                      </TouchableOpacity>

                    </View>

                  </View>

                ))

              ) : (

                <Text
                  style={{
                    color: colors.text.secondary,
                    marginTop: 10,
                  }}
                >
                  No hay materiales disponibles.
                </Text>

              )}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
