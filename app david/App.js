import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen       from './src/screens/HomeScreen';
import WriteScreen      from './src/screens/WriteScreen';
import AnonymScreen     from './src/screens/AnimoScreen';
import VideosScreen     from './src/screens/VideosScreen';
import BreathScreen     from './src/screens/BreathScreen';
import ResponseScreen   from './src/screens/ResponseScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home"     component={HomeScreen} />
        <Stack.Screen name="Write"    component={WriteScreen} />
        <Stack.Screen name="Animo"    component={AnonymScreen} />
        <Stack.Screen name="Videos"   component={VideosScreen} />
        <Stack.Screen name="Breath"   component={BreathScreen} />
        <Stack.Screen name="Response" component={ResponseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
