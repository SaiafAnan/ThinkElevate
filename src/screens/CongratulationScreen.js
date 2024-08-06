
//CongratulationsScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CongratulationsScreen = () => {
  return (
    <View style={styles.container}>
      <Image
  source={require('../../assets/congratulations. In.webp')}
  style={styles.image}
/>
      <Text style={styles.congratulationsText}>Congratulations</Text>
      <Text style={styles.messageText}>
        You have solved successfully now it's time for you to wake up!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF', // Light neutral background color
  },
  image: {
    width: 300, // Adjust the size as needed
    height: 300, // Adjust the size as needed
  },
  congratulationsText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20, // Space between gif and text
    // Custom font can be added here
  },
  messageText: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 10, // For proper text wrapping if needed
    // Custom font can be added here
  },
});

export default CongratulationsScreen;
