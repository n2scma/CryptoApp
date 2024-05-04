// Import necessary React and React Native components
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { ChevronLeftIcon, ShareIcon } from "react-native-heroicons/outline";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Retrieve device window dimensions
const { height, width } = Dimensions.get("window");

// Define the NewsDetails functional component to display detailed news articles
export default function NewsDetails() {
  const navigation = useNavigation(); // Hook to navigate between screens
  const { params: item } = useRoute(); // Extract navigation params to access article details
  const [visible, setVisible] = useState(false); // State to control visibility of the activity indicator
  const [isBookmarked, toggleBookmark] = useState(false); // State to track bookmark status of the article

  // Function to toggle the bookmark status and update storage accordingly
  const toggleBookmarkAndSave = async () => {
    try {
      // Retrieve saved articles from local storage
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

      // Check if the article is already bookmarked
      const isArticleBookmarked = savedArticlesArray.some(
        savedArticle => savedArticle.url === item.url
      );

      if (!isArticleBookmarked) {
        // If not bookmarked, add to the list and update the state
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        toggleBookmark(true);
      } else {
        // If bookmarked, remove from the list and update the state
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          savedArticle => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        toggleBookmark(false);
      }
    } catch (error) {
      console.error("Error saving or removing article from bookmarks", error);
    }
  };

  // Effect to check bookmark status on component mount
  useEffect(() => {
    const loadSavedArticles = async () => {
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      const savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

      // Determine bookmark status for the current article
      const isArticleBookmarked = savedArticlesArray.some(
        savedArticle => savedArticle.url === item.url
      );

      toggleBookmark(isArticleBookmarked);
    };

    loadSavedArticles();
  }, [item.url]);

  return (
    <>
      {/* Top navigation bar with back and share/bookmark actions */}
      <View className="w-full flex-row justify-between items-center px-4 pt-10 pb-4 bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="bg-gray-100 p-2 rounded-full items-center justify-center">
          <ChevronLeftIcon size={25} strokeWidth={3} color="gray" />
        </TouchableOpacity>

        <View className="space-x-3 flex-row items-center justify-center">
          <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
            <ShareIcon size={25} color="gray" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleBookmarkAndSave} className="bg-gray-100 p-2 rounded-full">
            <BookmarkSquareIcon size={25} color={isBookmarked ? "green" : "gray"} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* WebView to render the news article */}
      <WebView
        source={{ uri: item.url }}
        onLoadStart={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
      />

      {/* Display a spinner while the WebView is loading */}
      {visible && (
        <ActivityIndicator
          size="large"
          color="green"
          style={{ position: "absolute", top: height / 2 - 10, left: width / 2 - 10 }}
        />
      )}
    </>
  );
}
