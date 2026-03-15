import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { styles, colors } from '../Styles/AdvisorProfileStyle';

export default function AdvisorProfile({ route, navigation }) {
  const [expandedSection, setExpandedSection] = useState(null);
  const { advisor } = route.params;

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const materias = advisor.materias.map((materia, index) => ({
    id: index + 1,
    nombre: materia,
  }));

  const archivosPorMateria = {
    [advisor.materias[0]]: [
      { id: 1, nombre: 'Material de estudio 1.pdf', tipo: 'pdf' },
      { id: 2, nombre: 'Ejercicios prácticos.pdf', tipo: 'pdf' },
    ],
    [advisor.materias[1] || 'Otra materia']: [
      { id: 3, nombre: 'Guía de referencia.pdf', tipo: 'pdf' },
    ],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        
        <View style={styles.card}>
          <View style={styles.profileHeader}>
            <Image
              source={require("../../assets/icons/user.png")}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{advisor.name}</Text>
              <Text style={styles.profileRole}>{advisor.role}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons name="star" size={20} color={colors.warning} />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Especialidad: </Text>
                {advisor.especialidad}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="time" size={20} color={colors.success} />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Experiencia: </Text>
                {advisor.experiencia} años
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="book" size={20} color={colors.info} />
              <Text style={styles.detailText}>
                <Text style={styles.detailLabel}>Materias: </Text>
                {advisor.materias.join(', ')}
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
                <Text style={styles.detailLabel}>Teléfono: </Text>
                {advisor.telefono}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionTitle}>
            <MaterialIcons name="analytics" size={24} color={colors.primary} />
            <Text style={styles.sectionTitleText}>Estadísticas</Text>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{advisor.estadisticas.alumnosAtendidos}</Text>
              <Text style={styles.statLabel}>Alumnos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{advisor.estadisticas.calificacionPromedio}</Text>
              <Text style={styles.statLabel}>Calificación</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{advisor.estadisticas.horasAsesoradas}</Text>
              <Text style={styles.statLabel}>Horas</Text>
            </View>
          </View>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <Ionicons name="calendar" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Agendar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
            <Ionicons name="chatbubble" size={20} color={colors.primary} />
            <Text style={styles.actionButtonText}>Mensaje</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity 
            style={styles.expandableHeader} 
            onPress={() => toggleSection('materias')}
            activeOpacity={0.7}
          >
            <View style={styles.sectionTitle}>
              <Ionicons name="library" size={24} color={colors.primary} />
              <Text style={styles.sectionTitleText}>Materias que imparte</Text>
            </View>
            <Ionicons 
              name={expandedSection === 'materias' ? 'chevron-up' : 'chevron-down'} 
              size={24} 
              color={colors.text.secondary} 
            />
          </TouchableOpacity>

          {expandedSection === 'materias' && (
            <View style={styles.expandableContent}>
              {materias.map((materia) => (
                <View key={materia.id} style={styles.materiaItem}>
                  <Text style={styles.materiaNombre}>{materia.nombre}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.card}>
          <TouchableOpacity 
            style={styles.expandableHeader} 
            onPress={() => toggleSection('materiales')}
            activeOpacity={0.7}
          >
            <View style={styles.sectionTitle}>
              <Ionicons name="folder" size={24} color={colors.primary} />
              <Text style={styles.sectionTitleText}>Materiales disponibles</Text>
            </View>
            <Ionicons 
              name={expandedSection === 'materiales' ? 'chevron-up' : 'chevron-down'} 
              size={24} 
              color={colors.text.secondary} 
            />
          </TouchableOpacity>

          {expandedSection === 'materiales' && (
            <View style={styles.expandableContent}>
              {Object.entries(archivosPorMateria).map(([materia, archivos]) => (
                <View key={materia} style={styles.archivosMateria}>
                  <Text style={styles.archivosMateriaTitle}>{materia}</Text>
                  <View style={styles.archivosLista}>
                    {archivos.map((archivo) => (
                      <View key={archivo.id} style={styles.archivoItem}>
                        <Text style={styles.archivoNombre} numberOfLines={1}>
                          {archivo.nombre}
                        </Text>
                        <TouchableOpacity style={styles.iconButton}>
                          <Ionicons name="download" size={18} color={colors.primary} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}