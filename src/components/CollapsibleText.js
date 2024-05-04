// Import necessary React hooks
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

// Define the CollapsibleText component that allows text content to be expandable/collapsible
const CollapsibleText = ({ text, numberOfLines = 6 }) => {
  // State to manage whether the text is expanded or not
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View className="mt-4 p-4 bg-white dark:bg-neutral-800 rounded-lg">
      {/* Title for the collapsible section */}
      <Text className="text-lg font-bold dark:text-white">Description:</Text>
      {/* Text element that can be expanded or collapsed */}
      <Text
        numberOfLines={isExpanded ? undefined : numberOfLines} // Show all lines if expanded; limit lines if not
        className="text-base dark:text-gray-300"
      >
        {text} // Display the text passed through the 'text' prop
      </Text>
      {/* Button to toggle the expanded state */}
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text className="text-green-800 mt-2">
          {isExpanded ? 'Hide' : 'Read more'} 
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CollapsibleText;
