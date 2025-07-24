import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Router from './src/screens/Router'
import { COLORS } from './src/common/Utils/Colors'

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.WHITE} />
      <Router />
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})