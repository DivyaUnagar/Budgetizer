import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IMAGES } from '../Utils/Images';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS } from '../Utils/Colors';
import { FONTS } from '../Utils/Fonts';
import { height } from '../Utils/Constant';

const CommonHeader = ({ name }: { name: string }) => {
  const currentDate = new Date();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const currentMonthYear = `${month}, ${year}`;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.monthYear}>{currentMonthYear}</Text>
      </View>
      <Image source={IMAGES.USER} style={styles.profileImage} />
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImage: {
    width: RFValue(30),
    height: RFValue(30),
    borderRadius: RFValue(15),
  },
  name: {
    fontSize: RFValue(18, height),
    fontFamily: FONTS.SemiBold,
    color: COLORS.BLACK,
  },
  monthYear: {
    fontSize: RFValue(12),
    fontFamily: FONTS.Regular,
    color: COLORS.GRAY,
    marginVertical: RFValue(5),
  },
});
