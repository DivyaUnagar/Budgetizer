import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { COLORS } from '../Utils/Colors';
import { FONTS } from '../Utils/Fonts';
import { RFValue } from 'react-native-responsive-fontsize';
import { height } from '../Utils/Constant';

interface CommonTextInputProps extends TextInputProps {
  label?: string;
  containerStyle?: any;
  labelStyle?: any;
  inputStyle?: any;
}

const CommonTextInput: React.FC<CommonTextInputProps> = ({
  label,
  containerStyle,
  labelStyle,
  inputStyle,
  placeholder,
  placeholderTextColor = COLORS.GRAY_SHADE1,
  ...props
}) => {
  return (
    <View style={[styles.inputGroup, containerStyle]}>
      {label && (
        <Text style={[styles.inputLabel, labelStyle]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[styles.textInput, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
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
  textInput: {
    backgroundColor: COLORS.WHITE,
    borderRadius: RFValue(12),
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(14, height),
    fontSize: RFValue(16, height),
    fontFamily: FONTS.Regular,
    color: COLORS.BLACK,
    borderWidth: 1,
    borderColor: COLORS.GREY_SHADE,
  },
});

export default CommonTextInput; 