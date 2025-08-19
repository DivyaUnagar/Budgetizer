import { StyleSheet, View, ScrollView, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '../../common/Utils/Colors';
import AppHeader from '../../common/Components/AppHeader';
import SpendingGraph from '../../common/Components/SpendingGraph';
import TopCategories from '../../common/Components/TopCategories';
import { RFValue } from 'react-native-responsive-fontsize';
import GraphDataService from '../../common/Utils/GraphDataService';

const Graph = () => {
  const insets = useSafeAreaInsets();
  const dataService = GraphDataService.getInstance();

  const dynamicStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom + 80, // Add extra padding for tab bar
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  const handleCategoryPress = (category: any) => {
    console.log('Category pressed:', category);
    // Handle category press - you can navigate to detailed view or show more info
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

        <TopCategories 
          data={dataService.getCategoryData()}
          title="Top Categories"
          maxItems={10}
          onCategoryPress={handleCategoryPress}
        />
      </ScrollView>
    </View>
  )
}

export default Graph

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: RFValue(16),
  },
})