// App.js
import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import MathProblemScreen from './src/screens/MathProblemScreen';
import CongratulationScreen from './src/screens/CongratulationScreen';
import DetailScreen from './src/screens/DetailScreen';
import AuthScreen from './src/screens/AuthScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SplashScreen from './src/screens/SplashScreen';
import getHeaderConfig from './src/utils/getHeaderConfig';
import { handleLogOut } from './src/utils/logoutHelper'; // Import the logout function

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Auth" 
          component={AuthScreen} 
          options={getHeaderConfig('ThinkElevate')}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={getHeaderConfig('Sign Up')}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={({ navigation }) => ({
            ...getHeaderConfig('Home', <Button title="Log Out" onPress={() => handleLogOut(navigation)} color="#fff" />)
          })}
        />
        <Stack.Screen 
          name="MathProblemScreen" 
          component={MathProblemScreen} 
          options={getHeaderConfig('Solve the Problem')}
        />
        <Stack.Screen 
          name="CongratulationScreen" 
          component={CongratulationScreen} 
          options={getHeaderConfig('Congratulations')}
        />
        <Stack.Screen 
          name="DetailScreen" 
          component={DetailScreen} 
          options={getHeaderConfig('UpdateScreen')}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
