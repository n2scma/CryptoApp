// Import necessary React components
import React from "react";
import { View, ActivityIndicator } from "react-native";

// Define the Loading component which displays a loading indicator
export default function Loading() {
  return (
    // Container view that expands to fill the available space and centers its children
    <View className="flex-1 justify-center items-center">
      {/* Activity indicator to show a spinning wheel while content is loading */}
      <ActivityIndicator 
        size="large"  // Specifies the size of the indicator to be large for better visibility
        color="green" // Sets the color of the indicator to green for a vibrant and noticeable appearance
      />
    </View>
  );
}
