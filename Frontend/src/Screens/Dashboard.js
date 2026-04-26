import React, { useRef, useEffect, useState } from "react";
import { View,Text,ScrollView,TouchableOpacity,FlatList,Dimensions,Image} from "react-native";
import { Card } from "react-native-paper";
import { styles } from "../Styles/DashboardStyle";
import { apiFetch } from "../config/api";
import { use } from "react/cjs/react.production";

const { width } = Dimensions.get("window");

export default function Dashboard({ navigation }) {

  const carouselImages = [
    require("../../assets/images/tutorias.jpg"),
    require("../../assets/images/tutorias2.jpg"),
    require("../../assets/images/tutorias3.jpg")
  ];

  const [materias, setMaterias] = useState([]);
  const materias9 = materias.filter(m => m.semestre === 9);
  const materias8 = materias.filter(m => m.semestre === 8);
  const materias7 = materias.filter(m => m.semestre === 7);
  const materias6 = materias.filter(m => m.semestre === 6);
  const materias5 = materias.filter(m => m.semestre === 5);
  const materias4 = materias.filter(m => m.semestre === 4);
  const materias3 = materias.filter(m => m.semestre === 3);
  const materias2 = materias.filter(m => m.semestre === 2);
  const materias1 = materias.filter(m => m.semestre === 1);

  const [lenguajes, setLenguajes] = useState([]);

  useEffect(() => {
    apiFetch("/lenguajes")
      .then((response) => response.json())
      .then((data) => {
        setLenguajes(data);
      })
      .catch((error) => {
        console.error("Error al obtener lenguajes", error);
      });
  }, []);

  useEffect(() => {
    apiFetch("/materias")
      .then((response) => response.json())
      .then((data) => {
        setMaterias(data);
      })
      .catch((error) => {
        console.error("Error al obtener materias", error);
      });
  }, []);


  /*const lenguajes = [
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
  ];*/

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
    }, 5000); 

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

            <View style={styles.sectionHeader}>
              <View style={styles.line} />
              <Text style={styles.sectionTitle}>Lenguajes de programación</Text>
            </View>

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
            
            <View style={styles.sectionHeader}>
              <View style={styles.line} />
              <Text style={styles.sectionTitle}>Materias 6° semestre LIDTS</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 6, paddingRight: 20 }}
            >
              {materias6.map((m, index) => (
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

            <View style={styles.sectionHeader}>
              <View style={styles.line} />
              <Text style={styles.sectionTitle}>Materias 5° semestre</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 6, paddingRight: 20 }}
            >
              {materias5.map((m, index) => (
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

            <View style={styles.sectionHeader}>
              <View style={styles.line} />
              <Text style={styles.sectionTitle}>Materias 4° semestre</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 6, paddingRight: 20 }}
            >
              {materias4.map((m, index) => (
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

            <View style={styles.sectionHeader}>
              <View style={styles.line} />
              <Text style={styles.sectionTitle}>Materias 3° semestre</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 6, paddingRight: 20 }}
            >
              {materias3.map((m, index) => (
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

            <View style={styles.sectionHeader}>
              <View style={styles.line} />
              <Text style={styles.sectionTitle}>Materias 2° semestre</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 6, paddingRight: 20 }}
            >
              {materias2.map((m, index) => (
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

            <View style={styles.sectionHeader}>
              <View style={styles.line} />
              <Text style={styles.sectionTitle}>Materias 1° semestre</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 6, paddingRight: 20 }}
            >
              {materias1.map((m, index) => (
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

    </View>
  );
}