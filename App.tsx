import { LogBox, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import MainNavigator from './src/screens/MainNavigator'
import { COLORS } from './src/common/Utils/Colors'

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />
      <MainNavigator />
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})