import { SafeAreaView, StyleSheet, Text, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLORS } from '../../common/Utils/Colors';
import { RFValue } from 'react-native-responsive-fontsize';
import { height } from '../../common/Utils/Constant';
import { FONTS } from '../../common/Utils/Fonts';
import CommonHeader from '../../common/Components/CommonHeader';
import RecentTransactions from '../../common/Components/RecentTransactions';
import { STRINGS } from '../../localization/en';
import { IMAGES } from '../../common/Utils/Images';

const Home = () => {
    const insets = useSafeAreaInsets();
    const progressAnim = useRef(new Animated.Value(0)).current;

    const dynamicStyles = {
        paddingTop: insets.top,
        paddingBottom: insets.bottom + 80, // Add extra padding for tab bar
        paddingLeft: insets.left,
        paddingRight: insets.right,
    };

    // Budget data
    const currentSpent = 1400;
    const totalBudget = 2000;
    const progressPercentage = (currentSpent / totalBudget) * 100;

    // Sample transaction data
    const recentTransactions = [
      {
        id: '1',
        icon: IMAGES.SALARY,
        name: 'Salary',
        date: 'Mar 12',
        amount: '$1,250.00',
        isIncome: true,
      },
      {
        id: '2',
        icon: IMAGES.GROCERY,
        name: 'Grocery Store',
        date: 'Mar 10',
        amount: '$50.49',
        isIncome: false,
      },
      {
        id: '3',
        icon: IMAGES.RENT,
        name: 'Rent',
        date: 'Mar 5',
        amount: '$100.50',
        isIncome: false,
      },
      {
        id: '3',
        icon: IMAGES.RENT,
        name: 'Rent',
        date: 'Mar 5',
        amount: '$100.50',
        isIncome: false,
      },
    ];

    useEffect(() => {
        // Animate the progress bar on component mount
        Animated.timing(progressAnim, {
            toValue: progressPercentage,
            duration: 1500,
            useNativeDriver: false,
        }).start();
    }, []);

    const progressWidth = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });
    
  return (
    <SafeAreaView style={[styles.container, dynamicStyles]}>
      <View style={styles.spacingContainer}>
      <CommonHeader name="Hi, Alex" />

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>{STRINGS.CURRENT_BALANCE}</Text>
        <Text style={styles.balanceCurrency}>$<Text style={styles.balanceAmount}>3,450</Text><Text style={styles.balanceCurrency}>.00</Text></Text>
      </View>

      {/* Monthly Budget Progress Card */}
      <View style={styles.budgetCard}>
        <Text style={styles.budgetTitle}>Monthly Budget</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[
                styles.progressFill, 
                { width: progressWidth }
              ]} 
            />
          </View>
        </View>
        
        <View style={styles.budgetInfo}>
          <Text style={styles.budgetAmount}>
            ${currentSpent.toLocaleString()}.00 / ${totalBudget.toLocaleString()}
          </Text>
          <Text style={styles.budgetPercentage}>
            %{Math.round(progressPercentage)}
          </Text>
        </View>
      </View>
      
      <RecentTransactions 
        transactions={recentTransactions}
        title="Recent Transactions"
        maxItems={3}
      />
      </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    spacingContainer: {
        paddingHorizontal: RFValue(16),
        paddingVertical: RFValue(10),
    },
    balanceContainer: {
      marginVertical: RFValue(10),
    },
    balanceText: {
        fontSize: RFValue(17, height),
        fontFamily: FONTS.Medium,
        color: COLORS.BLACK,
    },
    balanceAmount: {
        fontSize: RFValue(32, height),
        fontFamily: FONTS.Bold,
        color: COLORS.BLACK,
        marginVertical: RFValue(4),
    },
    balanceCurrency: {
        fontSize: RFValue(32, height),
        fontFamily: FONTS.Medium,
        color: COLORS.LIGHT_GRAY,
        marginVertical: RFValue(4),
    },
    budgetCard: {
        backgroundColor: COLORS.THEME,
        borderRadius: RFValue(12),
        padding: RFValue(20),
        marginTop: RFValue(10),
    },
    budgetTitle: {
        fontSize: RFValue(18, height),
        fontFamily: FONTS.Medium,
        color: COLORS.WHITE,
        marginBottom: RFValue(15),
    },
    progressContainer: {
        alignItems: 'center',
        marginBottom: RFValue(15),
    },
    progressBar: {
        width: '100%',
        height: RFValue(8),
        backgroundColor: COLORS.GREY_SLIDER,
        borderRadius: RFValue(4),
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLORS.WHITE,
        borderRadius: RFValue(4),
    },
    budgetInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    budgetAmount: {
        fontSize: RFValue(16, height),
        fontFamily: FONTS.Medium,
        color: COLORS.WHITE,
    },
    budgetPercentage: {
        fontSize: RFValue(16, height),
        fontFamily: FONTS.Medium,
        color: COLORS.WHITE,
    },
})