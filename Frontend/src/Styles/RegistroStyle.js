import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
  },

  header: {
    height: "35%",
    backgroundColor: "#D9E3F0",
    justifyContent: "center",
    alignItems: "center",
  },

  headerImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  formContainer: {
    flex: 1,
    padding: 25,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    marginBottom: 15,
  },

  link: {
    color: "#1E5BE0",
    fontSize: 13,
    marginBottom: 20,
  },

  button: {
    height: 50,
    backgroundColor: "#1E5BE0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  registerContainer: {
    marginTop: 15,
    alignItems: "center",
  },

  registerText: {
    fontSize: 13,
  },

  registerLink: {
    color: "#1E5BE0",
    fontWeight: "bold",
  },

  checkboxContainer: {
    marginTop: 10,
    marginBottom: 20,
  },

  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  checkboxLabel: {
    marginLeft: 10,
  },
});

export default styles;