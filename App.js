import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import { AuthProvider } from "./src/context/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import CreateHabitScreen from "./src/screens/CreateHabitScreen";
import { registerForPushNotificationsAsync } from "./src/utils/notifications";
import AnalyticsScreen from "./src/screens/AnalyticsScreen";
import { HabitsProvider } from "./src/context/HabitContext";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  return (
    <AuthProvider>
      <HabitsProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="OnBoarding"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="OnBoarding" component={HomeScreen} />
            <Stack.Screen name="CreateHabit" component={CreateHabitScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Analytics" component={AnalyticsScreen} />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </HabitsProvider>
    </AuthProvider>
  );
}
