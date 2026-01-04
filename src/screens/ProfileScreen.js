import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  Switch,
  Platform,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useHabits } from "../context/HabitsContext";
import { CalculateStreak } from "../utils/streak";
import styles from "../styles/ProfileScreenStyle";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const { habits, completionMap } = useHabits();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Calculate user stats
  const totalHabits = habits?.length || 0;
  const totalCompletions = Object.values(completionMap || {}).flat().length;
  const bestStreak = Math.max(
    ...Object.values(completionMap || {}).map((dates) =>
      CalculateStreak(dates || [])
    ),
    0
  );

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.email) return "?";
    return user.email.charAt(0).toUpperCase();
  };

  // Get display name from email
  const getDisplayName = () => {
    if (!user?.email) return "User";
    const name = user.email.split("@")[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } catch (error) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. All your data will be permanently deleted.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Implement account deletion logic
            Alert.alert("Info", "Account deletion feature coming soon.");
          },
        },
      ]
    );
  };

  const handleContactSupport = () => {
    Linking.openURL("mailto:support@habittracker.com");
  };

  const handleRateApp = () => {
    Alert.alert("Thank You!", "We appreciate your feedback! 🎉");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#0d9488" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header Card */}
          <LinearGradient
            colors={["#0d9488", "#14b8a6", "#2dd4bf"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.profileCard}
          >
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{getUserInitials()}</Text>
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={14} color="#0d9488" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{getDisplayName()}</Text>
            <Text style={styles.userEmail}>{user?.email || "Loading..."}</Text>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalHabits}</Text>
                <Text style={styles.statLabel}>Habits</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalCompletions}</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{bestStreak}</Text>
                <Text style={styles.statLabel}>Best Streak</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Account Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <View style={styles.sectionCard}>
              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, styles.iconBlue]}>
                    <Ionicons name="person-outline" size={20} color="#3b82f6" />
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemTitle}>Edit Profile</Text>
                    <Text style={styles.menuItemSubtitle}>
                      Update your information
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, styles.iconPurple]}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#8b5cf6"
                    />
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemTitle}>Change Password</Text>
                    <Text style={styles.menuItemSubtitle}>
                      Update your password
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, styles.iconGreen]}>
                    <Ionicons
                      name="shield-checkmark-outline"
                      size={20}
                      color="#22c55e"
                    />
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemTitle}>Privacy & Security</Text>
                    <Text style={styles.menuItemSubtitle}>
                      Manage your data
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Preferences Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.sectionCard}>
              <View style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, styles.iconOrange]}>
                    <Ionicons
                      name="notifications-outline"
                      size={20}
                      color="#f97316"
                    />
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemTitle}>Push Notifications</Text>
                    <Text style={styles.menuItemSubtitle}>Daily reminders</Text>
                  </View>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: "#e2e8f0", true: "#99f6e4" }}
                  thumbColor={notificationsEnabled ? "#0d9488" : "#f4f4f5"}
                  ios_backgroundColor="#e2e8f0"
                />
              </View>

              <View style={styles.menuDivider} />

              <View style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, styles.iconIndigo]}>
                    <Ionicons name="moon-outline" size={20} color="#6366f1" />
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemTitle}>Dark Mode</Text>
                    <Text style={styles.menuItemSubtitle}>Coming soon</Text>
                  </View>
                </View>
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ false: "#e2e8f0", true: "#99f6e4" }}
                  thumbColor={darkModeEnabled ? "#0d9488" : "#f4f4f5"}
                  ios_backgroundColor="#e2e8f0"
                  disabled
                />
              </View>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, styles.iconTeal]}>
                    <Ionicons name="time-outline" size={20} color="#0d9488" />
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemTitle}>Reminder Time</Text>
                    <Text style={styles.menuItemSubtitle}>9:00 AM daily</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <View style={styles.sectionCard}>
              <TouchableOpacity
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={handleContactSupport}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, styles.iconCyan]}>
                    <Ionicons
                      name="chatbubble-ellipses-outline"
                      size={20}
                      color="#06b6d4"
                    />
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemTitle}>Contact Support</Text>
                    <Text style={styles.menuItemSubtitle}>
                      Get help from our team
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={handleRateApp}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, styles.iconYellow]}>
                    <Ionicons name="star-outline" size={20} color="#eab308" />
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemTitle}>Rate App</Text>
                    <Text style={styles.menuItemSubtitle}>
                      Share your feedback
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, styles.iconGray]}>
                    <Ionicons
                      name="document-text-outline"
                      size={20}
                      color="#64748b"
                    />
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text style={styles.menuItemTitle}>Terms & Privacy</Text>
                    <Text style={styles.menuItemSubtitle}>
                      Legal information
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Danger Zone */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Danger Zone</Text>
            <View style={styles.sectionCard}>
              <TouchableOpacity
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={handleLogout}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, styles.iconRed]}>
                    <Ionicons
                      name="log-out-outline"
                      size={20}
                      color="#ef4444"
                    />
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text style={[styles.menuItemTitle, styles.dangerText]}>
                      Log Out
                    </Text>
                    <Text style={styles.menuItemSubtitle}>
                      Sign out of your account
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#fecaca" />
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuItem}
                activeOpacity={0.7}
                onPress={handleDeleteAccount}
              >
                <View style={styles.menuItemLeft}>
                  <View style={[styles.iconContainer, styles.iconRedDark]}>
                    <Ionicons name="trash-outline" size={20} color="#dc2626" />
                  </View>
                  <View style={styles.menuItemContent}>
                    <Text style={[styles.menuItemTitle, styles.dangerText]}>
                      Delete Account
                    </Text>
                    <Text style={styles.menuItemSubtitle}>
                      Permanently delete your data
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#fecaca" />
              </TouchableOpacity>
            </View>
          </View>

          {/* App Info */}
          <View style={styles.appInfo}>
            <Text style={styles.appName}>Habit Tracker</Text>
            <Text style={styles.appVersion}>Version 1.0.0</Text>
            <Text style={styles.appCopyright}>
              © {new Date().getFullYear()} All rights reserved
            </Text>
          </View>
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

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate("Analytics")}
            activeOpacity={0.7}
          >
            <View style={styles.navIconContainer}>
              <Ionicons name="bar-chart-outline" size={24} color="#94a3b8" />
            </View>
            <Text style={styles.navLabel}>Analytics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navButtonActive} activeOpacity={0.7}>
            <View style={styles.navIconContainerActive}>
              <Ionicons name="person" size={24} color="#0d9488" />
            </View>
            <Text style={[styles.navLabel, styles.navLabelActive]}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
