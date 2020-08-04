import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';
import hands from '../../../assets/images/hands.png';

const TabHomeButton = () => {
  return (
    <View style={styles.tabButton}>
      <Image source={hands} style={styles.tabButtonIcon} />
    </View>
  );
};

export default TabHomeButton;
