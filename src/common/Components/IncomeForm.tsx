import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../Utils/Colors';
import { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { FONTS } from '../Utils/Fonts';
import CommonTextInput from './CommonTextInput';
import CategorySelector from './CategorySelector';
import { height } from '../Utils/Constant';

const IncomeForm = () => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Salary');
    const [description, setDescription] = useState('');
  
    const handleSave = () => {
      // Handle save logic here
      console.log('Saving income:', { amount, category, description });
    };

    const handleCategoryPress = () => {
      // Handle category selection logic here
      console.log('Category pressed');
    };
  
    return (
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <CommonTextInput
          label="Amount"
          placeholder="$0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
  
        <CategorySelector
          label="Category"
          value={category}
          onPress={handleCategoryPress}
        />
  
        <CommonTextInput
          label="Description (optional)"
          placeholder="Monthly salary"
          value={description}
          onChangeText={setDescription}
        />
  
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };        

export default IncomeForm

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        paddingTop: RFValue(20),
    },
    saveButton: {
        backgroundColor: COLORS.THEME,
        borderRadius: RFValue(22),
        paddingVertical: RFValue(18, height),
        alignItems: 'center',
        marginTop: RFValue(32),
        marginBottom: RFValue(20),
    },
    saveButtonText: {
        fontSize: RFValue(16, height),
        fontFamily: FONTS.SemiBold,
        color: COLORS.WHITE,
    }
})