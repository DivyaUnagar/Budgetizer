import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Splash from './Splash';
import Welcome from './Welcome';
import Wellness from './Wellness';
import Login from './Login';
import Register from './Register';
import { COLORS } from '../../common/Utils/Colors';
import { authService } from '../../services/AuthService';

interface SplashWrapperProps {
  navigation?: any;
  route?: any;
}

const SplashWrapper: React.FC<SplashWrapperProps> = ({ navigation, route }) => {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'welcome' | 'wellness' | 'login' | 'register'>('splash');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status here
    checkAuthenticationStatus();
  }, []);

  const checkAuthenticationStatus = async () => {
    try {
      console.log('🔍 Checking authentication status in SplashWrapper...');
      // Use the actual AuthService to check authentication
      const authStatus = await authService.isAuthenticated();
      console.log('🔍 Auth status:', authStatus);
      setIsAuthenticated(authStatus);
    } catch (error) {
      console.error('Authentication check failed:', error);
      setIsAuthenticated(false);
    }
  };

  const handleSplashComplete = () => {
    if (isAuthenticated) {
      // Navigate to main app
      if (route?.params?.onAuthSuccess) {
        route.params.onAuthSuccess();
      } else if (navigation) {
        navigation.replace('MainApp');
      }
    } else {
      // Show welcome screen first
      setCurrentScreen('welcome');
    }
  };

  const handleLoginSuccess = () => {
    console.log('🔐 Login success in SplashWrapper');
    setIsAuthenticated(true);
    // Call the parent's auth success handler if available
    if (route?.params?.onAuthSuccess) {
      route.params.onAuthSuccess();
    } else if (navigation) {
      navigation.replace('MainApp');
    }
  };

  const handleWelcomeComplete = () => {
    setCurrentScreen('wellness');
  };

  const handleWellnessComplete = () => {
    setCurrentScreen('login');
  };

  const handleWellnessBack = () => {
    setCurrentScreen('welcome');
  };

  const handleRegisterPress = () => {
    setCurrentScreen('register');
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return (
          <Splash 
            onSplashComplete={handleSplashComplete}
          />
        );
      case 'welcome':
        return (
          <Welcome 
            onGetStarted={handleWelcomeComplete}
          />
        );
      case 'wellness':
        return (
          <Wellness 
            onContinue={handleWellnessComplete}
            onBack={handleWellnessBack}
          />
        );
      case 'login':
        return (
          <Login 
            onLoginSuccess={handleLoginSuccess}
            onRegisterPress={handleRegisterPress}
          />
        );
      case 'register':
        return (
          <Register 
            onBackToLogin={handleBackToLogin}
            onRegisterSuccess={handleLoginSuccess}
          />
        );
      default:
        return <Splash onSplashComplete={handleSplashComplete} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderCurrentScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});

export default SplashWrapper; 