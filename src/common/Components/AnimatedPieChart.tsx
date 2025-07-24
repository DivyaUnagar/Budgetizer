import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS } from '../Utils/Colors';
import { FONTS } from '../Utils/Fonts';
import { height } from '../Utils/Constant';
import { CategoryData } from '../Utils/GraphDataService';

interface AnimatedPieChartProps {
  data: CategoryData[];
  size?: number;
  strokeWidth?: number;
  onSlicePress?: (category: CategoryData) => void;
}

const AnimatedPieChart: React.FC<AnimatedPieChartProps> = ({
  data,
  size = 200,
  strokeWidth = 40,
  onSlicePress,
}) => {
  const animatedValues = useRef<Animated.Value[]>([]).current;
  const [selectedSlice, setSelectedSlice] = React.useState<number | null>(null);

  useEffect(() => {
    // Initialize animated values
    if (animatedValues.length !== data.length) {
      animatedValues.length = 0;
      data.forEach(() => {
        animatedValues.push(new Animated.Value(0));
      });
    }

    // Animate pie slices
    const animations = animatedValues.map((anim, index) => {
      return Animated.spring(anim, {
        toValue: 1,
        useNativeDriver: false,
        tension: 100,
        friction: 8,
        delay: index * 100,
      });
    });

    Animated.parallel(animations).start();
  }, [data]);

  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  let currentAngle = 0;

  const renderPieSlice = (item: CategoryData, index: number) => {
    const percentage = item.percentage / 100;
    const startAngle = currentAngle;
    const endAngle = currentAngle + (percentage * 2 * Math.PI);
    currentAngle = endAngle;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);

    const largeArcFlag = percentage > 0.5 ? 1 : 0;

    const pathData = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z',
    ].join(' ');

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.sliceContainer,
          {
            width: size,
            height: size,
            position: 'absolute',
          },
        ]}
        onPress={() => {
          setSelectedSlice(selectedSlice === index ? null : index);
          onSlicePress?.(item);
        }}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.slice,
            {
              backgroundColor: item.color,
              opacity: animatedValues[index] || 0,
              transform: [
                {
                  scale: animatedValues[index]?.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }) || 0,
                },
              ],
            },
          ]}
        />
      </TouchableOpacity>
    );
  };

  const renderLegend = () => {
    return (
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.legendItem,
              selectedSlice === index && styles.selectedLegendItem,
            ]}
            onPress={() => setSelectedSlice(selectedSlice === index ? null : index)}
          >
            <View
              style={[
                styles.legendColor,
                { backgroundColor: item.color },
              ]}
            />
            <View style={styles.legendTextContainer}>
              <Text style={styles.legendCategory}>{item.category}</Text>
              <Text style={styles.legendAmount}>
                ${item.amount.toLocaleString()} ({item.percentage}%)
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.chartContainer, { width: size, height: size }]}>
        {data.map((item, index) => renderPieSlice(item, index))}
        
        {/* Center text */}
        <View style={styles.centerText}>
          <Text style={styles.totalAmount}>
            ${data.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
          </Text>
          <Text style={styles.totalLabel}>Total</Text>
        </View>
      </View>
      
      {renderLegend()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  chartContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliceContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slice: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  centerText: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: RFValue(30),
    padding: RFValue(8),
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalAmount: {
    fontSize: RFValue(16, height),
    fontFamily: FONTS.Bold,
    color: COLORS.BLACK,
  },
  totalLabel: {
    fontSize: RFValue(12, height),
    fontFamily: FONTS.Regular,
    color: COLORS.GRAY_SHADE1,
  },
  legendContainer: {
    marginTop: RFValue(20),
    width: '100%',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: RFValue(8),
    paddingHorizontal: RFValue(12),
    borderRadius: RFValue(8),
    marginVertical: RFValue(2),
  },
  selectedLegendItem: {
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  legendColor: {
    width: RFValue(16),
    height: RFValue(16),
    borderRadius: RFValue(8),
    marginRight: RFValue(12),
  },
  legendTextContainer: {
    flex: 1,
  },
  legendCategory: {
    fontSize: RFValue(14, height),
    fontFamily: FONTS.Medium,
    color: COLORS.BLACK,
  },
  legendAmount: {
    fontSize: RFValue(12, height),
    fontFamily: FONTS.Regular,
    color: COLORS.GRAY_SHADE1,
  },
});

export default AnimatedPieChart; 