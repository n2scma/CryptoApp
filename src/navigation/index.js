// Import React and relevant hooks
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";

// Import screens used in the navigation
import HomeScreen from "../screens/HomeScreen";
import NewsDetails from "../screens/NewsDetails";
import WelcomeScreen from "../screens/WelcomeScreen";
import SavedScreen from "../screens/SavedScreen";
import SplashScreens from "../screens/SplashScreens";
import SearchScreen from "../screens/SearchScreen";
import CryptoMarketScreen from "../screens/CryptoMarketScreen";
import CryptoDetailsScreen from "../screens/CryptoDetailsScreen";

// Create stack and tab navigator instances
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Define the main navigation component
export default function AppNavigation() {
  const { colorScheme } = useColorScheme(); // Get the current color scheme (dark or light)

  // Define the tab navigator component
  const TabNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Disable headers for all screens in the tab navigator
          tabBarIcon: ({ focused }) => {
            // Define icons based on the route name and focus state
            const iconName = {
              "Home": "home",
              "Markets": "bar-chart-outline",
              "Saved": "star-outline",
              "Search": "search-outline"
            }[route.name] || "alert-circle-outline";

            const customizeSize = 25; // Icon size

            return (
              <Ionicons
                name={iconName}
                size={customizeSize}
                color={focused ? "green" : "gray"} // Color changes when tab is focused
              />
            );
          },

          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "SpaceGroteskMedium", // Custom font for the tab labels
          },
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "black" : "white", // Background color adapts to the theme
          },
        })}
      >
        {/* Define individual screens within the tab navigator */}
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Markets" component={CryptoMarketScreen} />
        <Tab.Screen name="Saved" component={SavedScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    );
  };

  // Define the stack navigator component, which includes both single screens and the tab navigator
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen" // Set the first screen to load
        screenOptions={{
          headerShown: false, // Disable headers for all screens in the stack navigator
        }}
      >
        {/* Define the navigation stack screens */}
        <Stack.Screen name="SplashScreen" component={SplashScreens} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="NewsDetails" component={NewsDetails} options={{ animation: "slide_from_bottom" }} />
        <Stack.Screen name="HomeTabs" component={TabNavigator} />
        <Stack.Screen name="CryptoDetails" component={CryptoDetailsScreen} options={{ animation: "slide_from_bottom" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
