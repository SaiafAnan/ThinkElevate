// src/utils/getHeaderConfig.js

const getHeaderConfig = (title, rightButton) => ({
  title: title,
  headerStyle: {
    backgroundColor: '#003366', // Deep blue color
    height: 60, // Adjusted height for the header
    elevation: 0, // Remove shadow on Android
    shadowOpacity: 0, // Remove shadow on iOS
  },
  headerTintColor: '#fff', // White text for the header title
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center', // Center the header title
  headerRight: () => rightButton
});

export default getHeaderConfig;
