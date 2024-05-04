// Import necessary React components and hooks
import React from "react";
import { Switch, Text, TouchableOpacity, View, Image } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "nativewind"; // For theme management (dark/light mode)

// Define the Header component which displays at the top of the screen
export default function Header() {
  // Navigation hook to handle screen transitions
  const navigation = useNavigation();
  // Hook to access and toggle between light and dark color schemes
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-row justify-between items-center mx-4 mt-4">
      {/* Logo and App Name Section */}
      <View className="flex-row items-center">
        {/* Image component to display the app logo */}
        <Image
          source={require("../../images/HeaderLogo.png")} // Path to the logo image
          style={{ width: 60, height: 60, margin: 1 }} // Style of the logo image
        />
        {/* Application name styled according to the current theme */}
        <Text
          className="font-spaceGroteskBold text-xl text-green-800 dark:text-white font-extrabold"
          style={{
            fontFamily: "SpaceGroteskBold", // Custom font for the app name
          }}
        >
          CryptoGo
        </Text>
      </View>

      {/* Switch and Search Icon Section */}
      <View className="flex-row space-x-4 rounded-full justify-center items-center">
        {/* Toggle switch for changing theme between dark and light mode */}
        <Switch
          value={colorScheme === "dark"}
          onChange={toggleColorScheme}
        />
        {/* Touchable icon for navigating to the search page */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          className="bg-gray-200 dark:bg-green-800 rounded-full p-2"
        >
          <MagnifyingGlassIcon
            size={25}
            strokeWidth={2}
            color={colorScheme === "dark" ? "white" : "green"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
