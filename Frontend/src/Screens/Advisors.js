import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";

const advisors = [
  {
    id: "1",
    name: "Josseline Coutiño",
    role: "Estudiante del 6° M"
  },
  {
    id: "2",
    name: "Limber de Jesús",
    role: "Profesor de la facultad de sistemas"
  },
  {
    id: "3",
    name: "César Iván",
    role: "Estudiante del 6° M"
  },
  {
    id: "5",
    name: "Monserrat Garcia",
    role: "Estudiante del 6° M"
  }
];

export default function Asesores() {

  const renderItem = ({ item }) => (
    <View style={styles.card}>

      <Image
        source={require("../../assets/icons/user.png")}
        style={styles.avatar}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>

    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Asesores</Text>

      <FlatList
        data={advisors}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    paddingTop: 60,
    paddingHorizontal: 20
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd"
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 15
  },

  name: {
    fontSize: 16,
    fontWeight: "600"
  },

  role: {
    color: "gray",
    marginTop: 3
  }

});