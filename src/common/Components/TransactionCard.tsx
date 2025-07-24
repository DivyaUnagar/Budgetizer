import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS } from '../Utils/Colors';
import { FONTS } from '../Utils/Fonts';
import { height } from '../Utils/Constant';

interface TransactionCardProps {
  icon: any; // Image source
  name: string;
  date: string;
  amount: string;
  isIncome?: boolean;
}

const TransactionCard = ({ icon, name, date, amount, isIncome = false }: TransactionCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: isIncome ? COLORS.GREEN : COLORS.RED }]}>
          {isIncome ? '+' : '-'}{amount}
        </Text>
      </View>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.OFF_WHITE,
    borderRadius: RFValue(12),
    padding: RFValue(16),
    marginBottom: RFValue(12),
  },
  iconContainer: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(20),
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFValue(12),
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    width: RFValue(20),
    height: RFValue(20),
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
  },
  name: {
    fontSize: RFValue(16, height),
    fontFamily: FONTS.SemiBold,
    color: COLORS.BLACK,
    marginBottom: RFValue(4),
  },
  date: {
    fontSize: RFValue(14, height),
    fontFamily: FONTS.Regular,
    color: COLORS.GRAY,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: RFValue(16, height),
    fontFamily: FONTS.SemiBold,
  },
}); 