// src/screens/AuthScreen.js
import React, { useState } from 'react';
import { View, TextInput, Text, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createUserWithEmailPassword, signInWithEmailPassword } from '../services/AuthService';
import { useNavigation } from '@react-navigation/native';

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();  // Use the useNavigation hook to get navigation prop

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const user = await createUserWithEmailPassword(email, password);
      Alert.alert("Success", "User created successfully! Please log in.");
      navigation.navigate('SignUp');  // Corrected navigation to 'SignUp'
    } catch (error) {
      Alert.alert("Signup Error", error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const user = await signInWithEmailPassword(email, password);
      Alert.alert("Success", "Logged in successfully!");
      console.log(user);
      navigation.navigate('Home');  // Navigate to Home after successful login
    } catch (error) {
      Alert.alert("Login Error", error.message);
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
     <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={{height: 10}} />
      <TouchableOpacity style={styles.button} onPress={handleSignIn} disabled={loading}>
        <Text style={styles.buttonText}>Login</Text>
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
    backgroundColor: '#003366', // Dark blue color
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',  // White text
    fontSize: 16
  }
});

export default AuthScreen;