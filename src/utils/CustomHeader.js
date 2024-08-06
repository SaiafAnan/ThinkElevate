// src/utils/CustomHeader.js

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const CustomHeader = ({ title }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#003366', // Deep blue color
  },
  headerContainer: {
    height: 70, // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default CustomHeader;
