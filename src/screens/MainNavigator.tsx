import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Router from './Router';
import AuthNavigator from './AuthStack/AuthNavigator';

const Stack = createStackNavigator();

const MainNavigator = () => {
  // You can add authentication logic here
  const isAuthenticated = false; // Replace with your auth logic

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="MainApp" component={Router} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator; 