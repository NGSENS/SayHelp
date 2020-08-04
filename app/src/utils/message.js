import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {
  getUserEmail,
  getUserUid,
  getUserChatRooms,
  getUserProfilePictureURL,
} from './user';
import {sendNotificationToTopic, getTopicFromEmail} from './notification';
import {getVictim, getConversationKey} from './emergency';

const generateChatRoom = (conversationKey, user1, user2, emergency) => {
  const arrayUnion = firestore.FieldValue.arrayUnion;

  // Add metadata (users) for the chat room
  database()
    .ref(`${conversationKey}/metadata`)
    .set({user1, user2, emergency})
    .then(() => console.log('Metadata for the chat room set successfully'))
    .catch(error =>
      console.log('Error setting metadata for the chat room. Error: ', error),
    );

  // Add chat room to the user 1
  firestore()
    .collection('Users')
    .doc(user1)
    .update({
      chatRooms: arrayUnion(conversationKey),
    })
    .then(() => console.log('Chat room set for user 1 successfully'))
    .catch(error =>
      console.log('Error for setting chat room for user 1. Error: ', error),
    );

  // Add chat room to the user 2
  firestore()
    .collection('Users')
    .doc(user2)
    .update({
      chatRooms: arrayUnion(conversationKey),
    })
    .then(() => console.log('Chat room set for user 2 successfully'))
    .catch(error =>
      console.log('Error for setting chat room for user 2. Error: ', error),
    );
};

const sendMessage = (messages, emergency) => {
  getConversationKey(emergency)
    .then(conversationKey => {
      messages.forEach(item => {
        // Store message in the firebase database
        database()
          .ref(conversationKey)
          .push({
            text: item.text,
            timestamp: database.ServerValue.TIMESTAMP,
            location: item.location,
            user: item.user,
          })
          .then(() => {
            console.log('Message stored in the realtime database.');
          })
          .catch(error =>
            console.log(
              'Error saving message in the realtime database. Error: ',
              error,
            ),
          );

        // Send notification
        getVictim(emergency).then(victim => {
          sendNotificationToTopic(
            getUserEmail(),
            item.text,
            getTopicFromEmail(victim),
            emergency,
          );
        });
      });
    })
    .catch(error =>
      console.log(
        'Error getting the emergency conversation key. Error:',
        error,
      ),
    );
};

const parse = message => {
  const {user, text, timestamp} = message.val();
  const {key: _id} = message;
  const createdAt = new Date(timestamp);

  const payload = {
    _id,
    createdAt,
    text,
    user,
  };

  if (message.val().location) {
    payload.location = message.val().location;
  }

  return payload;
};

const getMessages = (emergency, callback) => {
  getConversationKey(emergency)
    .then(conversationKey => {
      return database()
        .ref(conversationKey)
        .on('child_added', snapshot => callback(parse(snapshot)));
    })
    .catch(error =>
      console.log('Error getting the conversation key. Error: ', error),
    );
};

const getUid = () => {
  return getUserUid();
};

const snapshotOff = emergency => {
  getConversationKey(emergency).then(conversationKey => {
    database()
      .ref(conversationKey)
      .off();
  });
};

const getKeyFromEmails = (victim, caregiver) => {
  const victimKey = victim.replace(/\./g, '-');
  const caregiverKey = caregiver.replace(/\./g, '-');

  // Check if inverted key exists
  return new Promise((resolve, reject) => {
    database()
      .ref(`chatRooms/${caregiverKey}_${victimKey}`)
      .once('value', snapshot => {
        return snapshot.exists()
          ? resolve(`chatRooms/${caregiverKey}_${victimKey}`)
          : resolve(`chatRooms/${victimKey}_${caregiverKey}`);
      })
      .catch(error => reject(error));
  });
};

const getChatRooms = () => {
  const chatRooms = [];

  return new Promise((resolve, reject) => {
    // Get user chat rooms
    getUserChatRooms()
      .then(rooms => {
        // for each room, get title and last message
        if (rooms) {
          rooms.forEach(room => {
            database()
              .ref(room)
              .child('metadata')
              .on('value', snapshot => {
                // Get title of the chat room (corresponds to the receiver email)
                const metadata = snapshot.val();
                const title =
                  metadata.user1 === getUserEmail()
                    ? metadata.user2
                    : metadata.user1;
                const emergency = metadata.emergency;
                const payload = {title, emergency};

                // Get last message of the chat room
                database()
                  .ref(room)
                  .child('messages')
                  .orderByChild('timestamp')
                  .limitToLast(1)
                  .on('value', snapshot => {
                    if (snapshot.val()) {
                      const key = Object.keys(snapshot.val())[0];
                      const message = snapshot.val()[key].text;
                      payload.lastMessage =
                        message.length > 65
                          ? message.substring(0, 65) + '...'
                          : message;
                    }

                    // Get user profile pic
                    getUserProfilePictureURL(title)
                      .then(image => {
                        payload.image = image;
                        chatRooms.push(payload);
                        resolve(chatRooms);
                      })
                      .catch(() => {
                        //payload.image = default_user;
                        chatRooms.push(payload);
                        resolve(chatRooms);
                      });
                  });
              });
          });
        } else {
          resolve(chatRooms);
        }
      })
      .catch(error => {
        console.log('Error getting user chat rooms. Error: ', error);
        reject(error);
      });
  });
};

export {
  generateChatRoom,
  sendMessage,
  parse,
  getMessages,
  getUid,
  snapshotOff,
  getKeyFromEmails,
  getChatRooms,
};
