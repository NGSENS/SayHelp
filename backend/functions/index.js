const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./key/sayhelp-68a40-firebase-adminsdk-gxvvf-f5e8798106.json');
const { service } = require('firebase-functions/lib/providers/analytics');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sayhelp-68a40.firebaseio.com/",
});

exports.quickAlert = functions.https.onCall((data, context) => {
  console.log('Sending notification to the quick-alert topic');
  console.log(`The sender of the notification is ${data.sender}`);
  console.log('Latitude: ', data.latitude);
  console.log('Longitude', data.longitude);

  // Creation of the notification
  const topic = 'quick-alert';
  const message = {
    data: {
      title: "This is some dummy title",
      body: "This is some dummy data",
      emergency: data.emergency,
      sender: data.sender,
      type: 'emergency',
      latitude: data.latitude.toString(),
      longitude: data.longitude.toString(),
    },
    topic: topic
  };

  return new Promise((resolve, reject) => {
    // Send the notification
    admin.messaging().send(message)
      .then((response) => {
        console.log(`Successfully sent notification ${response}`);
        resolve(`Successfully sent notification ${response}`);
        return null;
      })
      .catch((error) => {
        console.log(`Error sending notification: ${error}`);
        reject(new Error(`Error sending notification. ${error}`));
      });
  });
});

exports.targetedAlert = functions.https.onCall((data, context) => {
  console.log('Sending notification to the targeted-alert topic');
  console.log(`The sender of the notification is ${data.sender}`);
  console.log('Latitude: ', data.latitude);
  console.log('Longitude', data.longitude);

  // Creation of the notification
  const topic = 'targeted-alert';
  const message = {
    data: {
      title: "This is some dummy title",
      body: "This is some dummy data",
      emergency: data.emergency,
      sender: data.sender,
      type: 'emergency',
      latitude: data.latitude.toString(),
      longitude: data.longitude.toString(),
      field: data.emergencyField,
      description: data.emergencyDescription,
    },
    topic: topic
  };

  console.log(message.data);

  return new Promise((resolve, reject) => {
    // Send the notification
    admin.messaging().send(message)
      .then((response) => {
        console.log(`Successfully sent notification ${response}`);
        resolve(`Successfully sent notification ${response}`);
        return null;
      })
      .catch((error) => {
        console.log(`Error sending notification: ${error}`);
        reject(new Error(`Error sending notification. ${error}`));
      });
  });
})

exports.sendNotificationToTopic = functions.https.onCall((data, context) => {
  console.log(`Sending notification to the ${data.topic} topic`);

  const message = {
    notification: {
      body: data.text,
      title: data.sender,
    },
    data: {
      type: 'chat',
      emergency: data.emergency,
    },
    topic: data.topic,
  }

  return new Promise((resolve, reject) => {
    admin.messaging().send(message)
      .then((response) => {
        console.log(`Successfully sent notification ${response}`);
        resolve(`Successfully sent notification ${response}`);
        return null;
      })
      .catch((error) => {
        console.log(`Error sending notification. ${error}`);
        reject(new Error(`Error sending notification. ${error}`));
      });
  })
})
