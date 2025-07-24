import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS } from '../Utils/Colors';
import { FONTS } from '../Utils/Fonts';
import { height } from '../Utils/Constant';
import AnimatedBarChart from './AnimatedBarChart';
import AnimatedPieChart from './AnimatedPieChart';
import AnimatedLineChart from './AnimatedLineChart';
import SegmentedControl from './SegmentedControl';
import GraphDataService from '../Utils/GraphDataService';

const SpendingGraph: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(0); // 0: Week, 1: Month, 2: Year
  const [selectedChartType, setSelectedChartType] = useState(0); // 0: Bar Chart, 1: Pie Chart, 2: Line Chart
  const [currentData, setCurrentData] = useState<Array<{ label: string; value: number }>>([]);
  const [categoryData, setCategoryData] = useState<Array<{ category: string; amount: number; percentage: number; color: string }>>([]);
  const fadeAnim = useState(new Animated.Value(1))[0];

  const dataService = GraphDataService.getInstance();

  const periodOptions = ['Week', 'Month', 'Year'];
  const chartTypeOptions = ['Timeline', 'Categories', 'Trends'];

  useEffect(() => {
    // Fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Update data
      const periodKeys = ['week', 'month', 'year'] as const;
      const newData = dataService.getSpendingData(periodKeys[selectedPeriod]);
      setCurrentData(newData);
      setCategoryData(dataService.getCategoryData());

      // Fade in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [selectedPeriod, selectedChartType]);

  const handlePeriodChange = (index: number) => {
    setSelectedPeriod(index);
  };

  const handleChartTypeChange = (index: number) => {
    setSelectedChartType(index);
  };

  const getTotalSpending = () => {
    return currentData.reduce((sum, item) => sum + item.value, 0);
  };

  const getAverageSpending = () => {
    return Math.round(getTotalSpending() / currentData.length);
  };

  const handleCategoryPress = (category: any) => {
    // Handle category selection - you can add navigation or filtering logic here
    console.log('Selected category:', category);
  };

  const renderBarChart = () => (
    <Animated.View style={[styles.chartContainer, { opacity: fadeAnim }]}>
      <AnimatedBarChart
        data={currentData}
        barColor={COLORS.THEME}
        backgroundColor="#F8F9FA"
        showValues={true}
        height={200}
      />
    </Animated.View>
  );

  const renderPieChart = () => (
    <Animated.View style={[styles.chartContainer, { opacity: fadeAnim }]}>
      <AnimatedPieChart
        data={categoryData}
        size={250}
        strokeWidth={50}
        onSlicePress={handleCategoryPress}
      />
    </Animated.View>
  );

  const renderLineChart = () => (
    <Animated.View style={[styles.chartContainer, { opacity: fadeAnim }]}>
      <AnimatedLineChart
        data={currentData}
        height={200}
        lineColor={COLORS.THEME}
        fillColor="rgba(61, 176, 199, 0.1)"
        showGrid={true}
        showPoints={true}
      />
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Time Period Selector */}
      <View style={styles.selectorContainer}>
        <SegmentedControl
          options={periodOptions}
          selectedIndex={selectedPeriod}
          onSelectionChange={handlePeriodChange}
        />
      </View>

      {/* Chart Type Selector */}
      <View style={styles.chartTypeContainer}>
        <SegmentedControl
          options={chartTypeOptions}
          selectedIndex={selectedChartType}
          onSelectionChange={handleChartTypeChange}
        />
      </View>

      {/* Spending Summary - Only show for bar chart */}
      {selectedChartType === 0 && (
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Spending</Text>
            <Text style={styles.summaryValue}>${getTotalSpending().toLocaleString()}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Average</Text>
            <Text style={styles.summaryValue}>${getAverageSpending().toLocaleString()}</Text>
          </View>
        </View>
      )}

      {/* Chart Content */}
      {selectedChartType === 0 && renderBarChart()}
      {selectedChartType === 1 && renderPieChart()}
      {selectedChartType === 2 && renderLineChart()}

      {/* Chart Legend - Only for bar chart */}
      {selectedChartType === 0 && (
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: COLORS.THEME }]} />
            <Text style={styles.legendText}>Spending Amount</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    borderRadius: RFValue(12),
    padding: RFValue(16),
    marginHorizontal: RFValue(16),
    marginVertical: RFValue(8),
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectorContainer: {
    marginBottom: RFValue(16),
  },
  chartTypeContainer: {
    marginBottom: RFValue(20),
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: RFValue(20),
    paddingHorizontal: RFValue(8),
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: RFValue(12, height),
    fontFamily: FONTS.Regular,
    color: COLORS.GRAY_SHADE1,
    marginBottom: RFValue(4),
  },
  summaryValue: {
    fontSize: RFValue(18, height),
    fontFamily: FONTS.Bold,
    color: COLORS.BLACK,
  },
  chartContainer: {
    marginBottom: RFValue(16),
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: RFValue(12),
    height: RFValue(12),
    borderRadius: RFValue(2),
    marginRight: RFValue(8),
  },
  legendText: {
    fontSize: RFValue(12, height),
    fontFamily: FONTS.Regular,
    color: COLORS.GRAY_SHADE1,
  },
});

export default SpendingGraph; 