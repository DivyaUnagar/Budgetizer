import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS } from '../Utils/Colors';
import { FONTS } from '../Utils/Fonts';
import { height } from '../Utils/Constant';
import TransactionCard from './TransactionCard';

interface Transaction {
  id: string;
  icon: any;
  name: string;
  date: string;
  amount: string;
  isIncome: boolean;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  title?: string;
  maxItems?: number;
}

const RecentTransactions = ({ 
  transactions, 
  title = "Recent Transactions", 
  maxItems = 5 
}: RecentTransactionsProps) => {
  const displayTransactions = transactions.slice(0, maxItems);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        {displayTransactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            icon={transaction.icon}
            name={transaction.name}
            date={transaction.date}
            amount={transaction.amount}
            isIncome={transaction.isIncome}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentTransactions;

const styles = StyleSheet.create({
  container: {
    marginTop: RFValue(20),
  },
  title: {
    fontSize: RFValue(18, height),
    fontFamily: FONTS.SemiBold,
    color: COLORS.BLACK,
    marginBottom: RFValue(16),
  },
  scrollContainer: {
    maxHeight: RFValue(300), // Limit height for better UX
  },
}); 