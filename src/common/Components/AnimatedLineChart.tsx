import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS } from '../Utils/Colors';
import { FONTS } from '../Utils/Fonts';
import { height } from '../Utils/Constant';
import { DataPoint } from '../Utils/GraphDataService';

const { width: screenWidth } = Dimensions.get('window');

interface AnimatedLineChartProps {
  data: DataPoint[];
  height?: number;
  lineColor?: string;
  fillColor?: string;
  showGrid?: boolean;
  showPoints?: boolean;
}

const AnimatedLineChart: React.FC<AnimatedLineChartProps> = ({
  data,
  height: chartHeight = 200,
  lineColor = COLORS.THEME,
  fillColor = 'rgba(61, 176, 199, 0.1)',
  showGrid = true,
  showPoints = true,
}) => {
  const animatedValues = useRef<Animated.Value[]>([]).current;
  const [maxValue, setMaxValue] = React.useState(0);

  useEffect(() => {
    // Initialize animated values
    if (animatedValues.length !== data.length) {
      animatedValues.length = 0;
      data.forEach(() => {
        animatedValues.push(new Animated.Value(0));
      });
    }

    // Calculate max value
    const calculatedMax = Math.max(...data.map(d => d.value));
    setMaxValue(calculatedMax);

    // Animate points
    const animations = animatedValues.map((anim, index) => {
      const targetValue = data[index]?.value || 0;
      const normalizedValue = targetValue / calculatedMax;
      
      return Animated.spring(anim, {
        toValue: normalizedValue,
        useNativeDriver: false,
        tension: 100,
        friction: 8,
        delay: index * 100,
      });
    });

    Animated.parallel(animations).start();
  }, [data]);

  const renderGrid = () => {
    if (!showGrid) return null;

    const gridLines = 5;
    return Array.from({ length: gridLines }, (_, index) => {
      const y = (chartHeight / gridLines) * index;
      return (
        <View
          key={index}
          style={[
            styles.gridLine,
            {
              top: y,
              width: screenWidth - RFValue(64),
            },
          ]}
        />
      );
    });
  };

  const renderLine = () => {
    const points = data.map((item, index) => {
      const x = ((screenWidth - RFValue(64)) / (data.length - 1)) * index;
      const animatedValue = animatedValues[index] || new Animated.Value(0);
      const y = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [chartHeight, 0],
      });

      return { x, y, animatedValue };
    });

    return (
      <View style={styles.lineContainer}>
        {/* Fill area */}
        <Animated.View
          style={[
            styles.fillArea,
            {
              backgroundColor: fillColor,
              height: chartHeight,
            },
          ]}
        />
        
        {/* Line segments */}
        {points.map((point, index) => {
          if (index === 0) return null;
          
          const prevPoint = points[index - 1];
          return (
            <Animated.View
              key={index}
              style={[
                styles.lineSegment,
                {
                  position: 'absolute',
                  left: prevPoint.x,
                  top: prevPoint.y,
                  width: point.x - prevPoint.x,
                  height: 2,
                  backgroundColor: lineColor,
                  transform: [
                    {
                      scaleX: prevPoint.animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      }),
                    },
                  ],
                },
              ]}
            />
          );
        })}
        
        {/* Data points */}
        {showPoints && points.map((point, index) => (
          <Animated.View
            key={index}
            style={[
              styles.dataPoint,
              {
                left: point.x - RFValue(4),
                backgroundColor: lineColor,
                transform: [
                  {
                    translateY: point.y.interpolate({
                      inputRange: [0, chartHeight],
                      outputRange: [chartHeight, 0],
                    }),
                  },
                  {
                    scale: point.animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  },
                ],
              },
            ]}
          />
        ))}
      </View>
    );
  };

  const renderLabels = () => {
    return (
      <View style={styles.labelsContainer}>
        {data.map((item, index) => {
          const x = ((screenWidth - RFValue(64)) / (data.length - 1)) * index;
          return (
            <View
              key={index}
              style={[
                styles.labelContainer,
                {
                  left: x - RFValue(20),
                },
              ]}
            >
              <Text style={styles.labelText}>{item.label}</Text>
              <Text style={styles.valueText}>${item.value.toLocaleString()}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container, { height: chartHeight + RFValue(60) }]}>
      <View style={[styles.chartContainer, { height: chartHeight }]}>
        {renderGrid()}
        {renderLine()}
      </View>
      {renderLabels()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  chartContainer: {
    position: 'relative',
    marginHorizontal: RFValue(16),
  },
  gridLine: {
    position: 'absolute',
    height: 1,
    backgroundColor: COLORS.GREY_SHADE,
    opacity: 0.3,
  },
  lineContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  fillArea: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  lineSegment: {
    position: 'absolute',
  },
  dataPoint: {
    position: 'absolute',
    width: RFValue(8),
    height: RFValue(8),
    borderRadius: RFValue(4),
    borderWidth: 2,
    borderColor: COLORS.WHITE,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: RFValue(16),
    marginTop: RFValue(16),
  },
  labelContainer: {
    alignItems: 'center',
    position: 'absolute',
    width: RFValue(40),
  },
  labelText: {
    fontSize: RFValue(10, height),
    fontFamily: FONTS.Regular,
    color: COLORS.GRAY_SHADE1,
    textAlign: 'center',
  },
  valueText: {
    fontSize: RFValue(8, height),
    fontFamily: FONTS.Medium,
    color: COLORS.BLACK,
    textAlign: 'center',
    marginTop: RFValue(2),
  },
});

export default AnimatedLineChart; 