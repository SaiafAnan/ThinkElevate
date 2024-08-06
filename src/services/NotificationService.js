
//NotificationService.js
// NotificationService.js
import * as Notifications from 'expo-notifications';

export const scheduleNotification = async (alarmTime, mathProblem, docId) => {
  // Ensure alarmTime is a Date object and in the future
  const trigger = new Date(alarmTime).getTime() / 1000 - Date.now() / 1000;
  if (trigger <= 0) {
    console.warn("Attempted to schedule a notification in the past.");
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Alarm!",
      body: `It's time for your math problem: ${mathProblem}`,
      data: { time: alarmTime.toISOString(), mathProblem, docId },
    },
    trigger: {
      seconds: trigger,
      repeats: false,
    },
  });
};
