import React from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
const HomeScreen = () => {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Habit Forge</Text>
      <Pressable
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "#6200EE",
          borderRadius: 5,
        }}
        onPress={() => {
          goToLogin();
        }}
      >
        <Text style={{ color: "#FFFFFF" }}>Go to Login</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
