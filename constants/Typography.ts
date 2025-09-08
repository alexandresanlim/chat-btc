/**
 * Typography constants for font sizes, line heights, and font weights
 * Used throughout the app to maintain consistent text styling
 */

export const FontSizes = {
  small: 14,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 28,
  xxxlarge: 32,
} as const;

export const LineHeights = {
  small: 20,
  medium: 24,
  large: 30,
  xlarge: 32,
} as const;

export const FontWeights = {
  normal: "400" as const,
  semibold: "600" as const,
  bold: "700" as const,
  extrabold: "bold" as const,
} as const;

// Common typography combinations
export const Typography = {
  default: {
    fontSize: FontSizes.medium,
    lineHeight: LineHeights.medium,
    fontWeight: FontWeights.normal,
  },
  defaultSemiBold: {
    fontSize: FontSizes.medium,
    lineHeight: LineHeights.medium,
    fontWeight: FontWeights.semibold,
  },
  title: {
    fontSize: FontSizes.xxxlarge,
    lineHeight: LineHeights.xlarge,
    fontWeight: FontWeights.extrabold,
  },
  subtitle: {
    fontSize: FontSizes.large,
    fontWeight: FontWeights.extrabold,
  },
  link: {
    fontSize: FontSizes.medium,
    lineHeight: LineHeights.large,
  },
} as const;