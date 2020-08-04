import React, {useEffect} from 'react';
import {View, Text, Linking} from 'react-native';
import {Header} from 'react-native-elements';
import LottieView from 'lottie-react-native';
import loader from '../../../assets/loaders/lottie-loader.json';
import styles from './styles';
import {getUser} from '../../../utils/user';

const Loader = props => {
  useEffect(() => {
    if (props.route.params && props.route.params.callEmergency) {
      getUser().then(user => {
        const number = user.emergencyNumber ? user.emergencyNumber : 144;
        Linking.openURL(`tel:${number}`)
          .then(() => console.log('Asking user to call emergency.'))
          .catch(error =>
            console.log('Error asking user to call emergency. Error: ', error),
          );
      });
    }
  });

  return (
    <View>
      <Header
        containerStyle={styles.header}
        barStyle={'light-content'}
        centerComponent={{text: 'SayHelp !', style: styles.headerTitle}}
      />
      <View style={styles.container}>
        <Text style={styles.title}>We are looking for a caregiver...</Text>
        <LottieView source={loader} autoPlay style={styles.loader} />
      </View>
    </View>
  );
};

export default Loader;
