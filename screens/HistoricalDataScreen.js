import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import moment from 'moment'; // Import moment.js for date formatting

const HistoricalDataScreen = ({ route }) => {
  const { crypto } = route.params;
  const [historicalData, setHistoricalData] = useState([]); // Add historicalData state variable

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart?vs_currency=usd&days=30`);
        // Filter the historical data to include only the past 30 days
        const filteredData = response.data.prices.slice(-30);
        setHistoricalData(filteredData);
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData();
  }, [crypto]);

  return (
    <View style={styles.container}>
      <Text>{crypto.name} Historical Data (Past 30 Days)</Text>
      <View style={styles.chartContainer}>
        {historicalData.map((dataPoint, index) => (
          <Text key={index}>{moment(dataPoint[0]).format('MMMM Do YYYY, h:mm:ss a')}: ${dataPoint[1]}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  chartContainer: {
    marginTop: 10,
  },
});

export default HistoricalDataScreen;
