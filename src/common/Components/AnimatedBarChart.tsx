import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS } from '../Utils/Colors';
import { FONTS } from '../Utils/Fonts';
import { height } from '../Utils/Constant';

const { width: screenWidth } = Dimensions.get('window');

interface DataPoint {
  label: string;
  value: number;
  maxValue?: number;
}

interface AnimatedBarChartProps {
  data: DataPoint[];
  maxValue?: number;
  barColor?: string;
  backgroundColor?: string;
  showValues?: boolean;
  height?: number;
}

const AnimatedBarChart: React.FC<AnimatedBarChartProps> = ({
  data,
  maxValue,
  barColor = COLORS.THEME,
  backgroundColor = COLORS.GRAY_SHADE2,
  showValues = true,
  height: chartHeight = 200,
}) => {
  const animatedValues = useRef<Animated.Value[]>([]).current;
  const [maxDataValue, setMaxDataValue] = useState(0);

  useEffect(() => {
    // Initialize animated values
    if (animatedValues.length !== data.length) {
      animatedValues.length = 0;
      data.forEach(() => {
        animatedValues.push(new Animated.Value(0));
      });
    }

    // Calculate max value
    const calculatedMax = maxValue || Math.max(...data.map(d => d.maxValue || d.value));
    setMaxDataValue(calculatedMax);

    // Animate bars
    const animations = animatedValues.map((anim, index) => {
      const targetValue = data[index]?.value || 0;
      const normalizedValue = targetValue / calculatedMax;
      
      return Animated.spring(anim, {
        toValue: normalizedValue,
        useNativeDriver: false,
        tension: 100,
        friction: 8,
        delay: index * 50,
      });
    });

    Animated.parallel(animations).start();
  }, [data, maxValue]);

  const renderBar = (item: DataPoint, index: number) => {
    // Calculate bar width with better spacing based on data length
    const availableWidth = screenWidth - RFValue(80);
    let barSpacing, barWidth;
    
    if (data.length <= 4) {
      // For month view (4 weeks) - more spacing
      barSpacing = RFValue(20);
    } else if (data.length <= 7) {
      // For week view (7 days) - medium spacing
      barSpacing = RFValue(15);
    } else if (data.length <= 12) {
      // For year view (12 months) - better spacing for readability
      barSpacing = RFValue(12);
    } else {
      // For any other case - minimum spacing
      barSpacing = RFValue(8);
    }
    
    const totalSpacing = barSpacing * (data.length - 1);
    barWidth = (availableWidth - totalSpacing) / data.length;
    
    // Ensure minimum bar width for visibility
    const minBarWidth = RFValue(16);
    if (barWidth < minBarWidth) {
      barWidth = minBarWidth;
    }
    
    return (
      <View key={index} style={styles.barContainer}>
        <View style={styles.barWrapper}>
          <Animated.View
            style={[
              styles.bar,
              {
                width: barWidth,
                height: chartHeight,
                backgroundColor: backgroundColor,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.barFill,
                {
                  width: barWidth,
                  backgroundColor: barColor,
                  height: animatedValues[index]?.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, chartHeight],
                  }) || 0,
                },
              ]}
            />
          </Animated.View>
        </View>
        
        {showValues && (
          <Text style={[
            styles.valueText, 
            data.length > 7 && styles.compactValueText,
            data.length > 10 && styles.veryCompactValueText
          ]}>
            ${item.value.toLocaleString()}
          </Text>
        )}
        
        <Text style={[
          styles.labelText, 
          data.length > 7 && styles.compactLabelText,
          data.length > 10 && styles.veryCompactLabelText
        ]}>
          {item.label}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { height: chartHeight + RFValue(80) }]}>
      <View style={[
        styles.chartContainer, 
        { 
          width: '100%',
          justifyContent: 'space-between',
          paddingHorizontal: data.length > 7 ? RFValue(10) : RFValue(20)
        }
      ]}>
        {data.map((item, index) => renderBar(item, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: RFValue(20),
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  barWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    borderRadius: RFValue(4),
    overflow: 'hidden',
  },
  barFill: {
    position: 'absolute',
    bottom: 0,
    borderRadius: RFValue(4),
  },
  valueText: {
    fontSize: RFValue(12, height),
    fontFamily: FONTS.Medium,
    color: COLORS.BLACK,
    marginTop: RFValue(4),
    textAlign: 'center',
  },
  labelText: {
    fontSize: RFValue(12, height),
    fontFamily: FONTS.Regular,
    color: COLORS.GRAY_SHADE1,
    marginTop: RFValue(4),
    textAlign: 'center',
  },
  compactValueText: {
    fontSize: RFValue(10, height),
    fontFamily: FONTS.Medium,
    color: COLORS.BLACK,
    marginTop: RFValue(2),
    textAlign: 'center',
  },
  veryCompactValueText: {
    fontSize: RFValue(8, height),
    fontFamily: FONTS.Medium,
    color: COLORS.BLACK,
    marginTop: RFValue(1),
    textAlign: 'center',
  },
  compactLabelText: {
    fontSize: RFValue(10, height),
    fontFamily: FONTS.Regular,
    color: COLORS.GRAY_SHADE1,
    marginTop: RFValue(2),
    textAlign: 'center',
  },
  veryCompactLabelText: {
    fontSize: RFValue(8, height),
    fontFamily: FONTS.Regular,
    color: COLORS.GRAY_SHADE1,
    marginTop: RFValue(1),
    textAlign: 'center',
  },
});

export default AnimatedBarChart; 