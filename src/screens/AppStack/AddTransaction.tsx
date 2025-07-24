import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '../../common/Utils/Colors';
import AppHeader from '../../common/Components/AppHeader';
import SegmentedControl from '../../common/Components/SegmentedControl';
import { RFValue } from 'react-native-responsive-fontsize';
import { FONTS } from '../../common/Utils/Fonts';
import ExpenseForm from '../../common/Components/ExpenseForm';
import IncomeForm from '../../common/Components/IncomeForm';

const AddTransaction = () => {
    const insets = useSafeAreaInsets();
    const [selectedTab, setSelectedTab] = useState(0); // 0 for Expense, 1 for Income

    const dynamicStyles = {
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 80, // Add extra padding for tab bar
        paddingLeft: insets.left,
        paddingRight: insets.right,
    };

    const handleTabChange = (index: number) => {
        setSelectedTab(index);
    };
    
  return (
    <SafeAreaView style={[styles.container, dynamicStyles]}>
      <AppHeader headerTitle="Add Transaction" />

      <View style={styles.spacingContainer}>
        <SegmentedControl 
          options={['Expense', 'Income']}
          selectedIndex={selectedTab}
          onSelectionChange={handleTabChange}
        />
      </View>

      <View style={styles.contentContainer}>
        {
          selectedTab === 0 ? <ExpenseForm /> : <IncomeForm />
        }
       
      </View>
    </SafeAreaView>
  )
}

export default AddTransaction

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    spacingContainer: {
        paddingHorizontal: RFValue(16),
        paddingVertical: RFValue(10),
    },
    segmentedControl: {
        marginBottom: RFValue(20),
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: RFValue(16),
    },
    contentText: {
        fontSize: RFValue(16),
        fontFamily: FONTS.Medium,
        color: COLORS.BLACK,
    },
    
}) 