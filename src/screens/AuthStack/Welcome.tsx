import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { COLORS } from '../../common/Utils/Colors';
import { FONTS, FONT_SIZES, TEXT_STYLES } from '../../common/Utils/Fonts';

const { width, height } = Dimensions.get('window');

interface WelcomeProps {
  onGetStarted?: () => void;
  navigation?: any;
}

const Welcome: React.FC<WelcomeProps> = ({ onGetStarted, navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUpAnim = useRef(new Animated.Value(80)).current;
  const mapScaleAnim = useRef(new Animated.Value(0.6)).current;
  const balloonAnim1 = useRef(new Animated.Value(0)).current;
  const balloonAnim2 = useRef(new Animated.Value(0)).current;
  const balloonAnim3 = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(0)).current;
  const textSlideAnim = useRef(new Animated.Value(40)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    startAnimations();
    startPulseAnimation();
  }, []);

  const startAnimations = () => {
    // Enhanced staggered animations
    Animated.sequence([
      // Initial fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      // Map and text animations
      Animated.parallel([
        Animated.timing(slideUpAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(mapScaleAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(textSlideAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Balloon animations with bounce effect
    setTimeout(() => {
      Animated.stagger(300, [
        Animated.spring(balloonAnim1, {
          toValue: 1,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(balloonAnim2, {
          toValue: 1,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.spring(balloonAnim3, {
          toValue: 1,
          tension: 40,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);

    // Button animation
    setTimeout(() => {
      Animated.spring(buttonScaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }, 1800);
  };

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else if (navigation) {
      navigation.navigate('Wellness');
    }
  };

  const renderWorldMap = () => {
    const dots = [];
    const rows = 22;
    const cols = 28;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        // Enhanced landmass patterns
        const isLand = 
          (i > 5 && i < 12 && j > 8 && j < 16) || // North America
          (i > 10 && i < 16 && j > 18 && j < 26) || // Eurasia
          (i > 14 && i < 20 && j > 9 && j < 14) || // South America
          (i > 8 && i < 12 && j > 3 && j < 8) || // Europe
          (i > 6 && i < 10 && j > 20 && j < 25); // Australia

        const opacity = isLand ? 0.8 + Math.random() * 0.2 : 0.05 + Math.random() * 0.15;
        const size = isLand ? 3 + Math.random() * 2 : 2 + Math.random() * 1;
        
        dots.push(
          <Animated.View
            key={`${i}-${j}`}
            style={[
              styles.mapDot,
              {
                left: (j / cols) * width * 0.9,
                top: (i / rows) * height * 0.5,
                opacity: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, opacity],
                }),
                width: size,
                height: size,
                borderRadius: size / 2,
              },
            ]}
          />
        );
      }
    }
    return dots;
  };

  const renderBalloon = (color: string, position: { x: number; y: number }, animValue: Animated.Value, delay: number = 0) => {
    return (
      <Animated.View
        style={[
          styles.balloon,
          {
            backgroundColor: color,
            left: position.x,
            top: position.y,
            opacity: animValue,
            transform: [
              {
                scale: animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.2, 1],
                }),
              },
              {
                translateY: animValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [60, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.balloonHighlight} />
        <View style={styles.balloonString} />
        <View style={styles.balloonShadow} />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Enhanced Background Gradient */}
      <View style={styles.backgroundGradient}>
        <View style={styles.gradientLayer1} />
        <View style={styles.gradientLayer2} />
        <View style={styles.gradientLayer3} />
        <View style={styles.overlay} />
      </View>

      {/* Floating Particles */}
      <View style={styles.particlesContainer}>
        {[...Array(25)].map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                left: Math.random() * width,
                top: Math.random() * height,
                opacity: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.2 + Math.random() * 0.3],
                }),
              },
            ]}
          />
        ))}
      </View>

      {/* Header Section */}
      <Animated.View
        style={[
          styles.headerSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: textSlideAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>💰</Text>
          <Text style={styles.logoText}>Budgetizer</Text>
        </View>
      </Animated.View>

      {/* World Map */}
      <Animated.View
        style={[
          styles.mapContainer,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideUpAnim },
              { scale: mapScaleAnim },
            ],
          },
        ]}
      >
        {renderWorldMap()}
        
        {/* Enhanced Balloons */}
        {renderBalloon('#FF6B9D', { x: width * 0.2, y: height * 0.1 }, balloonAnim1)}
        {renderBalloon('#FFD93D', { x: width * 0.68, y: height * 0.15 }, balloonAnim2)}
        {renderBalloon('#6BCF7F', { x: width * 0.15, y: height * 0.28 }, balloonAnim3)}
      </Animated.View>

      {/* Welcome Text */}
      <Animated.View
        style={[
          styles.textContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: textSlideAnim }],
          },
        ]}
      >
        <Text style={styles.welcomeText}>Welcome to Join</Text>
        <Animated.Text 
          style={[
            styles.highlightText,
            {
              transform: [{ scale: pulseAnim }],
            },
          ]}
        >
          5 Million
        </Animated.Text>
        <Text style={styles.fansText}>Budgetizer Fans</Text>
        <Text style={styles.subtitleText}>Start your financial journey today</Text>
      </Animated.View>

      {/* Enhanced Get Started Button */}
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideUpAnim },
              { scale: buttonScaleAnim },
            ],
          },
        ]}
      >
        <TouchableOpacity 
          style={styles.getStartedButton} 
          onPress={handleGetStarted}
          activeOpacity={0.7}
        >
          <View style={styles.buttonInner}>
            <Text style={styles.buttonText}>Get Started</Text>
            {/* <View style={styles.buttonIconContainer}>
              <Text style={styles.buttonIcon}>→</Text>
            </View> */}
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingTop: height * 0.06,
    paddingBottom: height * 0.08,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.THEME,
  },
  gradientLayer1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#2A9DA8',
    opacity: 0.6,
  },
  gradientLayer2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#4ECDC4',
    opacity: 0.4,
  },
  gradientLayer3: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.THEME,
    opacity: 0.2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  particle: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#FFFFFF',
  },
  headerSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoIcon: {
    fontSize: FONT_SIZES.h6,
    marginRight: 10,
  },
  logoText: {
    color: COLORS.WHITE,
    ...TEXT_STYLES.logo,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 20,
  },
  mapDot: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
  },
  balloon: {
    position: 'absolute',
    width: 30,
    height: 40,
    borderRadius: 15,
    justifyContent: 'flex-end',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  balloonHighlight: {
    position: 'absolute',
    top: 5,
    left: 7,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  balloonString: {
    width: 2,
    height: 28,
    backgroundColor: '#333',
    marginBottom: -15,
  },
  balloonShadow: {
    position: 'absolute',
    bottom: -10,
    left: 5,
    right: 5,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: FONT_SIZES.h6,
    fontFamily: FONTS.Regular,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  highlightText: {
    fontSize: FONT_SIZES.h2,
    fontFamily: FONTS.Bold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  fansText: {
    fontSize: FONT_SIZES.h6,
    fontFamily: FONTS.SemiBold,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitleText: {
    ...TEXT_STYLES.bodyMedium,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  getStartedButton: {
    borderRadius: 35,
    shadowColor: COLORS.THEME,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 16,
    backgroundColor: COLORS.THEME,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 45,
    paddingVertical: 10,
    borderRadius: 35,
  },
  buttonText: {
    color: '#FFFFFF',
    ...TEXT_STYLES.buttonLarge,
    textAlign: 'center',
    marginRight: 12,
  },
  buttonIconContainer: {
    width: 25,
    height: 25,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonIcon: {
    color: '#FFFFFF',
    fontSize: FONT_SIZES.bodyLarge,
    fontFamily: FONTS.Bold,
  },
}); 