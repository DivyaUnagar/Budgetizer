import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Example component showing different navigation patterns
const NavigationExamples = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  // 1. Basic Navigation
  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  // 2. Navigation with Parameters
  const navigateWithParams = (screenName: string, params: any) => {
    navigation.navigate(screenName, params);
  };

  // 3. Go Back
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      Alert.alert('Cannot go back', 'This is the first screen');
    }
  };

  // 4. Replace Current Screen
  const replaceScreen = (screenName: string) => {
    navigation.replace(screenName);
  };

  // 5. Push New Screen (creates new instance)
  const pushScreen = (screenName: string) => {
    navigation.push(screenName);
  };

  // 6. Reset Navigation Stack
  const resetToScreen = (screenName: string) => {
    navigation.reset({
      index: 0,
      routes: [{ name: screenName }],
    });
  };

  // 7. Pop to Top
  const popToTop = () => {
    navigation.popToTop();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Navigation Examples</Text>
      
      {/* Basic Navigation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Basic Navigation</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigateToScreen('Home')}
        >
          <Text style={styles.buttonText}>Navigate to Home</Text>
        </TouchableOpacity>
      </View>

      {/* Navigation with Parameters */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Navigation with Parameters</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigateWithParams('TransactionDetails', { 
            id: 123, 
            amount: 50.00,
            category: 'Food'
          })}
        >
          <Text style={styles.buttonText}>Go to Transaction Details</Text>
        </TouchableOpacity>
      </View>

      {/* Go Back */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Go Back</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={goBack}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>

      {/* Replace Screen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Replace Current Screen</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => replaceScreen('Home')}
        >
          <Text style={styles.buttonText}>Replace with Home</Text>
        </TouchableOpacity>
      </View>

      {/* Push Screen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Push New Screen</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => pushScreen('TransactionDetails')}
        >
          <Text style={styles.buttonText}>Push Transaction Details</Text>
        </TouchableOpacity>
      </View>

      {/* Reset Navigation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Reset Navigation Stack</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => resetToScreen('Home')}
        >
          <Text style={styles.buttonText}>Reset to Home</Text>
        </TouchableOpacity>
      </View>

      {/* Pop to Top */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Pop to Top</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={popToTop}
        >
          <Text style={styles.buttonText}>Pop to Top</Text>
        </TouchableOpacity>
      </View>

      {/* Current Route Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Route Info</Text>
        <Text style={styles.infoText}>Route Name: {route.name}</Text>
        <Text style={styles.infoText}>Route Params: {JSON.stringify(route.params)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000000',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
});

export default NavigationExamples; 