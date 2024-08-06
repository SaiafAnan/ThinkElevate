// src/utils/logoutHelper.js
import { Alert } from 'react-native';
import { auth } from '../services/FirebaseConfig';  // Ensure the path is correct

export const handleLogOut = (navigation) => {
  Alert.alert("Log Out", "Are you sure you want to log out?", [
    { text: "No", style: "cancel" },
    { text: "Yes", onPress: () => {
      auth.signOut().then(() => {
        navigation.replace('Auth');
      }).catch(error => {
        Alert.alert("Logout Error", error.message);
      });
    }}
  ]);
};
