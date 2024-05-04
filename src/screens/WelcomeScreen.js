// Import necessary React Native components and hooks
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

// Import responsive design helpers from react-native-responsive-screen
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

// Import LinearGradient for gradient effects on components
import { LinearGradient } from "expo-linear-gradient";

// Define the Welcome functional component
export default function Welcome() {
  // Navigation hook to handle screen transitions
  const navigation = useNavigation();

  // Render the Welcome screen with background and layout
  return (
    <ImageBackground
      source={require("../images/CryptoGo.png")} // Background image for the welcome screen
      className="flex-1 justify-center items-center pb-6 bg-green-900" // TailwindCSS classes for styling
    >
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]} 
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View className="flex-1 items-center justify-end max-w-[85%] space-y-4">
        <Text
          className="font-bold text-8xl shadow-2xl text-white text-center tracking-wider"
          style={{
            fontSize: wp(13), // Responsive font size using width percentage
            fontFamily: "SpaceGroteskBold", // Custom font
          }}
        >
          CryptoGo 
        </Text>
        <Text
          className="font-bold text-white text-center max-w-[85%] leading-12 tracking-wider"
          style={{
            fontSize: wp(5), // Smaller font size for the subtitle
            fontFamily: "SpaceGroteskMedium", // Medium weight custom font
          }}
        >
          Track prices, get insights, read the latest news – all in one app.
        </Text>
      </View>

      <TouchableOpacity
      className="bg-white rounded-full p-4 justify-center items-center w-[90%] mt-8"
      onPress={() => navigation.navigate("HomeTabs")}
>
    <Text className="text-2xl text-green-900">Enter</Text>
    </TouchableOpacity>

    </ImageBackground>
  );
}
