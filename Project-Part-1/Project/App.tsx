import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainPage from './MainPage';
import ViewCards from './ViewCards';
import RandomCommanders from './RandomCommanders';
import ViewCommanders from './ViewCommanders'; 
import ViewSeen from './ViewSeen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="ViewCards" component={ViewCards} />
        <Stack.Screen name="RandomCommanders" component={RandomCommanders} />
        <Stack.Screen name="ViewCommanders" component={ViewCommanders} />
        <Stack.Screen name="ViewSeen" component={ViewSeen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
