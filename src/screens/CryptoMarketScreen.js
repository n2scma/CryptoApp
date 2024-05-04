// Imports necessary React components and hooks, external libraries, and custom components
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, SafeAreaView, StatusBar, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header/Header';
import MiniHeader from '../components/Header/MiniHeader';
import Loading from "../components/Loading/Loading";
import { useColorScheme } from 'nativewind';

// Defines the CryptoMarketScreen functional component
const CryptoMarketScreen = () => {
  // State hooks for navigation, theme color scheme, and data management
  const navigation = useNavigation();
  const { colorScheme } = useColorScheme();
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const BASE_URL = 'https://api.coingecko.com/api/v3/coins/markets';

  // Function to fetch market data from CoinGecko API or cache
  const fetchMarketData = async (forceUpdate = false) => {
    // Checks and loads data from AsyncStorage to reduce API calls
    if (!forceUpdate) {
      const cachedData = await AsyncStorage.getItem('cryptoData');
      if (cachedData) {
        setCryptoData(JSON.parse(cachedData));
        setIsLoading(false);
        return;
      }
    }
    // Fetches data from the CoinGecko API when no cache is available or if a force update is required
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 50,
          page: 1,
          sparkline: false
        }
      });
      // Updates the local state and cache with the new data
      if (response.data) {
        setCryptoData(response.data);
        await AsyncStorage.setItem('cryptoData', JSON.stringify(response.data));
      } else {
        console.log("No data received");
      }
    } catch (error) {
      console.error('Error fetching market data from CoinGecko:', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  // Effect hook to load data when the component mounts
  useEffect(() => {
    fetchMarketData();
  }, []);

  // Pull-to-refresh handler to update the cryptocurrency data
  const onRefresh = () => {
    setRefreshing(true);
    fetchMarketData(true);
  };

  // Conditional rendering for the loading state
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900 pt-8">
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Header />
        <MiniHeader label="Markets" />
        <Loading />
      </SafeAreaView>
    );
  }

  // Main component layout rendering cryptocurrency market data
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900 pt-8">
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Header />
      <MiniHeader label="Markets" />
      <ScrollView
        className="px-4"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#689F38']}
          />
        }
      >
        {cryptoData.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => {
            navigation.navigate('CryptoDetails', { cryptoId: item.id })
          }} className="flex-row items-center my-2 p-2 bg-white dark:bg-neutral-800 rounded-lg shadow">
            <View className="flex-row items-center">
              <Text className="text-sm dark:text-white mr-2">{item.market_cap_rank}</Text>
              <Image source={{ uri: item.image }} style={{ width: 30, height: 30 }} />
            </View>
            <View className="flex-1 ml-2">
              <Text className="font-bold text-lg dark:text-white">{item.name} ({item.symbol.toUpperCase()})</Text>
              <Text className="text-gray-500 dark:text-gray-400">${item.current_price.toFixed(2)}</Text>
            </View>
            <View className="mr-4 text-right">
              <Text className="text-xs text-gray-500 dark:text-gray-300">24h</Text>
              <Text className={`${item.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
                {item.price_change_percentage_24h.toFixed(2)}%
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CryptoMarketScreen;
