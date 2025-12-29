export const CalculateStreak = (completionDates) => {
  if (completionDates.length === 0) return 0;

  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10);

  let streak = 0;
  let current = new Date(today);
  current.setHours(0, 0, 0, 0);

  while (true) {
    const checkStr = current.toISOString().slice(0, 10);
    if (completionDates.includes(checkStr)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
};
