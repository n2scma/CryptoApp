// Import React and necessary components from React Native
import React from "react";
import { Dimensions, TouchableWithoutFeedback, Image, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Retrieve and destruct device dimensions for responsive design
var { width, height } = Dimensions.get("window");

// Define the BreakingNewsCard functional component that displays a single news article card
export default function BreakingNewsCard({ item, handleClick }) {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      {/* Main container for the news card */}
      <View className="relative">
        {/* Display article image or a default image if none is available */}
        <Image
          source={{
            uri:
              item.urlToImage ||
              "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={{
            width: width * 0.8,
            height: height * 0.22,
          }}
          resizeMode="cover"
          className="rounded-3xl"
        />

        {/* Gradient overlay to ensure text readability on varying image backgrounds */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
          }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />

        {/* Container for title and author, positioned at the bottom of the image */}
        <View className="absolute bottom-6 left-4 justify-end h-[80%]">
          <View className="space-y-1">
            <View className="max-w-[98%]">
              {/* Conditionally truncate title if too long for clean presentation */}
              <Text className="text-white text-base font-semibold capitalize">
                {item.title.length > 60
                  ? item.title.slice(0, 58) + "..."
                  : item.title.split("-")[0] || "N/A"}
              </Text>
            </View>

            <View>
              {/* Display author's name, truncating if necessary */}
              <Text className="text-neutral-300 text-sm font-medium">
                {item?.author?.length > 20
                  ? item.author.slice(0, 20) + "..."
                  : item.author}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
