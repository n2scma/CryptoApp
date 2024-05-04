// Import necessary React components and hooks
import React from "react";
import { View, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel"; // Carousel component for creating swipeable card views
import BreakingNewsCard from "./BreakingNewsCard"; // Custom component for rendering individual news cards

// Retrieve the width of the device's screen for responsive layout
var { width } = Dimensions.get("window");

// Define the BreakingNews component that displays news articles in a carousel
export default function BreakingNews({ data, label }) {
  const navigation = useNavigation(); // Hook to handle navigation across screens

  // Function to handle click events on news cards, navigating to detailed view
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  return (
    <View>
      {/* Display a carousel of news cards */}
      <Carousel
        data={data} // Array of news items to display
        renderItem={({ item }) => (
          // Render each item using the BreakingNewsCard component
          <BreakingNewsCard item={item} handleClick={handleClick} />
        )}
        firstItem={1} // Index of the first item to display in the carousel
        inactiveSlideScale={0.86} // Scale of inactive slides in the carousel
        inactiveSlideOpacity={0.6} // Opacity of inactive slides
        sliderWidth={width} // Width of the slider to occupy the full device width
        itemWidth={width * 0.8} // Width of each item to ensure cards are partially visible on sides
        slideStyle={{ display: "flex", alignItems: "center" }} // Styling for each slide in the carousel
      />
    </View>
  );
}
