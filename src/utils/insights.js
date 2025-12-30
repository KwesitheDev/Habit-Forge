import { CalculateStreak } from "./streak";

const INSIGHTS = {
  newHabit: [
    "Great start! Consistency compounds — small actions today build big results tomorrow.",
    "You're taking the first step toward lasting change. Keep showing up!",
  ],
  shortStreak: [
    "You're on a {streak}-day streak — momentum is building!",
    "Every completed day makes the next one easier.",
  ],
  longStreak: [
    "Incredible {streak}-day streak! You're proving habits are built one day at a time.",
    "This discipline will pay off in ways you can't yet imagine.",
  ],
  missedDay: [
    "Everyone has off days. Today is a fresh chance to rebuild momentum.",
    "One slip doesn't erase your progress — get back on track now.",
  ],
};

export const generateInsight = (habits, completionMap) => {
  const totalHabits = habits.length;
  const totalStreak = habits.reduce((sum, h) => {
    const dates = completionMap[h.id] || [];
    return sum + CalculateStreak(dates);
  }, 0);

  if (totalHabits === 0) return "Ready to build new habits? Start one today.";

  if (totalStreak === 0) {
    const missed =
      INSIGHTS.missedDay[Math.floor(Math.random() * INSIGHTS.missedDay.length)];
    return missed;
  }

  if (totalStreak < 7) {
    return INSIGHTS.shortStreak[
      Math.floor(Math.random() * INSIGHTS.shortStreak.length)
    ].replace("{streak}", totalStreak);
  }

  return INSIGHTS.longStreak[
    Math.floor(Math.random() * INSIGHTS.longStreak.length)
  ].replace("{streak}", totalStreak);
};
