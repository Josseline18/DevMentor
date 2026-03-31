import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image
} from "react-native";
import { Card } from "react-native-paper";
import { styles } from "../Styles/DashboardStyle";

const { width } = Dimensions.get("window");

export default function Dashboard({ navigation }) {

  const carouselImages = [
    require("../../assets/images/tutorias.jpg"),
    require("../../assets/images/tutorias2.jpg"),
    require("../../assets/images/tutorias3.jpg")
  ];

  const materias = [
    {
      nombre: "Compiladores",
      descripcion: "Compiladores",
      imagen: require("../../assets/images/POO.jpg")
    },
    {
      nombre: "Redes",
      descripcion: "Protocolo de enrutamiento",
      imagen: require("../../assets/images/redes.jpg")
    },
    {
      nombre: "Contabilidad",
      descripcion: "Contabilidad",
      imagen: require("../../assets/images/sql.jpg")
    },
    {
      nombre: "Modelos y metodología",
      descripcion: "Metodologías de desarrollo",
      imagen: require("../../assets/images/sql.jpg")
    },
    {
      nombre: "Taller de desarrollo IV",
      descripcion: "Desarrollo avanzado",
      imagen: require("../../assets/images/sql.jpg")
    },
    {
      nombre: "Inglés",
      descripcion: "Inglés 5",
      imagen: require("../../assets/images/sql.jpg")
    }
  ];

  const lenguajes = [
    {
      nombre: "Python",
      descripcion: "Lenguaje versátil",
      imagen: require("../../assets/images/p.jpg")
    },
    {
      nombre: "Java",
      descripcion: "Programación orientada a objetos",
      imagen: require("../../assets/images/java.png")
    },
    {
      nombre: "C++",
      descripcion: "Alto rendimiento",
      imagen: require("../../assets/images/c++.png")
    }
  ];

  const scrollRef = useRef(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current =
        (currentIndex.current + 1) % carouselImages.length;

      scrollRef.current?.scrollTo({
        x: width * currentIndex.current,
        animated: true
      });
    }, 5000); // 🔥 cambia aquí la velocidad

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>

      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
          
            <View style={styles.carouselContainer}>
              <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
              >
                {carouselImages.map((image, index) => (
                  <View key={index} style={styles.carouselItem}>
                    <Image
                      source={image}
                      style={styles.carouselImage}
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </ScrollView>
            </View>

            <View style={styles.contentConteiner}>

            <Text style={styles.title}>Materias 6to semestre</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 6, paddingRight: 20 }}
            >
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

            <Text style={styles.title}>Lenguajes de programación</Text>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 6, paddingRight: 20 }}
            >
              {lenguajes.map((m, index) => (
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
          </>      
        }
      />

      <TouchableOpacity
        style={styles.reviewsButton}
        activeOpacity={0.85}
        onPress={() => navigation.navigate("ReviewScreen")}
      >
        <Text style={styles.reviewsButtonText}>Reseñas</Text>
      </TouchableOpacity>

    </View>
  );
}