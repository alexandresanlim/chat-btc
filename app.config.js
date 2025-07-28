export default {
  expo: {
    name: "ChatBTC",
    slug: "chat-btc",
    version: "0.0.3",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "chatbtc",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "cover",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      targetSdkVersion: 35,
      compileSdkVersion: 35,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "io.github.aichatbtc",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router", "expo-localization"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      keys: {
        openAiApiKey: process.env.OPENAI_API_KEY,
      },
      urls: {
        openAiApiUrl: process.env.OPENAI_API_URL,
      },
      eas: {
        projectId: "ed28b44a-4e7c-44e7-9dbd-ec79ac910754",
      },
    },
  },
};
