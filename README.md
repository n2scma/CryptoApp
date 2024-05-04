# Configuration
### Setting Up Your API Key
This application requires an API key to fetch data from its respective API provider. You need to replace the placeholder API key with a valid one to ensure the application functions correctly.

### Steps to Configure Your API Key:
1. Obtain an API Key: 
Visit the website of the API provider. https://newsapi.org/
Register or sign in and follow their process to obtain an API key.
2. Configure Your Application:
Open the ApiKey.js file located in the src directory of this project.
Replace the placeholder "INSERT_YOUR_API_KEY_HERE" with your actual API key.

/src/utils/ApiKey.js
```
// INSERT YOUR NEWS API KEY HERE
export const newsApiKey = "INSERT_YOUR_API_KEY_HERE";
```
3. Save and Restart Your Application:
Save the changes to the ApiKey.js file. 
Restart your application to ensure it uses the new API key.

### Running the Application
To run the application on your local machine, follow these steps:

```
# Install dependencies
npm install

# Start the application
npm start
```
