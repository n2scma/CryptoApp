// Import necessary libraries and components
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

// Define the NewsSection component that displays news articles
export default function NewsSection({ newsProps }) {
  const navigation = useNavigation();  // Hook for navigating between screens
  const [urlList, setUrlList] = useState([]);  // State for storing URLs of news articles
  const [bookmarkStatus, setBookmarkStatus] = useState([]);  // State for tracking bookmark status of each article

  // Function to format dates into a readable format
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

  // Effect to set the URL list from newsProps whenever it changes
  useEffect(() => {
    const urls = newsProps.map((item) => item.url);
    setUrlList(urls);
  }, [newsProps]);

  // Function to handle navigation to news details
  const handleClick = (item) => {
    navigation.navigate("NewsDetails", item);
  };

  // Function to toggle the bookmark status and save or remove the article from AsyncStorage
  const toggleBookmarkAndSave = async (item, index) => {
    try {
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];
      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      );

      if (!isArticleBookmarked) {
        savedArticlesArray.push(item);
        await AsyncStorage.setItem("savedArticles", JSON.stringify(savedArticlesArray));
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = true;
        setBookmarkStatus(updatedStatus);
      } else {
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem("savedArticles", JSON.stringify(updatedSavedArticlesArray));
        const updatedStatus = [...bookmarkStatus];
        updatedStatus[index] = false;
        setBookmarkStatus(updatedStatus);
      }
    } catch (error) {
      console.error("Error Saving/Removing Article", error);
    }
  };

  // UseFocusEffect to load bookmark status from AsyncStorage
  useFocusEffect(
    useCallback(() => {
      const loadSavedArticles = async () => {
        try {
          const savedArticles = await AsyncStorage.getItem("savedArticles");
          const savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];
          const isArticleBookmarkedList = urlList.map((url) =>
            savedArticlesArray.some((savedArticle) => savedArticle.url === url)
          );
          setBookmarkStatus(isArticleBookmarkedList);
        } catch (error) {
          console.error("Error Loading Saved Articles", error);
        }
      };

      loadSavedArticles();
    }, [navigation, urlList])
  );

  // Function to render each item in the news list
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        className="mb-4 mx-4 space-y-1"
        key={index}
        onPress={() => handleClick(item)}
      >
        <View className="flex-row justify-start w-[100%] shadow-sm">
          {/* Display the image, author, and title of the article */}
          <View className="items-start justify-start w-[20%]">
            <Image
              source={{
                uri:
                  item.urlToImage ||
                  "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              style={{ width: hp(9), height: hp(10) }}
              resizeMode="cover"
              className="rounded-lg"
            />
          </View>

          <View className="w-[70%] pl-4 justify-center space-y-1">
            <Text className="text-xs font-bold text-gray-900 dark:text-neutral-300">
              {item.author?.length > 20 ? item.author.slice(0, 20) + "..." : item.author}
            </Text>
            <Text
              className="text-neutral-800 capitalize max-w-[90%] dark:text-white"
              style={{
                fontSize: hp(1.7),
                fontFamily: "SpaceGroteskBold",
              }}
            >
              {item.title.length > 50 ? item.title.slice(0, 50) + "..." : item.title}
            </Text>
            <Text className="text-xs text-gray-700 dark:text-neutral-300">
              {formatDate(item.publishedAt)}
            </Text>
          </View>

          {/* Bookmark icon to toggle the bookmark status */}
          <View className="w-[10%] justify-center">
            <TouchableOpacity onPress={() => toggleBookmarkAndSave(item, index)}>
              <BookmarkSquareIcon color={bookmarkStatus[index] ? "green" : "gray"} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="space-y-2 bg-white dark:bg-neutral-900">
      <FlatList
        nestedScrollEnabled={true}
        scrollEnabled={false}
        data={newsProps}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
