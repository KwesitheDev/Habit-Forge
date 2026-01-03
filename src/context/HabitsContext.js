// context/HabitsContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  subscribeToHabits,
  toggleCompletion,
  getCompletionDates,
} from "../services/firestore";

const HabitsContext = createContext();

export function HabitsProvider({ children }) {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [completionMap, setCompletionMap] = useState({});
  const [loading, setLoading] = useState(true);

  // Subscribe to habits
  useEffect(() => {
    if (!user) {
      setHabits([]);
      setCompletionMap({});
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = subscribeToHabits(user.uid, (fetchedHabits) => {
      setHabits(fetchedHabits);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Fetch completion dates when habits change
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

  // Toggle completion function
  const toggleHabitCompletion = async (habitId) => {
    if (!user) return;

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

  const value = {
    habits,
    completionMap,
    loading,
    toggleHabitCompletion,
  };

  return (
    <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitsProvider");
  }
  return context;
}
