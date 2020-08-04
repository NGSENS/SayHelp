import auth from '@react-native-firebase/auth';
import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';
import {showMessage} from 'react-native-flash-message';
import Geolocation from '@react-native-community/geolocation';
import {Colors} from '../styles';
import * as RootNavigation from './navigation';
import * as screenNames from '../navigation/screen_names';
import {getUser, getUserEmail} from './user';
import {
  createEmergency,
  createTargetedEmergency,
  setCaregiver,
  setConversationKey,
} from './emergency';
import {inRadius} from './geolocation';

import PushNotificationIOS from '@react-native-community/push-notification-ios';
const PushNotification = require('react-native-push-notification');

const initializeNotificationManager = () => {
  // Check if permissions are granted
  // TODO Better handle this
  const authStatus = messaging().requestPermission();

  // Add foreground handler that displays a modal
  addForegroundHandler();

  // Add background handler that displays a local notification
  addBackgroundHandler();

  // Subscribe to default firebase topic
  subscribeToQuickAlertTopic();
  subscribeToTargetedAlertTopic();

  // Configure PushNotification for local notification
  PushNotification.configure({
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    requestPermissions: true,
  });
};

const addForegroundHandler = () => {
  messaging().onMessage(async remoteMessage => {
    if (getUserEmail() === remoteMessage.data.sender) {
      return;
    }
    console.log('A new notification has come in (in foreground)');

    if (remoteMessage.data.type && remoteMessage.data.type === 'chat') {
      // Handle chat notification
      handleChatNotification(remoteMessage);
      return;
    }

    // Check the location of the victim and caregiver
    inRadius(remoteMessage.data.latitude, remoteMessage.data.longitude)
      .then(theUserIsClose => {
        if (theUserIsClose) {
          getUser(remoteMessage.data.sender).then(user => {
            const victim = user.firstname ? user.firstname : user.email;

            // Render a react component to show a kind of notification
            showMessage({
              message: 'New quick emergency',
              description: `${victim} is in a bad situation and you are close to him. Please contact him for help.`,
              type: 'danger',
              autoHide: false,
              icon: 'warning',
              style: {
                paddingTop: 30,
                borderBottomWidth: 4,
                borderColor: Colors.WHITE,
              },
              onPress: () => {
                console.log('TOFIX : I press on the internal notification');
                // TODO MAKE THESE STEPS IN CHAT SCREEN
                // TODO IT SHOULD BE PROMISE AND ONLY NAVIGATE WHEN FINISH
                setCaregiver(remoteMessage.data.emergency);
                setConversationKey(remoteMessage.data.emergency);
                RootNavigation.navigate(screenNames.CHAT, {
                  quickPanel: true,
                  emergency: remoteMessage.data.emergency,
                });
              },
            });
          });
        } else {
          console.log('The caregiver is too far away from the victim.');
        }
      })
      .catch(error => {
        console.log(
          'Error computing the distance between two points. Error: ',
          error,
        );
      });
  });
};

const addBackgroundHandler = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('A new message has come in (in background)');

    // TODO Handle chat notification received on background

    inRadius(remoteMessage.data.latitude, remoteMessage.data.longitude)
      .then(theUserIsClose => {
        if (theUserIsClose) {
          sendLocalNotification(remoteMessage);
          RootNavigation.navigate(screenNames.CHAT, {
            quickPanel: true,
            emergency: remoteMessage.data.emergency,
          });
        } else {
          console.log('The caregiver is too far away from the victim.');
        }
      })
      .catch(error => {
        console.log(
          'Error computing the distance between two points. Error: ',
          error,
        );
      });
  });
};

const sendLocalNotification = remoteMessage => {
  const data = remoteMessage.data;

  if (data.type === 'emergency') {
    getUser(data.sender).then(user => {
      const victim = user.firstname ? user.firstname : user.email;

      PushNotification.localNotification({
        title: 'New quick emergency 🆘',
        message: `${victim} is in a bad situation and you are close to him. Please contact him for help.`,
      });
    });
  } else {
    PushNotification.localNotification({
      title: 'This is the title of the local notification',
      message: 'This is the content of the local notification',
    });
  }
};

const subscribeToQuickAlertTopic = () => {
  messaging()
    .subscribeToTopic('quick-alert')
    .then(() => console.log('Successfully subscribed to topic: quick-alert'))
    .catch(error => console.log(`Error subscribing to topic: ${error}`));
};

const subscribeToTargetedAlertTopic = () => {
  messaging()
    .subscribeToTopic('targeted-alert')
    .then(() => console.log('Successfully subscribed to topic: targeted-alert'))
    .catch(error => console.log(`Error subscribing to topic: ${error}`));
};

const sendQuickAlert = () => {
  //functions().useFunctionsEmulator('http://localhost:5000');

  // Get the current user email
  const user = auth().currentUser.email;

  // Get the current time
  const createdAt = +new Date();

  // Create the emergency
  const emergencyKey = createEmergency(user, createdAt);

  // Get the current position
  Geolocation.getCurrentPosition(
    info => {
      const httpsCallable = functions().httpsCallable('quickAlert');
      const {latitude, longitude} = info.coords;
      httpsCallable({
        emergency: emergencyKey,
        sender: getUserEmail(),
        latitude,
        longitude,
      })
        .then(result => console.log(result.data))
        .catch(error => {
          console.log(
            `An error occurred with the quickAlert cloud function. ${error}`,
          );
        });
    },
    error => {
      console.log('Error getting the current position. Error: ', error);
    },
    {enableHighAccuracy: true},
  );
};

const sendTargetedAlert = (emergencyField, emergencyDescription) => {
  //functions().useFunctionsEmulator('http://localhost:5000');

  // Get the current user email
  const user = auth().currentUser.email;

  // Get the current time
  const createdAt = +new Date();

  // Create the emergency
  const emergencyKey = createTargetedEmergency(
    user,
    createdAt,
    'targeted',
    emergencyField,
    emergencyDescription,
  );

  // Get the current position
  Geolocation.getCurrentPosition(
    info => {
      const httpsCallable = functions().httpsCallable('targetedAlert');
      const {latitude, longitude} = info.coords;
      httpsCallable({
        emergency: emergencyKey,
        sender: getUserEmail(),
        latitude,
        longitude,
        emergencyField,
        emergencyDescription,
      })
        .then(result => console.log(result.data))
        .catch(error => {
          console.log(
            `An error occurred with the targetedAlert cloud function. ${error}`,
          );
        });
    },
    error => {
      console.log('Error getting the current position. Error: ', error);
    },
    {enableHighAccuracy: true},
  );
};

const sendNotificationToTopic = (sender, text, topic, emergency) => {
  //functions().useFunctionsEmulator('http://localhost:5000');

  const httpsCallable = functions().httpsCallable('sendNotificationToTopic');
  httpsCallable({sender, text, topic, emergency})
    .then(result => console.log(result.data))
    .catch(error => {
      console.log(
        `An error occurred when sending a notification to the topic ${topic}. Error: ${error}`,
      );
    });
};

const generateTopic = () => {
  messaging()
    .subscribeToTopic(getTopicFromEmail(getUserEmail()))
    .then(() =>
      console.log(
        `Successfully subscribed to topic: ${getTopicFromEmail(
          getUserEmail(),
        )}`,
      ),
    )
    .catch(error => console.log(`Error subscribing to topic: ${error}`));
};

const getTopicFromEmail = email => {
  return email.replace(/@/g, '-');
};

const handleChatNotification = message => {
  if (RootNavigation.getRouteName() === screenNames.CONVERSATION) {
    return null;
  } else if (RootNavigation.getRouteName() === screenNames.LOADER) {
    RootNavigation.navigate(screenNames.CHAT);
    RootNavigation.navigate(screenNames.CONVERSATION, {
      emergency: message.data.emergency,
    });
  } else {
    // TODO Display an internal notification
  }
};

export {
  initializeNotificationManager,
  subscribeToQuickAlertTopic,
  subscribeToTargetedAlertTopic,
  sendQuickAlert,
  sendTargetedAlert,
  sendNotificationToTopic,
  generateTopic,
  getTopicFromEmail,
};
