// CryptoScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const CryptoScreen = ({ navigation }) => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        setCryptos(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCryptos();
  }, []);

  const handleCryptoPress = (crypto) => {
    navigation.navigate('HistoricalData', { crypto });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.cryptoContainer} onPress={() => handleCryptoPress(item)}>
      <Text>{item.name}</Text>
      <Text>${item.current_price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cryptos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  cryptoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default CryptoScreen;
