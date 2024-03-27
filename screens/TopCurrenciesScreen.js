import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';

const TopCryptocurrenciesScreen = ({ navigation }) => {
  const [topCryptocurrencies, setTopCryptocurrencies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });
        setTopCryptocurrencies(response.data);
      } catch (error) {
        console.error('Error fetching top cryptocurrencies: ', error);
      }
    };

    fetchData();
  }, []);

  const handleCryptocurrencyPress = async (cryptocurrency) => {
    try {
      const historicalData = await fetchHistoricalData(cryptocurrency.id);
      navigation.navigate('HistoricalData', { cryptocurrency, historicalData });
    } catch (error) {
      console.error('Error fetching historical data: ', error);
    }
  };
  

  const renderCryptocurrencyItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleCryptocurrencyPress(item)}>
      <View style={styles.cryptocurrencyItem}>
        <Text>{item.name}</Text>
        <Text>{item.symbol.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={topCryptocurrencies}
        renderItem={renderCryptocurrencyItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  cryptocurrencyItem: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
});

export default TopCryptocurrenciesScreen;
