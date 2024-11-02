/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#333333",
    background: "#fcfcfc",
    foreground: "#f0f0f0",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    border: "#dadada",
    link: "#1d53bf",
    scrollBottom: "#ffffff",
  },
  dark: {
    text: "#e6e6e6",
    background: "#0d0d0d",
    tint: tintColorDark,
    icon: "#9BA1A6",
    foreground: "#181818",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    border: "#4e4e4e",
    link: "#79b6fe",
    scrollBottom: "#333333",
  },
};
