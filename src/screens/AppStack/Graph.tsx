import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '../../common/Utils/Colors';
import AppHeader from '../../common/Components/AppHeader';
import SpendingGraph from '../../common/Components/SpendingGraph';
import { RFValue } from 'react-native-responsive-fontsize';

const Graph = () => {
  const insets = useSafeAreaInsets();

  const dynamicStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom + 80, // Add extra padding for tab bar
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <View style={[styles.container, dynamicStyles]}>
      <AppHeader headerTitle="Spending Analysis" />

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SpendingGraph />
      </ScrollView>
    </View>
  )
}

export default Graph

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.OFF_WHITE,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: RFValue(16),
  },
})