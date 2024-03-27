import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleNavigateToCrypto = () => {
    navigation.navigate('Crypto');
  };

  return (
    <Text>
        Home screen will be here soon...
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
