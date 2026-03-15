import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "./src/Screens/Dashboard";
import Advisors from "./src/Screens/Advisors";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="Advisors" 
          component={Advisors} 
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}