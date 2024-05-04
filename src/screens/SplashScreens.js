// Import necessary React Native and Expo components
import { View, Text, ImageBackground } from "react-native";
import React, { useEffect, useCallback } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

// Define the SplashScreens functional component
export default function SplashScreens() {
  // Hook to handle navigation
  const navigation = useNavigation();

  // Load custom fonts and track loading status and errors
  const [fontsLoaded, fontError] = useFonts({
    SpaceGroteskSemiBold: require("../fonts/SpaceGrotesk-SemiBold.ttf"),
    SpaceGroteskBold: require("../fonts/SpaceGrotesk-Bold.ttf"),
    SpaceGroteskMedium: require("../fonts/SpaceGrotesk-Medium.ttf"),
  });

  // Function to handle layout and navigation after fonts are loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      // Ensures splash screen is hidden only after fonts are loaded
      await SplashScreen.hideAsync();
    }

    // Delay navigation to the Welcome screen by 3 seconds
    setTimeout(() => {
      navigation.navigate("Welcome");
    }, 3000);
  }, [fontsLoaded, fontError]);

  // Use effect to run onLayoutRootView when fontsLoaded or fontError changes
  useEffect(() => {
    onLayoutRootView();
  }, [fontsLoaded, fontError]);

  // Show nothing if fonts are not loaded yet
  if (!fontsLoaded) {
    return null;
  }

  // Render the splash screen with an image background and a linear gradient overlay
  return (
    <ImageBackground
      source={require("../images/SplashScreen.png")}
      className="flex-1 justify-center items-center"
    >
      <LinearGradient
        colors={["rgba(0, 85, 0, 0.95)", "rgba(0, 85, 0, 0.95)"]}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      <Animated.View
        onLayout={onLayoutRootView}
        entering={FadeInDown.delay(200).duration(700).springify().damping(12)}
      >
      </Animated.View>
    </ImageBackground>
  );
}
