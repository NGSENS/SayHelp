import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import KeyboardAvoidingAndDismissingView from '../../../components/keyboard';
import UserInput from '../../../components/userinput';
import ButtonSubmit from '../../../components/buttonsubmit';
import {faUnlockAlt, faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons';
import {isValidEmail} from '../../../utils/input';
import styles from './styles';
import logo from '../../../assets/images/logo-rounded.png';
import * as screenNames from '../../../navigation/screen_names';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const checkInputs = () => {
    // Check user inputs
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!isValidEmail(email)) {
      setError('Invalid email');
      return false;
    } else if (!password) {
      setError('Password is required');
      return false;
    } else if (password.trim() && password.length < 6) {
      setError('Password too weak, minimum 6 chars');
      return false;
    }
    setError('');
    return true;
  };

  const onSignIn = () => {
    return new Promise((resolve, reject) => {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          console.log('Correctly signed in');
          resolve();
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            console.log('This account does not exist');

            setTimeout(() => {
              setError('This account does not exist');
            }, 2300);
          } else if (error.code === 'auth/wrong-password') {
            console.log('The email or password is incorrect');

            setTimeout(() => {
              setError('The email or password is incorrect');
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
        icon={faUnlockAlt}
        placeholder="Password"
        autoCorrect={false}
        secureTextEntry={true}
        onChangeText={text => {
          setPassword(text);
        }}
      />
      {error ? (
        <View>
          <Text style={styles.errorMsg}>{error}</Text>
        </View>
      ) : null}
      <View style={{marginTop: 20}}>
        <ButtonSubmit
          name="LOGIN"
          navigation={navigation}
          onSubmit={onSignIn}
          canSubmit={checkInputs}
        />
      </View>
      <View style={{flexDirection: 'row', zIndex: -1}}>
        <Text style={styles.infoMsg}>You don't have an account yet ?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(screenNames.REGISTER)}>
          <Text style={styles.linkButton}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 60}} />
    </KeyboardAvoidingAndDismissingView>
  );
};

export default Login;
