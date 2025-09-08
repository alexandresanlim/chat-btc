/**
 * Spacing constants for margins, paddings, and border radius
 * Used throughout the app to maintain consistent spacing
 */

export const Spacing = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  xxxl: 32,
  xxxxl: 42,
} as const;

export const BorderRadius = {
  small: 4,
  medium: 8,
  large: 16,
  xlarge: 24,
  round: 32,
} as const;

// Common size values
export const Sizes = {
  icon: {
    small: 16,
    medium: 24,
    large: 28,
    xlarge: 30,
    xxlarge: 44,
  },
  avatar: {
    small: 30,
    medium: 44,
  },
  borderWidth: {
    thin: 2,
    medium: 3,
    thick: 4,
  },
} as const;