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
  backgroundColor = '#F8F9FA',
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
    const barWidth = (screenWidth - RFValue(64)) / data.length - RFValue(8);
    
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
          <Text style={styles.valueText}>
            ${item.value.toLocaleString()}
          </Text>
        )}
        
        <Text style={styles.labelText}>{item.label}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { height: chartHeight + RFValue(80) }]}>
      <View style={styles.chartContainer}>
        {data.map((item, index) => renderBar(item, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingHorizontal: RFValue(16),
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
});

export default AnimatedBarChart; 