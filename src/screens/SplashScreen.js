// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Auth');  // Use replace to prevent going back to the splash screen
    }, 4000);  // Set the delay for 4 seconds

    return () => clearTimeout(timer);  // Clean up the timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/riseNSolve.png')}  // Make sure the path is correct
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',  // You can change the background color
  },
  logo: {
    width: 200,  // Adjust the size as needed
    height: 200,  // Adjust the size as needed
  },
});

export default SplashScreen;
