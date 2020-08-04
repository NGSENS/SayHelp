import React, {useState} from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import KeyboardAvoidingAndDismissingView from '../../../components/keyboard';
import UserInput from '../../../components/userinput';
import ButtonSubmit from '../../../components/buttonsubmit';
import {
  faUser,
  faUnlockAlt,
  faEnvelopeOpen,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import {isValidEmail, isValidUsername} from '../../../utils/input';
import styles from './styles';
import logo from '../../../assets/images/logo-rounded.png';

const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const checkInputs = () => {
    // Check user inputs
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!isValidEmail(email)) {
      setError('Invalid email');
      return false;
    } else if (!username) {
      setError('Username is required');
      return false;
    } else if (!isValidUsername()) {
      setError('Invalid username');
      return false;
    } else if (!password) {
      setError('Password is required');
      return false;
    } else if (password.trim() && password.length < 6) {
      setError('Invalid password. Minimun 6 chars');
      return false;
    } else if (!(password === confirmPassword)) {
      setError("Passwords don't match");
      return false;
    }
    setError('');
    return true;
  };

  const onSignUp = () => {
    return new Promise((resolve, reject) => {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log('User account created & signed in!');

          // Store the new user in the firebase database
          firestore()
            .collection('Users')
            .doc(res.user.email)
            .set({
              email: res.user.email,
              username: username,
            })
            .then(() => {
              console.log('User stored in the cloud firestore');
            });
          resolve();
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('This email address is already in use');

            setTimeout(() => {
              setError('This email address is already in use');
            }, 2300);
          }

          if (error.code === 'auth/invalid-email') {
            console.log('This email address is invalid');

            setTimeout(() => {
              setError('This email address is invalid');
            }, 2300);
          }

          if (error.code === 'auth/weak-password') {
            console.log('Password too weak, minimum 6 chars');

            setTimeout(() => {
              setError('Password too weak, minimum 6 chars');
            }, 2300);
          }

          reject();
        });
    });
  };

  return (
    <KeyboardAvoidingAndDismissingView
      style={styles.container}
      behavior="padding">
      <Image style={styles.logo} source={logo} />
      <UserInput
        icon={faEnvelopeOpen}
        placeholder="Email"
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={text => {
          setError;
          setEmail(text);
        }}
      />
      <UserInput
        icon={faUser}
        placeholder="Username"
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={text => {
          setUsername(text);
        }}
      />
      <UserInput
        icon={faUnlockAlt}
        placeholder="Password"
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={text => {
          setPassword(text);
        }}
      />
      <UserInput
        icon={faCheckCircle}
        placeholder="Confirm password"
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={text => {
          setConfirmPassword(text);
        }}
      />
      {error ? (
        <View>
          <Text style={styles.errorMsg}>{error}</Text>
        </View>
      ) : null}
      <View style={{marginTop: 20}}>
        <ButtonSubmit
          name="REGISTER"
          navigation={navigation}
          onSubmit={onSignUp}
          canSubmit={checkInputs}
        />
      </View>
      <View style={{flexDirection: 'row', zIndex: -1}}>
        <Text style={styles.infoMsg}>You already have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.linkButton}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 60}} />
    </KeyboardAvoidingAndDismissingView>
  );
};

export default Register;
