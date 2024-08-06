///MathProblemScreen.js


import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const MathProblemScreen = ({ route, navigation }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState('');

  const { time, mathProblem } = route.params;

  const validateAndSubmit = () => {
    if (!userAnswer.trim()) {
      setError('Please enter an answer.');
      return;
    }
    if (parseInt(userAnswer, 10) === 12) {
      Alert.alert('Correct!', 'You solved the problem.', [{
        text: 'OK',
        onPress: () => {
          navigation.navigate('CongratulationScreen');
          setTimeout(() => {
            navigation.navigate('Home');
          }, 6000); // Wait for 3 seconds before going back to the Home screen
        }
      }]);
    } else {
      setError('Incorrect answer. Please try again.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{new Date(time).toLocaleTimeString()}</Text>
      <Text style={styles.problemText}>{mathProblem}</Text>
      <TextInput
        style={[styles.input, { borderColor: error ? 'red' : 'black' }]}
        value={userAnswer}
        onChangeText={setUserAnswer}
        keyboardType="numeric"
      />
      {!!error && <Text style={styles.errorText}>{error}</Text>}
      <Button title="Submit" onPress={validateAndSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 24,
    marginBottom: 10,
  },
  problemText: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
  },
});

export default MathProblemScreen;
