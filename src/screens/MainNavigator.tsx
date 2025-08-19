import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Router from './Router';
import SplashWrapper from './AuthStack/SplashWrapper';
import { authService } from '../services/AuthService';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Initialize app and check authentication
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      console.log('🚀 Starting app initialization...');
      
      // Check authentication status using AuthService
      const authStatus = await authService.isAuthenticated();
      setIsAuthenticated(authStatus);
      
      console.log('✅ App initialization completed, auth status:', authStatus);
      
    } catch (error) {
      console.error('❌ App initialization error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    console.log('🎯 Authentication successful, navigating to main app');
    console.log('🎯 Setting isAuthenticated to true');
    setIsAuthenticated(true);
  };

  // Show splash screen while loading
  if (isLoading) {
    return <SplashWrapper />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="MainApp" component={Router} />
        ) : (
          <Stack.Screen 
            name="Auth" 
            component={SplashWrapper}
            initialParams={{ onAuthSuccess: handleAuthSuccess }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator; 