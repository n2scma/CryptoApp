import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import CryptoScreen from './screens/CryptoScreen';
import { FontAwesome } from '@expo/vector-icons';
import HistoricalDataScreen from './screens/HistoricalDataScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
     <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = 'home';
      } else if (route.name === 'Crypto') {
        iconName = 'bitcoin';
      }
      // Add more conditions for other tabs as needed

      return <FontAwesome name={iconName} size={size} color={color} />;
       },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Crypto" component={CryptoScreen} />
      <Tab.Screen name="HistoricalData" component={HistoricalDataScreen} />
     </Tab.Navigator>
    </NavigationContainer>
      );
    }
