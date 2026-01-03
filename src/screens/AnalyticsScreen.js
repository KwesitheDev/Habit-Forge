import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useHabits } from "../context/HabitsContext";
import { CalculateStreak } from "../utils/streak";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/analyticsStyles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const HORIZONTAL_PADDING = 20;
const CARD_PADDING = 20;
const CHART_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_PADDING * 2;

export default function AnalyticsScreen() {
  const navigation = useNavigation();
  const { habits, completionMap, loading } = useHabits();

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingSpinner}>
            <ActivityIndicator size="large" color="#0d9488" />
          </View>
          <Text style={styles.loadingText}>Loading analytics...</Text>
          <Text style={styles.loadingSubtext}>Crunching your habit data</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!habits || habits.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#0d9488" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Analytics</Text>
            <Text style={styles.headerSubtitle}>Track your progress</Text>
          </View>
        </View>
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="analytics-outline" size={64} color="#cbd5e1" />
          </View>
          <Text style={styles.emptyTitle}>No Habits Yet</Text>
          <Text style={styles.emptyText}>
            Create habits to start tracking your progress and see beautiful
            insights!
          </Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Text style={styles.emptyButtonText}>Create Your First Habit</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  // Data Calculations
  const last7Days = Array(7)
    .fill(0)
    .map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().slice(0, 10);
    });

  const weeklyPercentages = last7Days.map((date) => {
    const completed = habits.filter((h) =>
      (completionMap[h.id] || []).includes(date)
    ).length;
    return habits.length > 0
      ? Math.round((completed / habits.length) * 100)
      : 0;
  });

  const avgWeeklyCompletion = Math.round(
    weeklyPercentages.reduce((a, b) => a + b, 0) / weeklyPercentages.length
  );

  const bestStreak = Math.max(
    ...habits.map((h) => CalculateStreak(completionMap[h.id] || [])),
    0
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthCompletions = Object.values(completionMap)
    .flat()
    .filter((dateStr) => {
      const d = new Date(dateStr);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length;

  const generateMonthlyData = () => {
    const weeks = [0, 0, 0, 0];
    const today = new Date();

    for (let i = 0; i < 28; i++) {
      const d = new Date();
      d.setDate(today.getDate() - (27 - i));
      const dateStr = d.toISOString().slice(0, 10);
      const weekBucket = Math.floor(i / 7);

      habits.forEach((h) => {
        if ((completionMap[h.id] || []).includes(dateStr)) {
          weeks[weekBucket]++;
        }
      });
    }
    return {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      data: weeks,
    };
  };

  const monthlyData = generateMonthlyData();

  // 5-week calendar grid starting on Sunday
  const generateCalendarData = () => {
    const days = [];
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay() - 28);

    for (let i = 0; i < 35; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const dateStr = d.toISOString().slice(0, 10);
      const isToday = dateStr === today.toISOString().slice(0, 10);
      const isFuture = d > today;

      const completedCount = habits.filter((h) =>
        (completionMap[h.id] || []).includes(dateStr)
      ).length;

      const completionLevel =
        completedCount === 0
          ? 0
          : completedCount < habits.length * 0.33
          ? 1
          : completedCount < habits.length * 0.66
          ? 2
          : completedCount < habits.length
          ? 3
          : 4;

      days.push({
        date: d.getDate(),
        completedCount,
        completionLevel,
        isToday,
        isFuture,
      });
    }
    return days;
  };

  const calendarDays = generateCalendarData();

  const getCompletionColor = (level, isFuture) => {
    if (isFuture) return "#f1f5f9";
    switch (level) {
      case 1:
        return "#ccfbf1";
      case 2:
        return "#99f6e4";
      case 3:
        return "#5eead4";
      case 4:
        return "#0d9488";
      default:
        return "#f1f5f9";
    }
  };

  const getTextColor = (level, isToday, isFuture) => {
    if (isFuture) return "#cbd5e1";
    if (isToday) return "#0d9488";
    return level >= 3 ? "#ffffff" : "#0f172a";
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#0d9488" />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Analytics</Text>
            <Text style={styles.headerSubtitle}>
              Track your progress and insights
            </Text>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* AI Insight Card */}
          <LinearGradient
            colors={["#7c3aed", "#a855f7", "#ec4899"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.insightCard}
          >
            <View style={styles.insightHeader}>
              <View style={styles.insightIconContainer}>
                <Ionicons name="sparkles" size={22} color="#fff" />
              </View>
              <View style={styles.insightHeaderText}>
                <Text style={styles.insightTitle}>AI Success Prediction</Text>
                <Text style={styles.insightSubtitle}>
                  Based on your patterns
                </Text>
              </View>
            </View>
            <View style={styles.insightContent}>
              <View style={styles.predictionRow}>
                <Text style={styles.predictionNumber}>
                  {avgWeeklyCompletion}%
                </Text>
                <View style={styles.trendBadge}>
                  <Ionicons
                    name={
                      avgWeeklyCompletion >= 50
                        ? "trending-up"
                        : "trending-down"
                    }
                    size={20}
                    color="#fff"
                  />
                </View>
              </View>
              <Text style={styles.predictionLabel}>Weekly Completion Rate</Text>
              <View style={styles.predictionDivider} />
              <Text style={styles.predictionText}>
                {avgWeeklyCompletion >= 80
                  ? "🌟 Outstanding! You're crushing it! Keep up the amazing work."
                  : avgWeeklyCompletion >= 60
                  ? "💪 Great progress! You're building strong habits."
                  : avgWeeklyCompletion >= 40
                  ? "📈 Good start! Stay consistent to see better results."
                  : "🚀 Every step counts! Focus on one habit at a time."}
              </Text>
            </View>
          </LinearGradient>

          {/* Quick Stats */}
          <View style={styles.quickStatsContainer}>
            <View style={[styles.quickStatCard, styles.quickStatPrimary]}>
              <View style={styles.quickStatIcon}>
                <Ionicons name="flame" size={24} color="#f97316" />
              </View>
              <Text style={styles.quickStatValue}>{bestStreak}</Text>
              <Text style={styles.quickStatLabel}>Best Streak</Text>
            </View>

            <View style={[styles.quickStatCard, styles.quickStatSecondary]}>
              <View style={styles.quickStatIcon}>
                <Ionicons name="checkmark-done" size={24} color="#0d9488" />
              </View>
              <Text style={styles.quickStatValue}>{thisMonthCompletions}</Text>
              <Text style={styles.quickStatLabel}>This Month</Text>
            </View>

            <View style={[styles.quickStatCard, styles.quickStatTertiary]}>
              <View style={styles.quickStatIcon}>
                <Ionicons name="layers" size={24} color="#8b5cf6" />
              </View>
              <Text style={styles.quickStatValue}>{habits.length}</Text>
              <Text style={styles.quickStatLabel}>Active Habits</Text>
            </View>
          </View>

          {/* Activity Calendar */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <Ionicons name="calendar" size={20} color="#0d9488" />
                <Text style={styles.cardTitle}>Activity Calendar</Text>
              </View>
              <Text style={styles.cardSubtitle}>Last 5 weeks</Text>
            </View>

            {/* Legend */}
            <View style={styles.legendContainer}>
              <Text style={styles.legendLabel}>Less</Text>
              <View
                style={[styles.legendBox, { backgroundColor: "#f1f5f9" }]}
              />
              <View
                style={[styles.legendBox, { backgroundColor: "#99f6e4" }]}
              />
              <View
                style={[styles.legendBox, { backgroundColor: "#2dd4bf" }]}
              />
              <View
                style={[styles.legendBox, { backgroundColor: "#0d9488" }]}
              />
              <Text style={styles.legendLabel}>More</Text>
            </View>

            <View style={styles.calendarContainer}>
              <View style={styles.weekdayHeaders}>
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                  <Text key={index} style={styles.weekdayLabel}>
                    {day}
                  </Text>
                ))}
              </View>
              <View style={styles.daysGrid}>
                {calendarDays.map((day, index) => (
                  <View
                    key={index}
                    style={[
                      styles.calendarDay,
                      {
                        backgroundColor: getCompletionColor(
                          day.completionLevel,
                          day.isFuture
                        ),
                      },
                      day.isToday && styles.dayToday,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayNumber,
                        {
                          color: getTextColor(
                            day.completionLevel,
                            day.isToday,
                            day.isFuture
                          ),
                        },
                        day.isToday && styles.todayNumber,
                      ]}
                    >
                      {day.date}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Weekly Completion Chart */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <Ionicons name="trending-up" size={20} color="#0d9488" />
                <Text style={styles.cardTitle}>Weekly Trend</Text>
              </View>
              <View style={styles.percentageBadge}>
                <Text style={styles.percentageText}>
                  {avgWeeklyCompletion}%
                </Text>
              </View>
            </View>
            <LineChart
              data={{
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [{ data: weeklyPercentages }],
              }}
              width={CHART_WIDTH}
              height={240}
              yAxisSuffix="%"
              yAxisInterval={20}
              fromZero
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: () => "#0d9488",
                labelColor: () => "#475569",
                propsForDots: { r: "6", strokeWidth: "3", stroke: "#0d9488" },
                fillShadowGradientFrom: "#0d9488",
                fillShadowGradientFromOpacity: 0.4,
                fillShadowGradientToOpacity: 0.05,
              }}
              bezier
              style={styles.chart}
            />
          </View>

          {/* Monthly Bar Chart */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <Ionicons name="bar-chart" size={20} color="#0d9488" />
                <Text style={styles.cardTitle}>Monthly Overview</Text>
              </View>
              <Text style={styles.cardSubtitle}>Last 4 weeks</Text>
            </View>
            <BarChart
              data={{
                labels: monthlyData.labels,
                datasets: [{ data: monthlyData.data }],
              }}
              width={CHART_WIDTH}
              height={220}
              yAxisSuffix=""
              fromZero
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 0,
                color: () => "#0d9488",
                labelColor: () => "#64748b",
                barPercentage: 0.6,
              }}
              style={styles.chart}
              showValuesOnTopOfBars
            />
          </View>

          {/* Habit Performance */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardTitleRow}>
                <Ionicons name="trophy" size={20} color="#0d9488" />
                <Text style={styles.cardTitle}>Habit Performance</Text>
              </View>
            </View>
            <ScrollView style={styles.habitListScroll} nestedScrollEnabled>
              {habits.map((habit) => {
                const completions = completionMap[habit.id] || [];
                const streak = CalculateStreak(completions);
                const totalDaysTracked = 30; // or dynamic from first completion
                const completionRate =
                  totalDaysTracked > 0
                    ? Math.round((completions.length / totalDaysTracked) * 100)
                    : 0;

                return (
                  <View key={habit.id} style={styles.habitPerformanceItem}>
                    <View style={styles.habitPerformanceLeft}>
                      <View
                        style={[
                          styles.habitColorDot,
                          { backgroundColor: habit.color || "#0d9488" },
                        ]}
                      />
                      <View style={styles.habitPerformanceInfo}>
                        <Text
                          style={styles.habitPerformanceName}
                          numberOfLines={1}
                        >
                          {habit.name}
                        </Text>
                        <Text style={styles.habitPerformanceStreak}>
                          🔥 {streak} day streak
                        </Text>
                      </View>
                    </View>
                    <View style={styles.habitPerformanceRight}>
                      <View style={styles.progressBarContainer}>
                        <View
                          style={[
                            styles.progressBar,
                            { width: `${completionRate}%` },
                          ]}
                        />
                      </View>
                      <Text style={styles.habitPerformancePercent}>
                        {completionRate}%
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          {/* Bottom Spacer */}
          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Dashboard")}
            activeOpacity={0.7}
          >
            <View style={styles.navIconContainer}>
              <Ionicons name="home-outline" size={24} color="#94a3b8" />
            </View>
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButtonActive} activeOpacity={0.7}>
            <View style={styles.navIconContainerActive}>
              <Ionicons name="bar-chart" size={24} color="#0d9488" />
            </View>
            <Text style={[styles.navLabel, styles.navLabelActive]}>
              Analytics
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Profile")}
            activeOpacity={0.7}
          >
            <View style={styles.navIconContainer}>
              <Ionicons name="person-outline" size={24} color="#94a3b8" />
            </View>
            <Text style={styles.navLabel}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
