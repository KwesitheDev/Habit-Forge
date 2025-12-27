import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate("Login");
  };

  return (
    <LinearGradient colors={["#f0fdfa", "#ffffff"]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/mindfulnes.jpeg")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Build Lasting Habits</Text>
              <Text style={styles.description}>
                Transform your daily routine with AI-powered insights, smart
                reminders, and personalized coaching to help you achieve your
                wellness goals.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 48,
    justifyContent: "space-between",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 288,
    height: 288,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomSection: {
    width: "100%",
    gap: 24,
  },
  textContainer: {
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0f766e",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#475569",
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#0d9488",
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomeScreen;
