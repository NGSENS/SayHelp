import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const getUserUid = () => {
  const user = auth().currentUser;
  return user ? user.uid : null;
};

export const getUserEmail = () => {
  const user = auth().currentUser;
  return user ? user.email : null;
};

export const getUserProfilePictureURL = async (
  user: String = getUserEmail(),
) => {
  const uid = 'Profile';
  const imageRef = storage()
    .ref(uid)
    .child(user);
  return await imageRef.getDownloadURL();
};

export const getUser = async (email: string = getUserEmail()) => {
  if (email) {
    const user = await firestore()
      .collection('Users')
      .doc(email)
      .get();

    const payload = {
      email: user._data.email,
      username: user._data.username,
      lastname: '',
      firstname: '',
      phoneNumber: '',
      emergencyNumber: '',
    };

    if (user._data.lastname) {
      payload.lastname = user._data.lastname;
    }

    if (user._data.firstname) {
      payload.firstname = user._data.firstname;
    }

    if (user._data.phoneNumber) {
      payload.phoneNumber = user._data.phoneNumber;
    }

    if (user._data.emergencyNumber) {
      payload.emergencyNumber = user._data.emergencyNumber;
    }

    return payload;
  } else {
    console.log('Cannot get the user because none of them are connected');
    return null;
  }
};

export const updateUser = updatedUser => {
  firestore()
    .collection('Users')
    .doc(updatedUser.email)
    .update({
      username: updatedUser.username,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      phoneNumber: updatedUser.phoneNumber,
      emergencyNumber: updatedUser.emergencyNumber,
    })
    .then(() => console.log('User updated!'))
    .catch(error => console.log(error));
};

export const getVictimPhoneNumber = async victimEmail => {
  const victim = await firestore()
    .collection('Users')
    .doc(victimEmail)
    .get();

  return victim._data.phoneNumber ? victim._data.phoneNumber : null;
};

export const getUserChatRooms = async () => {
  const user = await firestore()
    .collection('Users')
    .doc(getUserEmail())
    .get();

  return user._data.chatRooms;
};

export const getUserCaresFields = async () => {
  const user = await firestore()
    .collection('Users')
    .doc(getUserEmail())
    .get();

  return user._data.caresFields;
};

export const setUserCaresFields = async caresFields => {
  return await firestore()
    .collection('Users')
    .doc(getUserEmail())
    .update({caresFields});
};

export const getAllCaresFields = async () => {
  const fields = await firestore()
    .collection('Fields')
    .get();

  const payload = {};
  fields.docs.map(field => {
    payload[field.id] = {
      title: field.data().title,
      isSelected: false,
    };
  });

  return payload;
};
