// Import necessary React and React Native components
import { View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useQuery } from "@tanstack/react-query";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

// Import custom components and utility functions
import Loading from "../components/Loading/Loading";
import Header from "../components/Header/Header";
import MiniHeader from "../components/Header/MiniHeader";
import NewsSection from "../components/NewsSection/NewsSection";
import BreakingNews from "../components/BreakingNews";
import { fetchBreakingNews, fetchRecommendedNews } from "../utils/NewsApi";

// Define the HomeScreen component
export default function HomeScreen() {
  // Use the color scheme hook for theme management
  const { colorScheme } = useColorScheme();

  // Fetch breaking news using react-query
  const { data, isLoading: isBreakingLoading } = useQuery({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews,
  });

  // Fetch recommended news
  const { data: recommendedNew, isLoading: isRecommendedLoading } = useQuery({
    queryKey: ["recommededNews"],
    queryFn: fetchRecommendedNews,
  });

  // Main render method
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} /> 

      {/* Main container */}
      <View>
        {/* App header */}
        <Header />

        {/* Section for breaking news */}
        {isBreakingLoading ? (
          <Loading />
        ) : (
          <View className=" ">
            <MiniHeader label="Bitcoin Breaking" />
            <BreakingNews label="Bitcoin Breaking" data={data.articles} />
          </View>
        )}

        {/* Section for recommended news */}
        <View>
          <MiniHeader label="Editor's Choice" />
          <ScrollView
            contentContainerStyle={{
              paddingBottom: hp(80), // Responsive padding
            }}
          >
            {isRecommendedLoading ? (
              <Loading />
            ) : (
              <NewsSection
                label="Recommendation"
                newsProps={recommendedNew.articles}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
