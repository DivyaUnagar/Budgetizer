import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import { COLORS } from '../../common/Utils/Colors';
import { FONTS, FONT_SIZES, TEXT_STYLES } from '../../common/Utils/Fonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

interface WellnessProps {
  navigation?: any;
  onContinue?: () => void;
  onBack?: () => void;
}

const Wellness: React.FC<WellnessProps> = ({ navigation, onContinue, onBack }) => {
  const inset = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(40)).current;
  const textScaleAnim = useRef(new Animated.Value(0.9)).current;
  const imageScaleAnim = useRef(new Animated.Value(0.85)).current;
  const starAnim1 = useRef(new Animated.Value(0)).current;
  const starAnim2 = useRef(new Animated.Value(0)).current;
  const starAnim3 = useRef(new Animated.Value(0)).current;
  const starAnim4 = useRef(new Animated.Value(0)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const logoAnim = useRef(new Animated.Value(0)).current;
  const hexagonAnim = useRef(new Animated.Value(0)).current;
  const rectangleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startAnimations();
  }, []);

  const startAnimations = () => {
    // Logo animation
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Main content animations
    Animated.sequence([
      // Initial fade
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Staggered content entrance
      Animated.stagger(150, [
        Animated.timing(slideUpAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(textScaleAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(imageScaleAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(buttonAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Decorative elements
    setTimeout(() => {
      Animated.stagger(100, [
        Animated.timing(hexagonAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(rectangleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, 400);

    // Stars with different delays
    setTimeout(() => {
      Animated.stagger(120, [
        Animated.timing(starAnim1, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(starAnim2, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(starAnim3, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(starAnim4, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    }, 600);
  };

  const handleContinue = () => {
    Animated.sequence([
      Animated.timing(buttonAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onContinue) {
        onContinue();
      } else if (navigation) {
        navigation.navigate('Login');
      }
    });
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation) {
      navigation.goBack();
    } else {
      // If no navigation prop, we can't go back in this context
      // This is handled by the SplashWrapper
    }
  };

  return (
    <View style={[styles.container,{paddingTop: inset.top + 15}]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header with back button and Budgetizer icon */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Animated.View 
          style={[
            styles.headerCenter,
            {
              opacity: logoAnim,
              transform: [
                { scale: logoAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                })},
              ],
            },
          ]}
        >
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>💰</Text>
            <Text style={styles.logoText}>Budgetizer</Text>
          </View>
        </Animated.View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Content Container */}
        <Animated.View
          style={[
            styles.mainContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }],
            },
          ]}
        >
         

          {/* Central Text with exact styling */}
          <Animated.View
            style={[
              styles.textContainer,
              {
                transform: [{ scale: textScaleAnim }],
              },
            ]}
          >
            <View style={styles.textRow}>
              <Animated.View 
                style={[
                  styles.yellowHexagon,
                  {
                    opacity: hexagonAnim,
                    transform: [
                      { scale: hexagonAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      })},
                      { rotate: hexagonAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['45deg', '45deg'],
                      })},
                    ],
                  },
                ]} 
              />
              <Text style={styles.moveText}>SAVE</Text>
            </View>
            <View style={styles.textRow}>
              <Text style={styles.gentlyText}>SMARTLY</Text>
              <Animated.View 
                style={[
                  styles.pinkRectangle,
                  {
                    opacity: rectangleAnim,
                    transform: [
                      { scale: rectangleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                      })},
                    ],
                  },
                ]} 
              />
            </View>
            <Text style={styles.improveText}>GROW</Text>
            <Text style={styles.rapidlyText}>RAPIDLY</Text>
          </Animated.View>

          {/* Decorative Stars */}
          <Animated.View
            style={[
              styles.star1,
              {
                opacity: starAnim1,
                transform: [
                  { scale: starAnim1.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  })},
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.star2,
              {
                opacity: starAnim2,
                transform: [
                  { scale: starAnim2.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  })},
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.star3,
              {
                opacity: starAnim3,
                transform: [
                  { scale: starAnim3.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  })},
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.star4,
              {
                opacity: starAnim4,
                transform: [
                  { scale: starAnim4.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  })},
                ],
              },
            ]}
          />

          {/* Fitness Women Images */}
          <Animated.View
            style={[
              styles.imagesContainer,
              {
                transform: [{ scale: imageScaleAnim }],
              },
            ]}
          >
            {/* Top Left - Savings */}
            <View style={styles.imageContainer}>
              <View style={styles.imagePlaceholder1}>
                <View style={styles.imageContent}>
                  <Text style={styles.imageEmoji}>💎</Text>
                  <Text style={styles.imageLabel}>Smart Save</Text>
                </View>
              </View>
            </View>

            {/* Top Right - Budget */}
            <View style={styles.imageContainer}>
              <View style={styles.imagePlaceholder2}>
                <View style={styles.imageContent}>
                  <Text style={styles.imageEmoji}>⚡</Text>
                  <Text style={styles.imageLabel}>Quick Track</Text>
                </View>
              </View>
            </View>

            {/* Bottom Left - Investment */}
            <View style={styles.imageContainer}>
              <View style={styles.imagePlaceholder3}>
                <View style={styles.imageContent}>
                  <Text style={styles.imageEmoji}>🚀</Text>
                  <Text style={styles.imageLabel}>Grow Fast</Text>
                </View>
              </View>
            </View>

            {/* Bottom Right - Goals */}
            <View style={styles.imageContainer}>
              <View style={styles.imagePlaceholder4}>
                <View style={styles.imageContent}>
                  <Text style={styles.imageEmoji}>⭐</Text>
                  <Text style={styles.imageLabel}>Reach Goals</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </Animated.View>

        {/* Continue Button */}
        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideUpAnim },
                { scale: buttonAnim },
              ],
            },
          ]}
        >
          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.continueButtonText}>Continue</Text>
              <Text style={styles.buttonIcon}>💰</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default Wellness;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    // paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: FONT_SIZES.h6,
    color: '#333',
    fontFamily: FONTS.Bold,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 157, 168, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(42, 157, 168, 0.2)',
  },
  logoIcon: {
    fontSize: FONT_SIZES.h6,
    marginRight: 8,
  },
  logoText: {
    ...TEXT_STYLES.logo,
    color: COLORS.THEME,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    position: 'relative',
    minHeight: height * 0.7,
  },
  brandingContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  brandingText: {
    fontSize: 14,
    fontFamily: FONTS.Regular,
    color: COLORS.THEME,
    opacity: 0.7,
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 50,
    position: 'relative',
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  moveText: {
    fontSize: FONT_SIZES.h6,
    fontFamily: FONTS.Bold,
    color: '#2E3A59',
    marginLeft: 15,
  },
  gentlyText: {
    fontSize: FONT_SIZES.h2,
    fontFamily: FONTS.Bold,
    color: '#2E3A59',
    marginRight: 15,
  },
  improveText: {
    fontSize: FONT_SIZES.h6,
    fontFamily: FONTS.Bold,
    color: '#2E3A59',
    marginBottom: 5,
  },
  rapidlyText: {
    fontSize: FONT_SIZES.h2,
    fontFamily: FONTS.Bold,
    color: '#2E3A59',
  },
  yellowHexagon: {
    width: 20,
    height: 20,
    backgroundColor: '#FFD93D',
    transform: [{ rotate: '45deg' }],
  },
  pinkRectangle: {
    width: 25,
    height: 15,
    backgroundColor: '#FF6B9D',
    borderRadius: 8,
  },
  star1: {
    position: 'absolute',
    top: '15%',
    left: '10%',
    width: 12,
    height: 12,
    backgroundColor: '#6BCF7F',
    borderRadius: 6,
    transform: [{ rotate: '45deg' }],
  },
  star2: {
    position: 'absolute',
    top: '25%',
    right: '15%',
    width: 10,
    height: 10,
    backgroundColor: '#6BCF7F',
    borderRadius: 5,
    transform: [{ rotate: '45deg' }],
  },
  star3: {
    position: 'absolute',
    bottom: '35%',
    left: '20%',
    width: 8,
    height: 8,
    backgroundColor: '#6BCF7F',
    borderRadius: 4,
    transform: [{ rotate: '45deg' }],
  },
  star4: {
    position: 'absolute',
    bottom: '25%',
    right: '25%',
    width: 14,
    height: 14,
    backgroundColor: '#6BCF7F',
    borderRadius: 7,
    transform: [{ rotate: '45deg' }],
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
    gap: 20,
  },
  imageContainer: {
    width: '42%',
    aspectRatio: 1,
  },
  imagePlaceholder1: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E9ECEF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder2: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E9ECEF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder3: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E9ECEF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder4: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#E9ECEF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  imageEmoji: {
    fontSize: 35,
    marginBottom: 10,
  },
  imageLabel: {
    ...TEXT_STYLES.label,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 30,
    marginTop: 40,
  },
  continueButton: {
    backgroundColor: COLORS.THEME,
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: 'center',
    shadowColor: COLORS.THEME,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    fontSize: 18,
    marginLeft: 8,
  },
  continueButtonText: {
    color: '#FFFFFF',
    ...TEXT_STYLES.buttonLarge,
  },
}); 