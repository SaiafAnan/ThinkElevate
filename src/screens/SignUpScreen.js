// src/screens/SignUpScreen.js
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { createUserWithEmailPassword } from '../services/AuthService';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailPassword(email, password);
      Alert.alert("Success", "Registration successful! Please login.");
      navigation.navigate('Auth');  // Navigate back to the Auth screen for login
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View >
      <Image
        source={require('../../assets/riseNSolve.png')}  
        style={styles.logo}
      />
    </View>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  logo: {
    width: 200,  // Adjust the size as needed
    height: 200,  // Adjust the size as needed
  },
  button: {
    backgroundColor: '#003366', // Custom button color
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10 // Adding a little space above the button
  },
  buttonText: {
    color: '#fff', // Button text color
    fontSize: 16
  }
});

export default SignUpScreen;