// Import necessary React hooks and components
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/outline';

// Define the HeaderBar component which provides a navigational header for screens
const HeaderBar = ({ right }) => {
    // Hook to access navigation functionality for navigating between screens
    const navigation = useNavigation();

    return (
        <View className="flex-row justify-between items-center px-4 pb-2 h-24">
            {/* Back button with an arrow icon and text */}
            <TouchableOpacity
                className="flex-row items-center"
                onPress={() => navigation.goBack()} // Navigate to the previous screen in the stack
            >
                <ArrowLeftIcon size={25} color="rgba(75, 85, 99, 1)" className="text-gray-600"/>
                <Text className="ml-2 text-xl font-bold text-green-800 dark:text-white">Back</Text>
            </TouchableOpacity>

            {/* Conditionally render the right side component if 'right' prop is true */}
            {right &&
               <View className="flex-1 items-end">
                    <TouchableOpacity>
                        {/* Optional icon displayed based on 'right' prop, typically for additional actions */}
                        <StarIcon size={25} color="yellow" /> 
                    </TouchableOpacity>
                </View>
            }
        </View>
    );
};

export default HeaderBar;

