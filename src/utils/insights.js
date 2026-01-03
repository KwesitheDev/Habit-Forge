import { CalculateStreak } from "./streak";

const INSIGHTS = {
  zero: [
    "Today is day one. Small steps compound into massive change.",
    "Every expert was once a beginner. Start now.",
  ],
  building: [
    "You're on a {streak}-day streak — momentum is your superpower.",
    "Consistency beats intensity every time.",
  ],
  strong: [
    "Impressive {streak}-day streak! You're building unbreakable discipline.",
    "This level of commitment separates you from the crowd.",
  ],
  recovery: [
    "One missed day doesn't erase your progress. Recommit today.",
    "The best time to get back on track is right now.",
  ],
};

export const generateInsight = (habits, completionMap) => {
  if (!habits || habits.length === 0) {
    return "Ready to transform? Create your first habit today!";
  }

  let totalStreak = 0;
  let hasMissedToday = true;
  habits.forEach((habit) => {
    const dates = completionMap[habit.id] || [];
    totalStreak += CalculateStreak(dates);
    const todayStr = new Date().toISOString().slice(0, 10);
    if (dates.includes(todayStr)) hasMissedToday = false;
  });

  if (hasMissedToday && totalStreak > 0) {
    return INSIGHTS.recovery[
      Math.floor(Math.random() * INSIGHTS.recovery.length)
    ];
  }

  if (totalStreak === 0) {
    return INSIGHTS.zero[Math.floor(Math.random() * INSIGHTS.zero.length)];
  }

  if (totalStreak < 7) {
    return INSIGHTS.building[
      Math.floor(Math.random() * INSIGHTS.building.length)
    ].replace("{streak}", totalStreak);
  }

  return INSIGHTS.strong[
    Math.floor(Math.random() * INSIGHTS.strong.length)
  ].replace("{streak}", totalStreak);
};
