// Import React and necessary components from React Native
import React from "react";
import { View, Text } from "react-native";

// Define the MiniHeader functional component that displays a smaller section header
export default function MiniHeader({ label }) {
  // The component accepts a 'label' prop to display as the header title
  return (
    <View className="px-4 my-4 justify-between flex-row items-center">
      {/* Display the label with styling for larger text size and theme-based color */}
      <Text
        className="text-xl text-green-800 dark:text-white" // TailwindCSS classes for text styling
        style={{
          fontFamily: "SpaceGroteskBold", // Custom font for a bold appearance
        }}
      >
        {label} {/* Render the text passed through the 'label' prop */}
      </Text>

      {/* Additional text element, currently unused but styled for context-dependent usage */}
      <Text
        className="text-base text-gray-600 dark:text-neutral-300" // Styling for a secondary text, less prominent
        style={{
          fontFamily: "SpaceGroteskMedium", // Slightly lighter font than the label
        }}
      >
        {/* Currently empty, could be used for date, status, or other info */}
      </Text>
    </View>
  );
}
