import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import CryptoScreen from './screens/CryptoScreen';
import HistoricalDataScreen from './screens/HistoricalDataScreen';
import NewsPage from './screens/NewsPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CryptoStackScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="CryptoScreen" component={CryptoScreen} />
    <Stack.Screen name="HistoricalDataScreen" component={HistoricalDataScreen} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'search';
            } else if (route.name === 'NewsPage') {
              iconName = 'newspaper-o';
            } 

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}  
      >
        <Tab.Screen name="Home" component={CryptoStackScreen} />
        <Tab.Screen name="Search" component={HomeScreen} />
        <Tab.Screen name="NewsPage" component={NewsPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
