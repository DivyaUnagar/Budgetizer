
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, StyleProp, ViewStyle } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { COLORS } from '../Utils/Colors'
import { FONTS } from '../Utils/Fonts'
import { height } from '../Utils/Constant'

interface SegmentedControlProps {
  options: string[]
  selectedIndex?: number
  onSelectionChange?: (index: number) => void
  containerStyle?: StyleProp<ViewStyle>
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ 
  options = ['Expense', 'Income'], 
  selectedIndex = 0, 
  onSelectionChange,
  containerStyle
}) => {
  const [selectedTab, setSelectedTab] = useState(selectedIndex)
  const slideAnim = useRef(new Animated.Value(0)).current
  const { width: screenWidth } = Dimensions.get('window')
  const containerWidth = screenWidth - RFValue(32) - RFValue(16) // Account for screen margins
  const tabWidth = containerWidth / options.length

  useEffect(() => {
    // Animate to the selected index when component mounts or selectedIndex prop changes
    Animated.spring(slideAnim, {
      toValue: selectedTab * tabWidth,
      useNativeDriver: false,
      tension: 100,
      friction: 8,
    }).start()
  }, [selectedTab, tabWidth])

  const handleTabPress = (index: number) => {
    setSelectedTab(index)
    onSelectionChange?.(index)
  }

  return (
    <View style={[styles.container, { width: containerWidth }, containerStyle]}>
      {/* Animated sliding indicator */}
      <Animated.View 
        style={[
          styles.slidingIndicator,
          {
            transform: [{ translateX: slideAnim }],
            width: tabWidth - RFValue(4), // Account for padding
          }
        ]} 
      />
      
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            { width: tabWidth }
          ]}
          onPress={() => handleTabPress(index)}
          activeOpacity={0.8}
        >
          <Text style={[
            styles.tabText,
            selectedTab === index && styles.selectedTabText
          ]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default SegmentedControl

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderRadius: RFValue(8),
    borderWidth: 1,
    borderColor: COLORS.GREY_SHADE,
    padding: RFValue(2),
    position: 'relative',
    alignSelf: 'center', // Center the container
    
  },
  slidingIndicator: {
    position: 'absolute',
    top: RFValue(2),
    bottom: RFValue(2),
    left: RFValue(2), // Start from the left padding
    backgroundColor: COLORS.THEME,
    borderRadius: RFValue(6),
    zIndex: 1,
  },
  tab: {
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(16),
    borderRadius: RFValue(6),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  tabText: {
    fontSize: RFValue(16, height),
    fontFamily: FONTS.Medium,
    color: COLORS.GRAY_SHADE1, 
  },
  selectedTabText: {
    color: COLORS.WHITE,
  },
})