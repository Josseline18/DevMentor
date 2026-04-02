import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";

import Dashboard from "./src/Screens/Dashboard";
import Advisors from "./src/Screens/Advisors";
import Login from "./src/Screens/Login";
import Register from "./src/Screens/Register";
import AdvisorProfile from "./src/Screens/AdvisorProfile";
import ReviewScreen from "./src/Screens/ReviewScreen";
import WriteReviewScreen from "./src/Screens/WriteReviewScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DevMentor"
          component={Dashboard}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{
                  marginRight: 3,
                  marginLeft: 3,
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                  borderRadius: 6,
                  justifyContent: "center",
                  alignItems: "center",
    
                }}
              >
                <Text style={{ color: "#1E5BE0", fontWeight: "bold" }}>
                  Login
                </Text>
              </TouchableOpacity>
            )
          })}
        />

        <Stack.Screen 
          name="Asesores" 
          component={Advisors}
          options={{ title: "Asesores" }}
        />

        <Stack.Screen
          name="AdvisorProfile" 
          component={AdvisorProfile} 
          options={{ title: "Perfil del Asesor" }}
        />

        <Stack.Screen
          name="ReviewScreen"
          component={ReviewScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="WriteReviewScreen"
          component={WriteReviewScreen}
          options={{ headerShown: false }}
        />
        

        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ headerShown: false }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}