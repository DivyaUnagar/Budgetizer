import { RFValue } from 'react-native-responsive-fontsize';

// Base font sizes for different screen sizes
const BASE_FONT_SIZES = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 28,
  '5xl': 32,
  '6xl': 36,
  '7xl': 40,
  '8xl': 44,
  '9xl': 48,
};

// Responsive font size function
const RF = (size: number) => RFValue(size, 812); // 812 is iPhone X height as base

// Font families
export const FONTS = {
  Bold: 'Montserrat-Bold',
  SemiBold: 'Montserrat-SemiBold',
  Medium: 'Montserrat-Medium',
  Regular: 'Montserrat-Regular',
  Light: 'Montserrat-Light',
};

// Responsive font sizes for different text types
export const FONT_SIZES = {
  // Headings
  h1: RF(BASE_FONT_SIZES['8xl']), // 44px
  h2: RF(BASE_FONT_SIZES['7xl']), // 40px
  h3: RF(BASE_FONT_SIZES['6xl']), // 36px
  h4: RF(BASE_FONT_SIZES['5xl']), // 32px
  h5: RF(BASE_FONT_SIZES['4xl']), // 28px
  h6: RF(BASE_FONT_SIZES['3xl']), // 24px

  // Body text
  bodyLarge: RF(BASE_FONT_SIZES.xl),   // 18px
  bodyMedium: RF(BASE_FONT_SIZES.lg),  // 16px
  bodySmall: RF(BASE_FONT_SIZES.base), // 14px
  bodyXSmall: RF(BASE_FONT_SIZES.sm),  // 12px

  // Buttons
  buttonLarge: RF(BASE_FONT_SIZES.xl),   // 18px
  buttonMedium: RF(BASE_FONT_SIZES.lg),  // 16px
  buttonSmall: RF(BASE_FONT_SIZES.base), // 14px

  // Input fields
  inputLarge: RF(BASE_FONT_SIZES.lg),   // 16px
  inputMedium: RF(BASE_FONT_SIZES.base), // 14px
  inputSmall: RF(BASE_FONT_SIZES.sm),    // 12px

  // Labels and captions
  label: RF(BASE_FONT_SIZES.sm),     // 12px
  caption: RF(BASE_FONT_SIZES.xs),   // 10px

  // Special sizes for specific components
  logo: RF(BASE_FONT_SIZES['2xl']),      // 20px
  navigation: RF(BASE_FONT_SIZES.base),  // 14px
  tab: RF(BASE_FONT_SIZES.sm),           // 12px
};

// Responsive line heights
export const LINE_HEIGHTS = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
};

// Responsive letter spacing
export const LETTER_SPACING = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
};

// Predefined text styles for common use cases
export const TEXT_STYLES = {
  // Headings
  heading1: {
    fontSize: FONT_SIZES.h1,
    fontFamily: FONTS.Bold,
    lineHeight: FONT_SIZES.h1 * LINE_HEIGHTS.tight,
  },
  heading2: {
    fontSize: FONT_SIZES.h2,
    fontFamily: FONTS.Bold,
    lineHeight: FONT_SIZES.h2 * LINE_HEIGHTS.tight,
  },
  heading3: {
    fontSize: FONT_SIZES.h3,
    fontFamily: FONTS.Bold,
    lineHeight: FONT_SIZES.h3 * LINE_HEIGHTS.tight,
  },
  heading4: {
    fontSize: FONT_SIZES.h4,
    fontFamily: FONTS.SemiBold,
    lineHeight: FONT_SIZES.h4 * LINE_HEIGHTS.tight,
  },
  heading5: {
    fontSize: FONT_SIZES.h5,
    fontFamily: FONTS.SemiBold,
    lineHeight: FONT_SIZES.h5 * LINE_HEIGHTS.tight,
  },
  heading6: {
    fontSize: FONT_SIZES.h6,
    fontFamily: FONTS.SemiBold,
    lineHeight: FONT_SIZES.h6 * LINE_HEIGHTS.tight,
  },

  // Body text
  bodyLarge: {
    fontSize: FONT_SIZES.bodyLarge,
    fontFamily: FONTS.Regular,
    lineHeight: FONT_SIZES.bodyLarge * LINE_HEIGHTS.normal,
  },
  bodyMedium: {
    fontSize: FONT_SIZES.bodyMedium,
    fontFamily: FONTS.Regular,
    lineHeight: FONT_SIZES.bodyMedium * LINE_HEIGHTS.normal,
  },
  bodySmall: {
    fontSize: FONT_SIZES.bodySmall,
    fontFamily: FONTS.Regular,
    lineHeight: FONT_SIZES.bodySmall * LINE_HEIGHTS.normal,
  },
  bodyXSmall: {
    fontSize: FONT_SIZES.bodyXSmall,
    fontFamily: FONTS.Regular,
    lineHeight: FONT_SIZES.bodyXSmall * LINE_HEIGHTS.normal,
  },

  // Buttons
  buttonLarge: {
    fontSize: FONT_SIZES.buttonLarge,
    fontFamily: FONTS.SemiBold,
    letterSpacing: LETTER_SPACING.wide,
  },
  buttonMedium: {
    fontSize: FONT_SIZES.buttonMedium,
    fontFamily: FONTS.SemiBold,
    letterSpacing: LETTER_SPACING.wide,
  },
  buttonSmall: {
    fontSize: FONT_SIZES.buttonSmall,
    fontFamily: FONTS.Medium,
    letterSpacing: LETTER_SPACING.normal,
  },

  // Input fields
  inputLarge: {
    fontSize: FONT_SIZES.inputLarge,
    fontFamily: FONTS.Regular,
  },
  inputMedium: {
    fontSize: FONT_SIZES.inputMedium,
    fontFamily: FONTS.Regular,
  },
  inputSmall: {
    fontSize: FONT_SIZES.inputSmall,
    fontFamily: FONTS.Regular,
  },

  // Labels and captions
  label: {
    fontSize: FONT_SIZES.label,
    fontFamily: FONTS.Medium,
    letterSpacing: LETTER_SPACING.wide,
  },
  caption: {
    fontSize: FONT_SIZES.caption,
    fontFamily: FONTS.Regular,
    letterSpacing: LETTER_SPACING.normal,
  },

  // Special styles
  logo: {
    fontSize: FONT_SIZES.logo,
    fontFamily: FONTS.SemiBold,
    letterSpacing: LETTER_SPACING.wide,
  },
  navigation: {
    fontSize: FONT_SIZES.navigation,
    fontFamily: FONTS.Medium,
  },
  tab: {
    fontSize: FONT_SIZES.tab,
    fontFamily: FONTS.Medium,
  },
};

// Helper function to create custom responsive text styles
export const createTextStyle = (
  fontSize: number,
  fontFamily: string = FONTS.Regular,
  lineHeight?: number,
  letterSpacing?: number
) => ({
  fontSize: RF(fontSize),
  fontFamily,
  ...(lineHeight && { lineHeight: RF(fontSize) * lineHeight }),
  ...(letterSpacing && { letterSpacing }),
});

// Export the RF function for direct use
export { RFValue as RF, RF as RFSize };
