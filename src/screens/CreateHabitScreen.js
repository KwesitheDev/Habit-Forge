import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { addHabit } from "../services/firestore";
import { useNavigation } from "@react-navigation/native";

const COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#84cc16",
  "#10b981",
  "#0d9488",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
];

export default function CreateHabitScreen() {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [reminderTime, setReminderTime] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[5]); // default teal
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Habit name is required");
      return;
    }
    setLoading(true);
    try {
      await addHabit({
        name: name.trim(),
        frequency,
        reminderTime: reminderTime || null,
        color: selectedColor,
      });
      Alert.alert("Success", "Habit created!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to create habit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Create New Habit</Text>

      <TextInput
        style={styles.input}
        placeholder="Habit name (e.g., Drink water)"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Frequency</Text>
      <View style={styles.frequencyContainer}>
        {["daily", "weekly", "custom"].map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[
              styles.frequencyButton,
              frequency === opt && styles.frequencyButtonActive,
            ]}
            onPress={() => setFrequency(opt)}
          >
            <Text style={frequency === opt && styles.frequencyTextActive}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Reminder time (optional, e.g., 08:00)"
        value={reminderTime}
        onChangeText={setReminderTime}
      />

      <Text style={styles.label}>Color</Text>
      <View style={styles.colorGrid}>
        {COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorOption,
              { backgroundColor: color },
              selectedColor === color && styles.colorSelected,
            ]}
            onPress={() => setSelectedColor(color)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.createButton, loading && styles.createButtonDisabled]}
        onPress={handleCreate}
        disabled={loading}
      >
        <Text style={styles.createButtonText}>
          {loading ? "Creating..." : "Create Habit"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  content: { padding: 24 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f766e",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    paddingLeft: 48,
    paddingRight: 48,
    paddingVertical: 16,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 16,
    color: "#0f172a",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 8,
    color: "#0f172a",
  },
  frequencyContainer: { flexDirection: "row", gap: 12, marginBottom: 24 },
  frequencyButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  frequencyButtonActive: { backgroundColor: "#0d9488", borderColor: "#0d9488" },
  frequencyTextActive: { color: "#ffffff", fontWeight: "600" },
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 32,
  },
  colorOption: { width: 44, height: 44, borderRadius: 22 },
  colorSelected: {
    borderWidth: 4,
    borderColor: "#ffffff",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  createButton: {
    backgroundColor: "#0d9488",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  createButtonDisabled: { opacity: 0.7 },
  createButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
});
