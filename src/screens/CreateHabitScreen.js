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
import { useAuth } from "../context/AuthContext";
import { addHabit } from "../services/firestore";

const CATEGORIES = [
  { id: "health", label: "Health", emoji: "❤️" },
  { id: "mind", label: "Mindfulness", emoji: "🧘" },
  { id: "productivity", label: "Productivity", emoji: "⚡" },
  { id: "fitness", label: "Fitness", emoji: "💪" },
  { id: "learning", label: "Learning", emoji: "📚" },
  { id: "social", label: "Social", emoji: "👥" },
];

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

export default function AddHabitScreen({ navigation }) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [reminderTime, setReminderTime] = useState("08:00");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#0d9488"); // default teal
  const [loading, setLoading] = useState(false);

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Habit name is required");
      return;
    }
    if (!user) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    setLoading(true);
    try {
      await addHabit(user.uid, {
        name: name.trim(),
        description: description.trim() || null,
        frequency,
        reminderTime: reminderTime || null,
        categories: selectedCategories,
        color: selectedColor,
      });

      Alert.alert("Success", "Habit created successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Habit creation error:", error);
      Alert.alert("Error", error.message || "Failed to create habit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#0d9488" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Habit</Text>
        <Text style={styles.headerSubtitle}>
          Set up your habit details and preferences
        </Text>
      </View>

      {/* Form */}
      <ScrollView
        style={styles.form}
        contentContainerStyle={styles.formContent}
      >
        <View style={styles.section}>
          <Text style={styles.label}>Habit Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Morning Exercise"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Why is this habit important to you?"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            placeholderTextColor="#94a3b8"
          />
        </View>

        <View style={styles.section}>
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
                <Text
                  style={[
                    styles.frequencyText,
                    frequency === opt && styles.frequencyTextActive,
                  ]}
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Reminder Time</Text>
          <View style={styles.timeInputContainer}>
            <Ionicons
              name="time-outline"
              size={20}
              color="#94a3b8"
              style={styles.timeIcon}
            />
            <TextInput
              style={styles.timeInput}
              placeholder="08:00"
              value={reminderTime}
              onChangeText={setReminderTime}
              placeholderTextColor="#94a3b8"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryButton,
                  selectedCategories.includes(cat.id) &&
                    styles.categoryButtonActive,
                ]}
                onPress={() => toggleCategory(cat.id)}
              >
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                <Text
                  style={[
                    styles.categoryLabel,
                    selectedCategories.includes(cat.id) &&
                      styles.categoryLabelActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Color Selection Section */}
        <View style={styles.section}>
          <Text style={styles.label}>Color</Text>
          <View style={styles.colorGrid}>
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(color)}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  selectedColor === color && styles.colorSelected,
                ]}
              />
            ))}
          </View>
        </View>

        <View style={styles.insightCard}>
          <View style={styles.insightContent}>
            <Ionicons
              name="sparkles"
              size={20}
              color="#a855f7"
              style={styles.insightIcon}
            />
            <View style={styles.insightText}>
              <Text style={styles.insightTitle}>Motivational Insight</Text>
              <Text style={styles.insightQuote}>
                "The secret of getting ahead is getting started. Small daily
                improvements lead to stunning results."
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.createButton, loading && styles.createButtonDisabled]}
          onPress={handleCreate}
          disabled={loading}
        >
          <Text style={styles.createButtonText}>
            {loading ? "Creating..." : "Create Habit"}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f766e",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748b",
  },
  form: {
    flex: 1,
  },
  formContent: {
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 16,
    color: "#0f172a",
  },
  textArea: {
    height: 80,
    paddingTop: 12,
  },
  frequencyContainer: {
    flexDirection: "row",
    gap: 12,
  },
  frequencyButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    alignItems: "center",
  },
  frequencyButtonActive: {
    borderColor: "#0d9488",
    backgroundColor: "#f0fdfa",
  },
  frequencyText: {
    fontSize: 14,
    color: "#64748b",
  },
  frequencyTextActive: {
    color: "#0f766e",
    fontWeight: "600",
  },
  timeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 16,
  },
  timeIcon: {
    marginRight: 12,
  },
  timeInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#0f172a",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryButton: {
    width: "47%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  categoryButtonActive: {
    borderColor: "#0d9488",
    backgroundColor: "#f0fdfa",
  },
  categoryEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryLabel: {
    fontSize: 14,
    color: "#334155",
  },
  categoryLabelActive: {
    color: "#0f766e",
    fontWeight: "600",
  },
  // Color picker styles
  colorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
  },
  colorOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  colorSelected: {
    borderWidth: 4,
    borderColor: "#ffffff",
  },
  insightCard: {
    backgroundColor: "#faf5ff",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e9d5ff",
    marginTop: 8,
  },
  insightContent: {
    flexDirection: "row",
  },
  insightIcon: {
    marginTop: 4,
    marginRight: 12,
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#581c87",
    marginBottom: 4,
  },
  insightQuote: {
    fontSize: 13,
    color: "#7c3aed",
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  createButton: {
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
  createButtonDisabled: {
    opacity: 0.7,
  },
  createButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
