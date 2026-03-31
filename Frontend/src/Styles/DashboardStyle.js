import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    paddingTop: 0,
  },
  contentConteiner: {
    paddingHorizontal: 10
  },

  scrollContent: {
    paddingBottom: 24
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20
  },

  carouselContainer: {
    marginTop: 0,
    marginBottom: 30,
  },

  carouselItem: {
    width: width,
    height: 200,
    overflow: "hidden",
  },

  carouselImage: {
    width: "100%",
    height: "100%",
  },

  card: {
    width: 350,
    marginRight: 15,
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden"
  },

  image: {
    height: 130
  },

  subject: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10
  },

  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 5
  },

  reviewsButton: {
    backgroundColor: "#1E5BE0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    marginBottom: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3
  },

  reviewsButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700"
  }

});