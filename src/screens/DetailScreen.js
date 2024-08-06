import React, { useState } from 'react';
import { View, Text, Button, Switch, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Timestamp } from 'firebase/firestore';

const DetailScreen = ({ route, navigation }) => {
    const { id, time,  isMathProblemSelected, updateAlarmInList } = route.params;

  // Convert Firestore timestamp to JavaScript Date object if necessary
  const [selectedDate, setSelectedDate] = useState(new Date(time.seconds * 1000));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mathProblemSelected, setMathProblemSelected] = useState(isMathProblemSelected);

  const handleDateChange = (event, newDate) => {
    const currentDate = newDate || selectedDate;
    setShowDatePicker(Platform.OS === 'ios'); // keep date picker on iOS
    setSelectedDate(currentDate);
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const toggleMathProblemSelection = () => {
    setMathProblemSelected(!mathProblemSelected);
  };

  const saveUpdates = async () => {
    try {
      // Prepare data to update
      const updatedData = {
        time: Timestamp.fromDate(selectedDate), // Convert Date back to Timestamp
        mathProblem: mathProblemSelected ? 'Solve 5 + 7 = ?' : '',
      };
  
      // Update the local list in HomeScreen
      updateAlarmInList(id, updatedData);
  
      // Navigate back
      navigation.goBack();
    } catch (error) {
      console.error("Failed to save updates:", error);
      // Handle error appropriately
      Alert.alert("Update Failed", "Failed to save the updates.");
    }
  };
  

  // Your existing component rendering...


  return (
    <View style={styles.container}>
      <Text style={styles.alarmText}>
        Current Time: {selectedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
      </Text>
      <Text style={styles.timeText}>Update Alarm Time:</Text>
      <Button title="Change Time" onPress={toggleDatePicker} />
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          display="default"
          onChange={handleDateChange}
        />
      )}
      
      <View style={styles.selectionContainer}>
        <Text style={styles.label}>Math Problem Selected:</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={mathProblemSelected ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleMathProblemSelection}
          value={mathProblemSelected}
        />
      </View>
      <Button title="Save Updates" onPress={saveUpdates} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  alarmText: {
    fontSize: 24,
    marginBottom: 10,
  },
  timeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    marginRight: 10,
  }
});

export default DetailScreen;
