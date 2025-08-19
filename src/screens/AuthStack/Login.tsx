import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../common/Utils/Colors';
import { FONTS, FONT_SIZES, TEXT_STYLES } from '../../common/Utils/Fonts';
import { authService } from '../../services/AuthService';
import CommonTextInput from '../../common/Components/CommonTextInput';

interface LoginProps {
  onLoginSuccess?: () => void;
  onRegisterPress?: () => void;
  navigation?: any;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess, onRegisterPress, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      const result = await authService.login(email, password);
      
      if (result.success) {
        console.log('Login successful:', result.user);
        // Always call onLoginSuccess first, it will handle the navigation
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        Alert.alert('Login Failed', result.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterPress = () => {
    if (onRegisterPress) {
      onRegisterPress();
    } else if (navigation) {
      navigation.navigate('Register');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
      
      <View style={styles.form}>
        <CommonTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
        />
        
        <CommonTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          inputStyle={styles.input}
          containerStyle={styles.inputContainer}
        />
        
        <TouchableOpacity 
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]}
          onPress={handleRegisterPress}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.demoText}>
        Demo: test@example.com / password
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 30,
  },
  title: {
    ...TEXT_STYLES.heading5,
    marginBottom: 8,
    color: COLORS.BLACK,
  },
  subtitle: {
    ...TEXT_STYLES.bodyMedium,
    marginBottom: 40,
    color: COLORS.GRAY,
  },
  form: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
    borderRadius: 8,
    padding: 15,
    ...TEXT_STYLES.inputLarge,
    backgroundColor: COLORS.OFF_WHITE,
  },
  inputContainer: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: COLORS.THEME,
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.THEME,
  },
  buttonText: {
    color: COLORS.WHITE,
    ...TEXT_STYLES.buttonMedium,
  },
  secondaryButtonText: {
    color: COLORS.THEME,
  },
  demoText: {
    ...TEXT_STYLES.bodyXSmall,
    color: COLORS.GRAY_SHADE1,
    textAlign: 'center',
  },
});

export default Login; 