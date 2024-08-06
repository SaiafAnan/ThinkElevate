// AlarmsService.js
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import PushNotification from 'react-native-push-notification';
import { db, auth } from './FirebaseConfig'; // Adjust the import path as necessary
console.log(db);

export async function saveAlarm(data) {
  try {
    const dbCollection = collection(db, 'alarms');
    console.log(dbCollection);
    const docRef = await addDoc(dbCollection, {
      ...data,
      time: data.time, // Assuming 'time' is already a Firestore Timestamp
      solved: false, // Default to not solved
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding alarm:", e);
    return null;
  }
}

export async function loadAlarms() {
    const data = [];
    const querySnapshot = await getDocs(collection(db, 'alarms'));
    querySnapshot.forEach((doc) => {
      const alarmData = doc.data();
      data.push({
        ...alarmData,
        id: doc.id,
        time: new Date(alarmData.time.seconds * 1000), // Convert back to Date object
      });
    });
    return data;
  }
  

export async function updateAlarm(id, data) {
  try {
    const docRef = doc(db, 'alarms', id);
    await updateDoc(docRef, data);
    return true;
  } catch (e) {
    console.error("Error updating alarm:", e);
    return false;
  }
}

export async function removeAlarm(id) {
  try {
    const docRef = doc(db, 'alarms', id);
    await deleteDoc(docRef);
    return true;
  } catch (e) {
    console.error("Error removing alarm:", e);
    return false;
  }
}

export const scheduleAlarmNotification = (alarmTime, mathProblem) => {
  PushNotification.localNotificationSchedule({
    message: `Time to solve: ${mathProblem}`, // (required)
    date: new Date(alarmTime), // in the future
    // ... any other options you may want to set
  });
};
