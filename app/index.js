/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {typography} from './src/styles/typography';
import {initializeNotificationManager} from './src/utils/notification';

// Apply global typography
typography();

// Initialize the notification manager for SayHelp
initializeNotificationManager();

// Don't mount React component when the app is triggered by a background message
const HeadlessCheck = ({isHeadless}) => {
  if (isHeadless) {
    // App has been launched in the background by iOS
    return null;
  }
  return <App />;
};

AppRegistry.registerComponent(appName, () => HeadlessCheck);
