import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";

import Dashboard from "./src/Screens/Dashboard";
import Advisors from "./src/Screens/Advisors";
import Login from "./src/Screens/Login";
import Register from "./src/Screens/Register";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
          name="Dashboard"
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
                  alignItems: "center"
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
          name="Advisors" 
          component={Advisors} 
        />

        <Stack.Screen 
          name="Login" 
          component={Login} 
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