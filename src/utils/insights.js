import { CalculateStreak } from "./streak";

const INSIGHTS = {
  zero_activity: [
    "Today is a blank canvas. Paint it with your first win.",
    "The secret of getting ahead is getting started.",
    "One small habit today is better than a perfect habit tomorrow.",
  ],
  started: [
    "You're off to a great start! Keep that momentum going.",
    "Progress detected! finish your remaining habits to win the day.",
    "You've taken the first step. Now, complete the journey.",
  ],
  completed: [
    "Unstoppable! You've crushed all your goals for today.",
    "Perfect score! Enjoy that sense of accomplishment.",
    "Day won. Rest easy knowing you gave it 100%.",
  ],
  high_streak: [
    "🔥 {streak} day streak! You are building unbreakable discipline.",
    "Consistency is your superpower. {streak} days and counting!",
  ],
  recovery: [
    "Missed a day? It happens. The comeback starts right now.",
    "Don't let one slip become a slide. You've got this.",
  ],
};

export const generateInsight = (habits, completionMap) => {
  if (!habits || habits.length === 0) {
    return "Ready to transform? Create your first habit today!";
  }

  const todayStr = new Date().toISOString().slice(0, 10);

  // 1. Calculate Today's Progress
  let completedTodayCount = 0;
  habits.forEach((habit) => {
    const dates = completionMap[habit.id] || [];
    if (dates.includes(todayStr)) {
      completedTodayCount++;
    }
  });

  const isAllDone = completedTodayCount === habits.length && habits.length > 0;
  const isStarted = completedTodayCount > 0;

  // 2. Calculate Global Streak (Consecutive days ANY habit was done)
  // Merge all dates from all habits into one unique set
  const allDatesSet = new Set();
  Object.values(completionMap).forEach((dates) => {
    dates.forEach((d) => allDatesSet.add(d));
  });
  const uniqueDates = Array.from(allDatesSet).sort();
  const globalStreak = CalculateStreak(uniqueDates);

  // --- Logic Tree ---

  // Priority 1: High Streak Milestone (every 5 days)
  if (globalStreak > 0 && globalStreak % 5 === 0 && !isAllDone) {
    return INSIGHTS.high_streak[
      Math.floor(Math.random() * INSIGHTS.high_streak.length)
    ].replace("{streak}", globalStreak);
  }

  // Priority 2: Daily Completion Status
  if (isAllDone) {
    return INSIGHTS.completed[
      Math.floor(Math.random() * INSIGHTS.completed.length)
    ];
  }

  if (isStarted) {
    return INSIGHTS.started[
      Math.floor(Math.random() * INSIGHTS.started.length)
    ];
  }

  // Priority 3: Zero Activity or Recovery
  // If we have a streak but haven't done anything today yet
  if (globalStreak > 0) {
    return `You're on a ${globalStreak}-day streak. Do one task to keep it alive!`;
  }

  return INSIGHTS.zero_activity[
    Math.floor(Math.random() * INSIGHTS.zero_activity.length)
  ];
};
