import { StyleSheet, Text, View, Animated, Dimensions, Image, StatusBar } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS } from '../../common/Utils/Colors'
import { FONTS } from '../../common/Utils/Fonts'

const { width, height } = Dimensions.get('window')

interface SplashProps {
  navigation?: any;
  onSplashComplete?: () => void;
}

const Splash: React.FC<SplashProps> = ({ navigation, onSplashComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideUpAnim = useRef(new Animated.Value(100)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current
  const progressAnim = useRef(new Animated.Value(0)).current
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    initializeApp()
  }, [])

  const initializeApp = async () => {
    try {
      console.log('🚀 Starting app initialization...')
      
      // Step 1: Load app configuration
      setProgress(20)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Step 2: Check authentication status
      setProgress(40)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Step 3: Load user preferences
      setProgress(60)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Step 4: Initialize services
      setProgress(80)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Step 5: Complete initialization
      setProgress(100)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      console.log('✅ App initialization completed')
      
      // Start animations
      startAnimations()
      
      // Complete splash after animations
      setTimeout(() => {
        setIsLoading(false)
        handleSplashComplete()
      }, 2000)
      
    } catch (error) {
      console.error('❌ App initialization error:', error)
      // Even if there's an error, complete the splash after a delay
      setTimeout(() => {
        setIsLoading(false)
        handleSplashComplete()
      }, 3000)
    }
  }

  const startAnimations = () => {
    console.log('🎬 Starting splash animations...')
    
    // Staggered animations for better visual effect
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(slideUpAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start()

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start()
  }

  const handleSplashComplete = () => {
    console.log('🎯 Splash screen completed, navigating...')
    
    if (onSplashComplete) {
      onSplashComplete()
    } else if (navigation) {
      const isAuthenticated = false // Replace with your auth logic
      if (isAuthenticated) {
        navigation.replace('MainApp')
      } else {
        navigation.replace('Welcome')
      }
    }
  }

  const getLoadingText = () => {
    if (progress < 20) return 'Initializing app...'
    if (progress < 40) return 'Checking authentication...'
    if (progress < 60) return 'Loading preferences...'
    if (progress < 80) return 'Initializing services...'
    if (progress < 100) return 'Finalizing setup...'
    return 'Ready to start!'
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background Image or Gradient */}
      <View style={styles.backgroundGradient}>
        <View style={styles.overlay} />
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Top Section - App Icon/Badge */}
        <Animated.View 
          style={[
            styles.topSection,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.appBadge}>
            <Text style={styles.badgeText}>💰</Text>
            <Text style={styles.badgeLabel}>Budgetizer</Text>
          </View>
        </Animated.View>

        {/* Center Section - Main Text */}
        <Animated.View 
          style={[
            styles.centerSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}
        >
          <Text style={styles.mainTitle}>Smart Budget</Text>
          <Text style={styles.subTitle}>Management</Text>
          <Text style={styles.tagline}>Your Money, Your Rules</Text>
        </Animated.View>

        {/* Bottom Section - Loading */}
        <Animated.View 
          style={[
            styles.bottomSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}
        >
          <View style={styles.loadingContainer}>
            <View style={styles.loadingBar}>
              <Animated.View 
                style={[
                  styles.loadingProgress,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%']
                    })
                  }
                ]}
              />
            </View>
            <Text style={styles.loadingText}>
              {getLoadingText()}
            </Text>
            <Text style={styles.progressText}>
              {progress}% Complete
            </Text>
          </View>
        </Animated.View>
      </View>

      {/* Decorative Elements */}
      <View style={styles.decorativeElements}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
        <View style={styles.circle3} />
      </View>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.THEME,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.THEME,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: height * 0.15,
    paddingBottom: height * 0.1,
    paddingHorizontal: 30,
  },
  topSection: {
    alignItems: 'center',
  },
  appBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  badgeText: {
    fontSize: 24,
    marginRight: 8,
  },
  badgeLabel: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: FONTS.SemiBold,
  },
  centerSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  mainTitle: {
    fontSize: 42,
    fontFamily: FONTS.Bold,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subTitle: {
    fontSize: 42,
    fontFamily: FONTS.Bold,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 18,
    fontFamily: FONTS.Regular,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  bottomSection: {
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    width: '100%',
  },
  loadingBar: {
    width: '80%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    marginBottom: 15,
    overflow: 'hidden',
  },
  loadingProgress: {
    height: '100%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 2,
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontFamily: FONTS.Medium,
    textAlign: 'center',
    marginBottom: 8,
  },
  progressText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontFamily: FONTS.Regular,
    textAlign: 'center',
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  circle1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    top: height * 0.2,
    right: -30,
  },
  circle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    bottom: height * 0.3,
    left: -20,
  },
  circle3: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    top: height * 0.6,
    right: width * 0.1,
  },
})