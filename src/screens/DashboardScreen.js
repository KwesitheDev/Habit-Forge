import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";
import {
  subscribeToHabits,
  toggleCompletion,
  getCompletionDates,
} from "../services/firestore";
import { Alert } from "react-native";
import { CalculateStreak } from "../utils/streak";

// Map category ID → emoji for display
const CATEGORY_EMOJIS = {
  health: "❤️",
  mind: "🧘",
  productivity: "⚡",
  fitness: "💪",
  learning: "📚",
  social: "👥",
};

export default function DashboardScreen({ navigation }) {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [completionMap, setCompletionMap] = useState({});

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToHabits(user.uid, setHabits);
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user || habits.length === 0) return;

    const fetchCompletions = async () => {
      const map = {};
      for (const habit of habits) {
        map[habit.id] = await getCompletionDates(user.uid, habit.id);
      }
      setCompletionMap(map);
    };
    fetchCompletions();
  }, [habits, user]);

  const toggleHabit = async (habitId) => {
    const todayStr = new Date().toISOString().slice(0, 10);
    await toggleCompletion(user.uid, habitId, todayStr);

    // Optimistic update
    setCompletionMap((prev) => {
      const dates = prev[habitId] || [];
      const newDates = dates.includes(todayStr)
        ? dates.filter((d) => d !== todayStr)
        : [...dates, todayStr].sort();
      return { ...prev, [habitId]: newDates };
    });
  };

  const getDisplayData = (habit) => {
    const dates = completionMap[habit.id] || [];
    const streak = CalculateStreak(dates);
    const todayStr = new Date().toISOString().slice(0, 10);
    const completedToday = dates.includes(todayStr);

    return {
      name: habit.name,
      streak,
      progress: streak > 0 ? Math.round(Math.min(100, (streak / 30) * 100)) : 0, // simple placeholder
      completed: completedToday,
      icon:
        habit.categories?.length > 0
          ? CATEGORY_EMOJIS[habit.categories[0]] || "🎯"
          : "🎯",
      color: habit.color ? `${habit.color}22` : "#e0f2fe",
    };
  };

  const totalStreak = habits.reduce((sum, h) => sum + (h.streak || 0), 0);

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
          {habits.length === 0 ? (
            <Text style={styles.emptyText}>
              No habits yet. Tap + to create your first!
            </Text>
          ) : (
            habits.map((habit) => {
              const display = getDisplayData(habit);
              return (
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
                          {display.progress}% this week
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

        {/* Bottom Nav */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="home" size={24} color="#0d9488" />
            <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="bar-chart" size={24} color="#94a3b8" />
            <Text style={styles.navLabel}>Analytics</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Ionicons name="person" size={24} color="#94a3b8" />
            <Text style={styles.navLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f766e",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#475569",
    marginTop: 4,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ccfbf1",
    justifyContent: "center",
    alignItems: "center",
  },
  statsCard: {
    borderRadius: 16,
    padding: 24,
  },
  statsContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsLabel: {
    color: "#fff",
    opacity: 0.9,
    fontSize: 14,
    marginBottom: 4,
  },
  streakRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  streakNumber: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "700",
  },
  streakDays: {
    color: "#fff",
    fontSize: 20,
    opacity: 0.9,
  },
  totalHabits: {
    alignItems: "flex-end",
  },
  totalNumber: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
  },
  habitsList: {
    flex: 1,
  },
  habitsListContent: {
    padding: 24,
    paddingBottom: 100,
  },
  habitCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  habitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  habitIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  habitEmoji: {
    fontSize: 24,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 4,
  },
  habitMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: "#475569",
  },
  metaDot: {
    color: "#475569",
    fontSize: 13,
  },
  checkButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  checkButtonCompleted: {
    backgroundColor: "#14b8a6",
  },
  checkButtonUncompleted: {
    borderWidth: 2,
    borderColor: "#cbd5e1",
  },
  progressBarContainer: {
    marginTop: 16,
    height: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#14b8a6",
    borderRadius: 4,
  },
  fab: {
    position: "absolute",
    bottom: 100,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0d9488",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingVertical: 12,
    paddingBottom: 20,
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 24,
    gap: 4,
  },
  navLabel: {
    fontSize: 12,
    color: "#94a3b8",
  },
  navLabelActive: {
    color: "#0d9488",
  },
});
