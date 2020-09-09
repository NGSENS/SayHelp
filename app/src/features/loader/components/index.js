import React, {useEffect, useState} from 'react';
import {View, Text, Linking, TouchableOpacity} from 'react-native';
import {Icon} from 'galio-framework';
import {Header} from 'react-native-elements';
import LottieView from 'lottie-react-native';
import loader from '../../../assets/loaders/lottie-loader.json';
import styles from './styles';
import {getUser} from '../../../utils/user';
import {Colors} from '../../../styles';

const Loader = props => {
  const [remainingTime, setRemainingTime] = useState(60);
  const [showCancelButton, setShowCancelButton] = useState(false);

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
  }, [props.route.params]);

  useEffect(() => {
    // Start the counter
    let interval = setInterval(() => {
      setRemainingTime(currentTime => currentTime - 1);
    }, 1000);

    if (remainingTime <= 0) {
      clearInterval(interval);

      // Show cancel button
      setShowCancelButton(true);
    }

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime, showCancelButton]);

  let component;
  if (showCancelButton) {
    component = (
      <View style={styles.cancelButtonContainer}>
        <TouchableOpacity
          style={[styles.cancelButton]}
          onPress={() => props.navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    component = (
      <View style={styles.remainingTimeContainer}>
        <Icon
          name="stopwatch"
          family="font-awesome-5"
          color={Colors.GRAY_MS}
          size={25}
          style={{paddingRight: 5}}
        />
        <Text style={styles.remainingTime}>{remainingTime}</Text>
      </View>
    );
  }

  return (
    <View>
      <Header
        containerStyle={styles.header}
        barStyle={'light-content'}
        centerComponent={{text: 'SayHelp !', style: styles.headerTitle}}
      />
      <View style={styles.container}>
        <Text style={styles.title}>We are looking for a caregiver...</Text>
        {component}
        <LottieView source={loader} autoPlay style={styles.loader} />
      </View>
    </View>
  );
};

export default Loader;
