// Import React and hooks
import React, { useCallback, useState } from "react";

// Import components from React Native
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// Import navigation hook
import { useNavigation } from "@react-navigation/native";

// Import utilities
import { debounce } from "lodash";  // For debouncing the search input
import { fetchSearchNews } from "../utils/NewsApi";  // API call for searching news
import { heightPercentageToDP as hp } from "react-native-responsive-screen";  // Responsive height utility

// Import custom components
import NewsSection from "../components/NewsSection/NewsSection";
import { XMarkIcon } from "react-native-heroicons/outline";

export default function SearchScreen() {
  const navigation = useNavigation(); // Hook to access navigation features

  // State hooks for managing the search functionality
  const [loading, setLoading] = useState(false);  // Track loading state
  const [results, setResults] = useState([]);  // Store search results
  const [searchTerm, setSearchTerm] = useState("");  // Current search term

  // Function to handle search logic
  const handleSearch = async (search) => {
    if (search && search.length > 2) {
      setLoading(true);
      setResults([]);
      setSearchTerm(search);

      try {
        const data = await fetchSearchNews(search);
        setLoading(false);
        if (data && data.articles) {
          setResults(data.articles);  // Update state with fetched results
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    }
  };

  // Debounce function to limit the rate of API calls during typing
  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      {/* Search input section */}
      <View className="mx-4 mb-3 mt-12 flex-row p-2 justify-between items-center bg-neutral-100 rounded-lg">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Explore Blockchain news"
          placeholderTextColor="gray"
          className="font-medium text-black tracking-wider p-3 py-1 w-[90%]"
        />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <XMarkIcon size="25" color="green" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      {/* Search results display section */}
      <View className="mx-4 mb-4">
        <Text
          className="text-xl dark:text-white"
          style={{
            fontFamily: "SpaceGroteskBold",
          }}
        >
          {results.length} Results for {searchTerm}
        </Text>
      </View>

      {/* Scrollable view to display results */}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: hp(5),
        }}
      >
        <NewsSection newsProps={results} label="Search Results" />
      </ScrollView>
    </View>
  );
}
