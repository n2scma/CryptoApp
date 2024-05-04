// Import necessary React components and hooks, React Native elements, and custom components
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, SafeAreaView } from 'react-native';
import { useColorScheme } from 'nativewind';
import HeaderBar from '../components/Header/HeaderBar';
import MiniHeader from '../components/Header/MiniHeader';
import Loading from "../components/Loading/Loading";
import CollapsibleText from '../components/CollapsibleText';

// Defines the CryptoDetailsScreen component, accepting 'route' as props for navigation parameters
const CryptoDetailsScreen = ({ route }) => {
  // Destructure the 'cryptoId' from route parameters to fetch specific cryptocurrency details
  const { cryptoId } = route.params;
  // Hook to handle system theme changes and apply corresponding styles dynamically
  const { colorScheme } = useColorScheme();
  // State hooks to manage cryptocurrency data, loading status, and error handling
  const [coin, setCoin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect hook to fetch cryptocurrency data from the CoinGecko API upon component mount
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.coingecko.com/api/v3/coins/${cryptoId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=true`;
      try {
        const response = await fetch(url);
        const json = await response.json();
        setCoin(json);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cryptoId]);

  // Function to determine the text color based on the price change (positive or negative)
  const getColorForPriceChange = (priceChange) => {
    return priceChange >= 0 ? 'text-green-500' : 'text-red-500';
  };

  // Conditional rendering to display a loading spinner while data is being fetched
  if (isLoading) {
    return <Loading />;
  }

  // Conditional rendering to display an error message if the data fetch fails
  if (error) {
    return (
      <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? 'bg-neutral-900' : 'bg-white'}`}>
        <HeaderBar />
        <Text className={`text-red-500 text-center text-lg ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  // Conditional rendering for cases where no cryptocurrency data could be found
  if (!coin) {
    return (
      <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? 'bg-neutral-900' : 'bg-white'}`}>
        <HeaderBar />
        <Text className={`text-red-500 text-center text-lg ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>Coin not found!</Text>
      </SafeAreaView>
    );
  }

  // Main component rendering for displaying detailed cryptocurrency information
  return (
    <SafeAreaView className={`flex-1 ${colorScheme === 'dark' ? 'bg-neutral-900' : 'bg-white'} pt-8`}>
      <HeaderBar />
      <MiniHeader label={`${coin.name} Details`} />
      <ScrollView className="px-5">
        <View className={`mt-6 p-4 ${colorScheme === 'dark' ? 'bg-neutral-800' : 'bg-white'} rounded-lg shadow`}>
          <Text className={`text-2xl font-bold text-center mb-4 ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>{coin.name} ({coin.symbol.toUpperCase()})</Text>
          <Image source={{ uri: coin.image.large }} className="h-40 w-40 self-center mb-4" />
          <Text className={`text-lg ${colorScheme === 'dark' ? 'text-white' : 'text-black'} mb-2`}>Current Price: <Text className="font-semibold">${coin.market_data.current_price.usd.toLocaleString()}</Text></Text>
          <Text className={`text-lg ${colorScheme === 'dark' ? 'text-white' : 'text-black'} mb-2`}>Market Cap: <Text className="font-semibold">${coin.market_data.market_cap.usd.toLocaleString()}</Text></Text>
          <Text className={`text-lg ${colorScheme === 'dark' ? 'text-white' : 'text-black'} mb-2`}>Volume (24h): <Text className="font-semibold">${coin.market_data.total_volume.usd.toLocaleString()}</Text></Text>
          <Text className={`text-lg ${colorScheme === 'dark' ? 'text-white' : 'text-black'} mb-2`}>24h High: <Text className="font-semibold">${coin.market_data.high_24h.usd.toLocaleString()}</Text></Text>
          <Text className={`text-lg ${colorScheme === 'dark' ? 'text-white' : 'text-black'} mb-2`}>24h Low: <Text className="font-semibold">${coin.market_data.low_24h.usd.toLocaleString()}</Text></Text>
          <Text className={`text-lg ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>Price Change (24h): <Text className={`${getColorForPriceChange(coin.market_data.price_change_24h_in_currency.usd)} font-semibold`}>${coin.market_data.price_change_24h_in_currency.usd.toFixed(2)}</Text></Text>
          <Text className={`text-lg ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}>Market Cap Change (24h): <Text className="font-semibold">${coin.market_data.market_cap_change_24h_in_currency.usd.toFixed(2)}</Text></Text>
        </View>
        <CollapsibleText text={coin.description.en} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CryptoDetailsScreen;
