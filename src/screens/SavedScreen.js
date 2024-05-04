// Imports necessary React components and hooks, and external libraries and components for UI and storage handling
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

// Defines the SavedScreen functional component
export default function SavedScreen() {
  // State and context hooks for managing theme, navigation, and local storage data
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const navigation = useNavigation();
  const [savedArticles, setSavedArticles] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);
  const [urlList, setUrlList] = useState([]);

  // Handles navigation to article details
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  // Updates URL list state when saved articles change
  useEffect(() => {
    const urls = savedArticles.map((item) => item.url);
    setUrlList(urls);
  }, [savedArticles]);

  // Converts ISO date strings to readable format
  function formatDate(isoDate) {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, options);
  }

  // Toggles bookmark status and updates AsyncStorage accordingly
  const toggleBookmarkAndSave = async (item, index) => {
    try {
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];

      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      );

      if (!isArticleBookmarked) {
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
      } else {
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
      }
    } catch (error) {
      console.error("Error Saving/Removing Article", error);
    }
  };

  // Loads saved articles from AsyncStorage when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () => {
        try {
          const savedArticles = await AsyncStorage.getItem("savedArticles");
          const savedArticlesArray = savedArticles
            ? JSON.parse(savedArticles)
            : [];
          setSavedArticles(savedArticlesArray);
        } catch (error) {
          console.error("Error loading saved articles", error);
        }
      };

      loadSavedArticles();
    }, [navigation, urlList])
  );

  // Clears all saved articles from local storage
  const clearSavedArticles = async () => {
    try {
      await AsyncStorage.removeItem("savedArticles");
      setSavedArticles([]);
      console.log("Clear all saved articles");
    } catch (error) {
      console.error("Error clearing saved articles", error);
    }
  };

  // Renders each item in the list of saved articles
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        className="mb-4 space-y-1"
        key={index}
        onPress={() => handleClick(item)}
      >
        <View className="flex-row justify-start w-[100%] shadow-sm">
          <View className="items-start justify-start w-[20%]">
            <Image
              source={{ uri: item.urlToImage || "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
              style={{ width: hp(9), height: hp(10) }}
              resizeMode="cover"
              className="rounded-lg"
            />
          </View>
          <View className="w-[70%] pl-4 justify-center space-y-1">
            <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">{item.author}</Text>
            <Text className="text-neutral-800 capitalize max-w-[90%] dark:text-white" style={{ fontSize: hp(1.7), fontFamily: "SpaceGroteskBold" }}>
              {item.title.length > 50 ? item.title.slice(0, 50) + "..." : item.title}
            </Text>
            <Text className="text-xs text-gray-700 dark:text-neutral-300">{formatDate(item.publishedAt)}</Text>
          </View>
          <View className="w-[10%] justify-center">
            <TouchableOpacity onPress={() => toggleBookmarkAndSave(item, index)}>
              <BookmarkSquareIcon color="green" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Main component layout including the header, articles list, and bookmark toggle
  return (
    <SafeAreaView className="p-4 bg-white flex-1 dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
      <View className="flex-row justify-between items-center">
        <Text className="font-bold text-xl text-green-800 dark:text-white" style={{ fontFamily: "SpaceGroteskBold" }}>Saved Articles</Text>
        <TouchableOpacity onPress={clearSavedArticles} className="bg-green-800 py-1 px-4 rounded-lg">
          <Text className="font-bold text-lg text-white dark:text-white" style={{ fontFamily: "SpaceGroteskBold" }}>Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: hp(2) }} className="space-y-2">
        <FlatList
          data={savedArticles}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: hp(2) }}
        />
      </View>
    </SafeAreaView>
  );
}
