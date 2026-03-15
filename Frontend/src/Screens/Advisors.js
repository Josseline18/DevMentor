import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";

const advisors = [
  {
    id: "1",
    name: "Josseline Coutiño",
    role: "Estudiante del 6° M",
    especialidad: "Ciencias de la Computación",
    experiencia: 2,
    materias: ["Programación", "Base de Datos"],
    correo: "josseline@unach.mx",
    telefono: "961-123-4567",
    estadisticas: {
      alumnosAtendidos: 45,
      calificacionPromedio: 4.5,
      horasAsesoradas: 120
    }
  },
  {
    id: "2",
    name: "Limber de Jesús",
    role: "Profesor de la facultad de sistemas",
    especialidad: "Ingeniería de Software",
    experiencia: 10,
    materias: ["Arquitectura de Software", "Patrones de Diseño"],
    correo: "limber@unach.mx",
    telefono: "961-234-5678",
    estadisticas: {
      alumnosAtendidos: 200,
      calificacionPromedio: 4.9,
      horasAsesoradas: 500
    }
  },
  {
    id: "3",
    name: "César Iván",
    role: "Estudiante del 6° M",
    especialidad: "Redes de Computadoras",
    experiencia: 3,
    materias: ["Redes", "Seguridad Informática"],
    correo: "cesar@unach.mx",
    telefono: "961-345-6789",
    estadisticas: {
      alumnosAtendidos: 60,
      calificacionPromedio: 4.6,
      horasAsesoradas: 150
    }
  },
  {
    id: "4",
    name: "Monserrat Garcia",
    role: "Estudiante del 6° M",
    especialidad: "Bases de Datos",
    experiencia: 3,
    materias: ["SQL", "NoSQL", "Modelado de Datos"],
    correo: "monserrat@unach.mx",
    telefono: "961-456-7890",
    estadisticas: {
      alumnosAtendidos: 55,
      calificacionPromedio: 4.7,
      horasAsesoradas: 130
    }
  }
];

export default function Advisors({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('AdvisorProfile', { advisor: item })}
      activeOpacity={0.7}
    >
      <Image
        source={require("../../assets/icons/user.png")}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asesores</Text>
      <FlatList
        data={advisors}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    paddingTop: 20,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#0f172a',
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: '#e6f3ff',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: '#0f172a',
  },
  role: {
    color: "#64748b",
    marginTop: 3,
    fontSize: 13,
  }
});