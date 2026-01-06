import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";
import { useHabits } from "../context/HabitsContext";
import { CalculateStreak } from "../utils/streak";
import { generateInsight } from "../utils/insights";
import { setupTf as initTF } from "../utils/tfSetup";
import { Swipeable } from "react-native-gesture-handler";
import { Alert } from "react-native";
import styles from "../styles/DashboardStyles";

// Map category ID → emoji for display
const CATEGORY_EMOJIS = {
  health: "❤️",
  mind: "🧘",
  productivity: "⚡",
  fitness: "💪",
  learning: "📚",
  social: "👥",
};

// Insight card gradient themes
const INSIGHT_THEMES = [
  { colors: ["#f59e0b", "#f97316"], icon: "bulb" },
  { colors: ["#8b5cf6", "#a855f7"], icon: "sparkles" },
  { colors: ["#06b6d4", "#0891b2"], icon: "trophy" },
  { colors: ["#ec4899", "#d946ef"], icon: "rocket" },
];

export default function DashboardScreen({ navigation }) {
  const { user } = useAuth();

  // Use the habits context instead of local state
  const {
    habits,
    completionMap,
    loading,
    toggleHabitCompletion,
    deleteHabitById,
  } = useHabits();

  const [insight, setInsight] = useState("Loading insights...");
  const [insightLoading, setInsightLoading] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(0);

  // proof TF.js works
  useEffect(() => {
    initTF();
  }, []);

  // Generate insights
  useEffect(() => {
    if (habits.length > 0 && Object.keys(completionMap).length > 0) {
      setInsightLoading(true);
      const newInsight = generateInsight(habits, completionMap);
      setInsight(newInsight);
      setInsightLoading(false);
      setCurrentTheme((prev) => (prev + 1) % INSIGHT_THEMES.length);
    }
  }, [habits, completionMap]);

  //  Use context function for toggling
  const toggleHabit = async (habitId) => {
    await toggleHabitCompletion(habitId);
  };

  // confirm delete
  const confirmDelete = (habitId) => {
    Alert.alert(
      "Delete Habit",
      "Are you sure you want to delete this habit? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteHabitById(habitId),
        },
      ]
    );
  };

  // Render a delete action for a habit item
  const renderRightActions = (habitId) => (
    <TouchableOpacity
      style={styles.deleteAction}
      onPress={() => confirmDelete(habitId)}
      activeOpacity={0.8}
    >
      <Ionicons name="trash" size={22} color="#fff" />
      <Text style={styles.deleteActionText}>Delete</Text>
    </TouchableOpacity>
  );

  // Generate display data
  const getDisplayData = (habit) => {
    const dates = completionMap[habit.id] || [];
    const streak = CalculateStreak(dates);
    const todayStr = new Date().toISOString().slice(0, 10);
    const completedToday = dates.includes(todayStr);

    return {
      name: habit.name,
      streak,
      progress: streak > 0 ? Math.round(Math.min(100, (streak / 30) * 100)) : 0,
      completed: completedToday,
      icon:
        habit.categories?.length > 0
          ? CATEGORY_EMOJIS[habit.categories[0]] || "🎯"
          : "🎯",
      color: habit.color ? `${habit.color}22` : "#e0f2fe",
    };
  };

  const totalStreak = habits.reduce((sum, h) => {
    const dates = completionMap[h.id] || [];
    const streak = CalculateStreak(dates);
    return sum + streak;
  }, 0);

  const theme = INSIGHT_THEMES[currentTheme];

  // ✅ Show loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0d9488" />
          <Text style={styles.loadingText}>Loading your habits...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.headerTitle}>HabitForge</Text>
              <Text style={styles.headerSubtitle}>
                Keep building your best self
              </Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="person" size={24} color="#0d9488" />
            </TouchableOpacity>
          </View>

          <LinearGradient
            colors={["#14b8a6", "#06b6d4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.statsCard}
          >
            <View style={styles.statsContent}>
              <View>
                <Text style={styles.statsLabel}>Current Streak</Text>
                <View style={styles.streakRow}>
                  <Ionicons name="flame" size={32} color="#fff" />
                  <Text style={styles.streakNumber}>{totalStreak}</Text>
                  <Text style={styles.streakDays}>days</Text>
                </View>
              </View>
              <View style={styles.totalHabits}>
                <Text style={styles.statsLabel}>Total Habits</Text>
                <Text style={styles.totalNumber}>{habits.length}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Habits List */}
        <ScrollView
          style={styles.habitsList}
          contentContainerStyle={styles.habitsListContent}
          showsVerticalScrollIndicator={false}
        >
          {/* AI Insight Card */}
          {habits.length > 0 && (
            <LinearGradient
              colors={theme.colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.insightCard}
            >
              <View style={styles.insightHeader}>
                <View style={styles.insightIconContainer}>
                  <Ionicons name={theme.icon} size={20} color="#fff" />
                </View>
                <Text style={styles.insightTitle}>AI Motivational Insight</Text>
              </View>

              {insightLoading ? (
                <View style={styles.insightLoadingContainer}>
                  <ActivityIndicator color="#fff" />
                  <Text style={styles.insightLoadingText}>
                    Analyzing your progress...
                  </Text>
                </View>
              ) : (
                <Text style={styles.insightText}>{insight}</Text>
              )}

              <View style={styles.insightFooter}>
                <Ionicons name="heart" size={14} color="#fff" />
                <Text style={styles.insightFooterText}>Powered by AI</Text>
              </View>
            </LinearGradient>
          )}

          {/* Habits Cards */}
          {habits.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="rocket-outline" size={64} color="#cbd5e1" />
              <Text style={styles.emptyTitle}>Start Your Journey</Text>
              <Text style={styles.emptyText}>
                No habits yet. Tap the + button below to create your first habit
                and start building a better you!
              </Text>
            </View>
          ) : (
            habits.map((habit) => {
              const display = getDisplayData(habit);
              return (
                <Swipeable
                  key={habit.id}
                  renderRightActions={() => renderRightActions(habit.id)}
                  overshootRight={false}
                >
                  <View key={habit.id} style={styles.habitCard}>
                    <View style={styles.habitRow}>
                      <View
                        style={[
                          styles.habitIcon,
                          { backgroundColor: display.color },
                        ]}
                      >
                        <Text style={styles.habitEmoji}>{display.icon}</Text>
                      </View>

                      <View style={styles.habitInfo}>
                        <Text style={styles.habitName}>{display.name}</Text>
                        <View style={styles.habitMeta}>
                          <View style={styles.metaItem}>
                            <Ionicons name="flame" size={14} color="#f97316" />
                            <Text style={styles.metaText}>
                              {display.streak} days
                            </Text>
                          </View>
                          <Text style={styles.metaDot}>•</Text>
                          <Text style={styles.metaText}>
                            {display.progress}% progress
                          </Text>
                        </View>
                      </View>

                      <TouchableOpacity
                        onPress={() => toggleHabit(habit.id)}
                        style={[
                          styles.checkButton,
                          display.completed
                            ? styles.checkButtonCompleted
                            : styles.checkButtonUncompleted,
                        ]}
                      >
                        {display.completed && (
                          <Ionicons name="checkmark" size={18} color="#fff" />
                        )}
                      </TouchableOpacity>
                    </View>

                    <View style={styles.progressBarContainer}>
                      <View
                        style={[
                          styles.progressBar,
                          { width: `${display.progress}%` },
                        ]}
                      />
                    </View>
                  </View>
                </Swipeable>
              );
            })
          )}
        </ScrollView>

        {/* FAB */}
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateHabit")}
          style={styles.fab}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Bottom Nav - ✅ No need to pass data anymore */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="home" size={24} color="#0d9488" />
            <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Analytics")}
          >
            <Ionicons name="bar-chart" size={24} color="#94a3b8" />
            <Text style={styles.navLabel}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons name="person" size={24} color="#94a3b8" />
            <Text style={styles.navLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
