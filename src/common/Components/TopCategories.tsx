import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS } from '../Utils/Colors';
import { FONTS } from '../Utils/Fonts';
import { height } from '../Utils/Constant';
import GraphDataService, { CategoryData } from '../Utils/GraphDataService';

/**
 * TopCategories Component
 * 
 * Usage Examples:
 * 
 * // Basic usage with default data
 * <TopCategories />
 * 
 * // With custom data
 * <TopCategories 
 *   data={customCategoryData}
 *   title="My Categories"
 *   maxItems={5}
 *   onCategoryPress={(category) => console.log(category)}
 * />
 * 
 * // Circular progress bars (default)
 * <TopCategories 
 *   data={dataService.getCategoryData()}
 *   title="Top Categories"
 *   progressType="circular"
 * />
 * 
 * // Simple linear progress bars
 * <TopCategories 
 *   data={dataService.getCategoryData()}
 *   title="Top Categories"
 *   progressType="simple"
 * />
 * 
 * // In Graph screen
 * <TopCategories 
 *   data={dataService.getCategoryData()}
 *   title="Top Categories"
 *   maxItems={3}
 *   progressType="circular"
 *   onCategoryPress={handleCategoryPress}
 * />
 */

interface TopCategoriesProps {
  data?: CategoryData[];
  title?: string;
  maxItems?: number;
  onCategoryPress?: (category: CategoryData) => void;
  containerStyle?: any;
  progressType?: 'circular' | 'simple'; // New prop to choose progress bar type
}

const TopCategories: React.FC<TopCategoriesProps> = ({
  data = [],
  title = "Top Categories",
  maxItems = 3,
  onCategoryPress,
  containerStyle,
  progressType = 'circular', // Default to circular
}) => {
  // Get top categories sorted by percentage
  const topCategories = data
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, maxItems);

  const renderCategoryIcon = (categoryName: string) => {
    // Simple icon mapping - you can replace with actual icons
    const iconMap: { [key: string]: string } = {
      'Food': '🍽️',
      'Food & Dining': '🍽️',
      'Transportation': '🚗',
      'Shopping': '🛍️',
      'Entertainment': '🎬',
      'Utilities': '⚡',
      'Healthcare': '🏥',
      'Rent': '🏠',
      'Utility Bills': '📄',
      'Others': '📦',
    };

    return iconMap[categoryName] || '📊';
  };

  const renderCircularProgress = (percentage: number, color: string) => {
    const size = RFValue(50);
    const strokeWidth = RFValue(6);
    
    // Calculate the angle for the progress
    const angle = Math.min((percentage / 100) * 360, 360);
    
    return (
      <View style={[styles.progressContainer, { width: size, height: size }]}>
        {/* Background circle */}
        <View
          style={[
            styles.progressBackground,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
            },
          ]}
        />
        
        {/* Progress circle using border approach */}
        {percentage > 0 && (
          <View
            style={[
              styles.progressCircle,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: 'transparent',
                borderTopColor: angle > 0 ? color : 'transparent',
                borderRightColor: angle > 90 ? color : 'transparent',
                borderBottomColor: angle > 180 ? color : 'transparent',
                borderLeftColor: angle > 270 ? color : 'transparent',
                transform: [
                  { rotate: '-90deg' },
                  { rotate: `${angle}deg` }
                ],
              },
            ]}
          />
        )}
        
        {/* Percentage text overlay */}
        <View style={styles.percentageTextContainer}>
          <Text style={[styles.percentageText, { color: color }]}>
            {Math.round(percentage)}%
          </Text>
        </View>
      </View>
    );
  };

  // Simple and reliable progress bar
  const renderSimpleProgress = (percentage: number, color: string) => {
    return (
      <View style={styles.simpleProgressContainer}>
        <View style={styles.simpleProgressBackground}>
          <View 
            style={[
              styles.simpleProgressFill,
              { 
                width: `${Math.min(percentage, 100)}%`,
                backgroundColor: color,
              }
            ]} 
          />
        </View>
        <Text style={[styles.simpleProgressText, { color: color }]}>
          {Math.round(percentage)}%
        </Text>
      </View>
    );
  };

  const renderCategoryItem = (item: CategoryData, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.categoryCard}
      onPress={() => onCategoryPress?.(item)}
      activeOpacity={0.8}
    >
      <View style={styles.categoryLeft}>
        <View style={styles.iconContainer}>
          <Text style={styles.categoryIcon}>
            {renderCategoryIcon(item.category)}
          </Text>
        </View>
        <View style={styles.categoryInfo}>
          <Text style={styles.categoryName}>{item.category}</Text>
          <Text style={styles.categoryPercentage}>
            {item.percentage}% of total
          </Text>
        </View>
      </View>
      <View style={styles.categoryRight}>
        {progressType === 'circular' 
          ? renderCircularProgress(item.percentage, item.color)
          : renderSimpleProgress(item.percentage, item.color)
        }
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.categoriesContainer}>
        {topCategories.map((item, index) => renderCategoryItem(item, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: RFValue(16),
  },
  title: {
    fontSize: RFValue(18, height),
    fontFamily: FONTS.SemiBold,
    color: COLORS.BLACK,
    marginBottom: RFValue(16, height),
    marginHorizontal: RFValue(16),
  },
  categoriesContainer: {
    gap: RFValue(12),
  },
  categoryCard: {
    marginHorizontal: RFValue(16),
    backgroundColor: COLORS.WHITE,
    borderRadius: RFValue(12),
    padding: RFValue(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(8),
    backgroundColor: COLORS.GRAY_SHADE2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: RFValue(12),
  },
  categoryIcon: {
    fontSize: RFValue(20),
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: RFValue(16, height),
    fontFamily: FONTS.SemiBold,
    color: COLORS.BLACK,
    marginBottom: RFValue(4, height),
  },
  categoryPercentage: {
    fontSize: RFValue(14, height),
    fontFamily: FONTS.Regular,
    color: COLORS.GRAY_SHADE1,
  },
  categoryRight: {
    alignItems: 'center',
  },
  progressContainer: {
    position: 'relative',
  },
  progressBackground: {
    position: 'absolute',
    borderColor: COLORS.GREY_SHADE,
  },
  progressFill: {
    position: 'absolute',
    overflow: 'hidden',
  },
  progressArc: {
    position: 'absolute',
  },
  progressCircle: {
    position: 'absolute',
  },
  percentageTextContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: RFValue(8, height),
    fontFamily: FONTS.Bold,
    textAlign: 'center',
  },
  linearProgressContainer: {
    width: RFValue(100), // Fixed width for linear progress
    height: RFValue(8),
    backgroundColor: COLORS.GRAY_SHADE2,
    borderRadius: RFValue(4),
    overflow: 'hidden',
    marginTop: RFValue(8, height),
  },
  linearProgressBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.GREY_SHADE,
    borderRadius: RFValue(4),
  },
  linearProgressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: RFValue(4),
  },
  linearProgressText: {
    position: 'absolute',
    top: RFValue(-20, height), // Adjust position to be above the bar
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: RFValue(12, height),
    fontFamily: FONTS.Bold,
  },
  simpleProgressContainer: {
    width: RFValue(100), // Fixed width for simple progress
    alignItems: 'center',
  },
  simpleProgressBackground: {
    width: '100%',
    height: RFValue(8),
    backgroundColor: COLORS.GRAY_SHADE2,
    borderRadius: RFValue(4),
    overflow: 'hidden',
  },
  simpleProgressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: RFValue(4),
  },
  simpleProgressText: {
    position: 'absolute',
    top: RFValue(-20, height), // Adjust position to be above the bar
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: RFValue(12, height),
    fontFamily: FONTS.Bold,
  },
});

export default TopCategories;

// Example usage and testing
export const TopCategoriesExample = () => {
  const dataService = GraphDataService.getInstance();
  
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        Progress Bar Examples
      </Text>
      
      {/* Circular Progress Bars */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
        Circular Progress Bars:
      </Text>
      <TopCategories 
        data={dataService.getCategoryData()}
        title="Circular Progress"
        progressType="circular"
        maxItems={3}
      />
      
      {/* Simple Progress Bars */}
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginTop: 20 }}>
        Simple Progress Bars:
      </Text>
      <TopCategories 
        data={dataService.getCategoryData()}
        title="Simple Progress"
        progressType="simple"
        maxItems={3}
      />
    </View>
  );
}; 