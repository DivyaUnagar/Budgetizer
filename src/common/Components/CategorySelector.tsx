import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../Utils/Colors';
import { FONTS } from '../Utils/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { height } from '../Utils/Constant';

interface CategorySelectorProps {
  label?: string;
  value: string;
  onPress: () => void;
  containerStyle?: any;
  labelStyle?: any;
  selectorStyle?: any;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  label,
  value,
  onPress,
  containerStyle,
  labelStyle,
  selectorStyle,
}) => {
  return (
    <View style={[styles.inputGroup, containerStyle]}>
      {label && (
        <Text style={[styles.inputLabel, labelStyle]}>
          {label}
        </Text>
      )}
      <TouchableOpacity 
        style={[styles.categoryInput, selectorStyle]} 
        onPress={onPress}
      >
        <Text style={styles.categoryText}>{value}</Text>
        <Text style={styles.chevronIcon}>▼</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: RFValue(24),
  },
  inputLabel: {
    fontSize: RFValue(16, height),
    fontFamily: FONTS.SemiBold,
    color: COLORS.BLACK,
    marginBottom: RFValue(8, height),
  },
  categoryInput: {
    backgroundColor: COLORS.WHITE,
    borderRadius: RFValue(12),
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(14, height),
    borderWidth: 1,
    borderColor: COLORS.GREY_SHADE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: RFValue(16, height),
    fontFamily: FONTS.Regular,
    color: COLORS.BLACK,
  },
  chevronIcon: {
    fontSize: RFValue(12),
    color: COLORS.GRAY_SHADE1,
  },
});

export default CategorySelector; 