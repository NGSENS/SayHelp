import firestore from '@react-native-firebase/firestore';
import {getUserEmail} from './user';
import {generateChatRoom, getKeyFromEmails} from './message';

const createEmergency = (victim, createdAt, type: String = 'quick') => {
  const key = `${victim}-${createdAt}`;
  firestore()
    .collection('Emergencies')
    .doc(key)
    .set({
      victim: victim,
      caregiver: null,
      conversationKey: null,
      loading: true,
      type: type,
    })
    .then(() => {
      console.log('Emergency created successfully');
    })
    .catch(error => {
      console.log('Error creating emergency. Error:', error);
    });
  return key;
};

const createTargetedEmergency = (
  victim,
  createdAt,
  type,
  field,
  descritpion,
) => {
  const key = `${victim}-${createdAt}`;
  firestore()
    .collection('Emergencies')
    .doc(key)
    .set({
      victim: victim,
      caregiver: null,
      conversationKey: null,
      loading: true,
      type: type,
      field: field,
      descritpion: descritpion,
    })
    .then(() => {
      console.log('Emergency created successfully');
    })
    .catch(error => {
      console.log('Error creating emergency. Error:', error);
    });
  return key;
};

const setCaregiver = emergencyKey => {
  firestore()
    .collection('Emergencies')
    .doc(emergencyKey)
    .update({
      caregiver: getUserEmail(),
    })
    .then(() => console.log('Caregiver set successfully for the emergency'))
    .catch(error =>
      console.log(
        'Error setting the caregiver for the emergency. Error: ',
        error,
      ),
    );
};

const setConversationKey = emergencyKey => {
  // Set conversation key
  getVictim(emergencyKey)
    .then(victim => {
      getCaregiver(emergencyKey)
        .then(caregiver => {
          getKeyFromEmails(victim, caregiver).then(key => {
            // Generate the chat room in the realtime database
            generateChatRoom(key, victim, caregiver, emergencyKey);

            firestore()
              .collection('Emergencies')
              .doc(emergencyKey)
              .update({
                conversationKey: `${key}/messages`,
              })
              .then(() =>
                console.log(
                  'Conversation key set successfully for the emergency',
                ),
              )
              .catch(error =>
                console.log(
                  'Error setting the conversation key for the emergency. Error: ',
                  error,
                ),
              );
          });
        })
        .catch(error =>
          console.log('Error getting the emergency caregiver. Error: ', error),
        );
    })
    .catch(error =>
      console.log('Error getting the emergency victim. Error: ', error),
    );
};

const getConversationKey = async emergencyKey => {
  const emergency = await firestore()
    .collection('Emergencies')
    .doc(emergencyKey)
    .get();

  return emergency._data.conversationKey;
};

const getVictim = async emergencyKey => {
  const emergency = await firestore()
    .collection('Emergencies')
    .doc(emergencyKey)
    .get();

  return emergency._data.victim;
};

const getCaregiver = async emergencyKey => {
  const emergency = await firestore()
    .collection('Emergencies')
    .doc(emergencyKey)
    .get();

  return emergency._data.caregiver;
};

export {
  createEmergency,
  createTargetedEmergency,
  setCaregiver,
  setConversationKey,
  getConversationKey,
  getVictim,
  getCaregiver,
};
