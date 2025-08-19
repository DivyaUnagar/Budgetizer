import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '../../common/Utils/Colors';
import { FONTS, TEXT_STYLES } from '../../common/Utils/Fonts';
import CommonTextInput from '../../common/Components/CommonTextInput';
import { authService } from '../../services/AuthService';

interface RegisterProps {
  onRegisterSuccess?: () => void;
  onBackToLogin?: () => void;
  navigation?: any;
}

const Register: React.FC<RegisterProps> = ({ onRegisterSuccess, onBackToLogin, navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleRegister = async () => {
    if (validateForm()) {
      try {
        const result = await authService.register(formData.email, formData.password, formData.name);
        
        if (result.success) {
          console.log('Registration successful', result.user);
          Alert.alert('Success', 'Registration successful! Please login with your credentials.');
          
          // Navigate to Login screen
          if (navigation) {
            navigation.navigate('Login');
          } else if (onRegisterSuccess) {
            onRegisterSuccess();
          }
        } else {
          Alert.alert('Registration Failed', result.error || 'Registration failed. Please try again.');
        }
      } catch (error) {
        console.error('Registration error:', error);
        Alert.alert('Error', 'Registration failed. Please try again.');
      }
    }
  };

  const handleBackToLogin = () => {
    if (onBackToLogin) {
      onBackToLogin();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <View style={styles.formContainer}>
            <CommonTextInput
              placeholder="Full Name"
              value={formData.name}
              onChangeText={(text) => updateFormData('name', text)}
              autoCapitalize="words"
              autoCorrect={false}
              containerStyle={styles.inputContainer}
              inputStyle={[styles.input, errors.name ? styles.inputError : null]}
            />
            {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

            <CommonTextInput
              placeholder="Phone Number"
              value={formData.phone}
              onChangeText={(text) => updateFormData('phone', text)}
              keyboardType="phone-pad"
              containerStyle={styles.inputContainer}
              inputStyle={[styles.input, errors.phone ? styles.inputError : null]}
            />
            {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

            <CommonTextInput
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => updateFormData('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={styles.inputContainer}
              inputStyle={[styles.input, errors.email ? styles.inputError : null]}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <CommonTextInput
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => updateFormData('password', text)}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={styles.inputContainer}
              inputStyle={[styles.input, errors.password ? styles.inputError : null]}
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

            <CommonTextInput
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={(text) => updateFormData('confirmPassword', text)}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              containerStyle={styles.inputContainer}
              inputStyle={[styles.input, errors.confirmPassword ? styles.inputError : null]}
            />
            {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}
          </View>

          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleRegister}
          >
            <Text style={styles.primaryButtonText}>Create Account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleBackToLogin}
          >
            <Text style={styles.secondaryButtonText}>Sign In</Text>
          </TouchableOpacity>

          <Text style={styles.demoText}>Demo: test@example.com / password</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: FONTS.Bold,
    color: COLORS.BLACK,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: FONTS.Regular,
    color: COLORS.GRAY,
    marginBottom: 40,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
    borderRadius: 8,
    padding: 15,
    ...TEXT_STYLES.inputLarge,
    backgroundColor: COLORS.OFF_WHITE,
  },
  primaryButton: {
    backgroundColor: COLORS.THEME,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontFamily: FONTS.SemiBold,
  },
  secondaryButton: {
    backgroundColor: COLORS.WHITE,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.THEME,
    marginBottom: 20,
  },
  secondaryButtonText: {
    color: COLORS.THEME,
    fontSize: 16,
    fontFamily: FONTS.SemiBold,
  },
  demoText: {
    fontSize: 14,
    fontFamily: FONTS.Regular,
    color: COLORS.GRAY,
    textAlign: 'center',
  },
  inputError: {
    borderColor: COLORS.RED,
  },
  errorText: {
    color: COLORS.RED,
    fontSize: 12,
    fontFamily: FONTS.Regular,
    marginTop: -12,
    marginBottom: 8,
    marginLeft: 4,
  },
});

export default Register; 