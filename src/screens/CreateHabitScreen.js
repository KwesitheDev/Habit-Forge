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
import { scheduleHabitReminder } from "../utils/notifications";
import styles from "../styles/CreateHabitScreenStyles";

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
      const docRef = await addHabit(user.uid, {
        name: name.trim(),
        description: description.trim() || null,
        frequency,
        reminderTime: reminderTime || null,
        categories: selectedCategories,
        color: selectedColor,
      });

      const newHabit = {
        id: docRef.id,
        name: name.trim(),
        description: description.trim() || null,
        frequency,
        reminderTime: reminderTime || null,
        categories: selectedCategories,
        color: selectedColor,
      };
      await scheduleHabitReminder(newHabit);

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
