import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "./pages/Welcome";
import Timer from "./pages/Timer";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Welcome}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Timer"
          component={Timer}
          options={{ title: "Pomodoro" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
