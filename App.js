import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

import Welcome from "./src/pages/Welcome";
import Timer from "./src/pages/Timer";
import Quizzes from "./src/pages/Quizzes";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={Welcome}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Timer"
            component={Timer}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="timer" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Quiz"
            component={Quizzes}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="quiz" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
