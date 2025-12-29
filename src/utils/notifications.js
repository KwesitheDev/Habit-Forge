import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    alert("Must use physical device for Push Notifications");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

export async function scheduleHabitReminder(habit) {
  if (!habit.reminderTime) return;

  const [hours, minutes] = habit.reminderTime.split(":").map(Number);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Habit Time!",
      body: `Don't forget: ${habit.name}`,
      sound: true,
    },
    trigger: {
      hour: hours,
      minute: minutes,
      repeats: true,
    },
  });
}
