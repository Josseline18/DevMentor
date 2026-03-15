import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { styles } from "../Styles/DashboardStyle";

export default function Dashboard({ navigation }) {

  const materias = [
    {
      nombre: "POO",
      descripcion: "Programación Orientada a Objetos",
      imagen: require("../../assets/images/POO.jpg")
    },
    {
      nombre: "Redes",
      descripcion: "Fundamentos de redes",
      imagen: require("../../assets/images/redes.jpg")
    },
    {
      nombre: "Bases de Datos",
      descripcion: "Modelado y consultas SQL",
      imagen: require("../../assets/images/sql.jpg")
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView>

        {materias.map((m, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("Asesores")}
          >
            <Card style={styles.card}>

              <Card.Cover source={m.imagen} style={styles.image} />

              <Card.Content>
                <Text style={styles.subject}>{m.nombre}</Text>
                <Text style={styles.description}>{m.descripcion}</Text>
              </Card.Content>

            </Card>
          </TouchableOpacity>
        ))}

      </ScrollView>



    </View>
  );
}