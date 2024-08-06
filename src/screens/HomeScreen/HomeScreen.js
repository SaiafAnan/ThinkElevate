//HomeScreen.js
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Button, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from './Styles';
import { Timestamp } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import { scheduleNotification } from '../../services/NotificationService'; // Ensure you have this service set up

import { saveAlarm,  removeAlarm } from '../../services/AlarmsService';
import { auth } from '../../services/FirebaseConfig';



const HomeScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [alarms, setAlarms] = useState([]);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [mathProblemSelected, setMathProblemSelected] = useState(false);

  useEffect(() => {
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need notification permissions to make this work!');
      }
    }
    requestPermissions();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const { docId, time, mathProblem } = response.notification.request.content.data;
      // Ensure navigation is available and correctly initialized at this point
      navigation.navigate('MathProblemScreen', { docId, time, mathProblem });
    });
  
    return () => subscription.remove();
  }, [navigation]);

  const onAddAlarm = () => {
    setTimePickerVisible(true);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button 
          title="Log Out" 
          color="#003366" 
          onPress={handleLogOut}
        />
      )
    });
  }, [navigation]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setTimePickerVisible(Platform.OS === 'ios'); // Keep picker visible on iOS until explicitly dismissed
    if (Platform.OS === 'android' || event.type === 'set') { // Close picker and show modal on date set
      setModalVisible(true);
    }
  };

  const onSaveAlarm = async () => {
    const alarmTime = new Date(date).getTime();
    if (alarmTime <= Date.now()) {
      Alert.alert('Error', 'Please choose a future time for the alarm.');
      return;
    }
  
    const mathProblem = mathProblemSelected ? 'Solve 5 + 7 = ?' : ''; // Example math problem
    const newAlarmData = {
      time: Timestamp.fromDate(new Date(alarmTime)), // Ensure this date is correctly converted to Firestore Timestamp
      mathProblem: mathProblem,
      solved: false,
    };
  
    try {
      const docId = await saveAlarm(newAlarmData);
      if (docId) {
        console.log("Alarm saved with ID:", docId);
        setAlarms([...alarms, { ...newAlarmData, id: docId }]);
        setMathProblemSelected(false);
        setModalVisible(false);
        // Schedule the notification for the future alarm time
        scheduleNotification(new Date(alarmTime), mathProblem, docId);
      }
    } catch (error) {
      console.error("Failed to save the alarm:", error);
      Alert.alert("Error", "Failed to save the alarm. Please try again.");
    }
  };
  
  

  const onRemoveAlarm = async (alarmId) => {
    const success = await removeAlarm(alarmId);
    if (success) {
      console.log("Alarm removed with ID:", alarmId);
      setAlarms(alarms.filter(alarm => alarm.id !== alarmId));
    } else {
      console.error("Failed to remove the alarm.");
    }
  };

  const handleLogOut = () => {
    Alert.alert(
      "Log Out", 
      "Are you sure you want to log out?", 
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes", 
          onPress: async () => {
            try {
              await auth.signOut();
              navigation.replace('Auth');
            } catch (error) {
              Alert.alert("Logout Error", error.message);
            }
          }
        }
      ]
    );
  };
  
  

  return (
    <View style={styles.container}>
      {isTimePickerVisible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <ScrollView style={styles.scrollView}>
        {alarms.map((item) => (
          <View key={item.id} style={styles.alarmItem}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailScreen', {
                id: item.id,
                time: item.time,
                mathProblem: item.mathProblem,
                isMathProblemSelected: !!item.mathProblem,
              })}
            >
              <Text style={styles.alarmText}>
                {new Date(item.time.seconds * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                {item.mathProblem ? " - Math Problem" : ""}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onRemoveAlarm(item.id)}>
              <MaterialIcons name="delete" size={24} color="#ff0000" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={onAddAlarm}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text>Selected Time: {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</Text>
          <TouchableOpacity
            style={[
              styles.mathProblemContainer,
              { backgroundColor: mathProblemSelected ? '#00C851' : '#ccc' }
            ]}
            onPress={() => setMathProblemSelected(!mathProblemSelected)}>
            <Text>Math Problem</Text>
          </TouchableOpacity>
          <Button title="Add" onPress={onSaveAlarm} />
        </View>
      </Modal>
    </View>
  );
};



export default HomeScreen;