// Import the AppNavigation component for handling navigation throughout the app
import AppNavigation from "./src/navigation";

// Import the necessary modules from @tanstack/react-query for managing server state
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create an instance of QueryClient for configuring and managing queries
// Default configuration: do not refetch data when window regains focus
const queryClient = new QueryClient();

// Define the main App component
export default function App() {
  // Render the application within the QueryClientProvider to provide a React Query context
  return (
    <QueryClientProvider client={queryClient}>
      {/* AppNavigation component is used here to enable screen navigation within the app */}
      <AppNavigation />
    </QueryClientProvider>
  );
}