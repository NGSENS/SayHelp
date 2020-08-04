import React from 'react';
import {StatusBar, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const MyStatusBar = props => {
  return (
    <View style={[styles.statusBar, {backgroundColor: props.backgroundColor}]}>
      <StatusBar
        translucent
        backgroundColor={props.backgroundColor}
        {...props}
      />
    </View>
  );
};

MyStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};

export default MyStatusBar;
