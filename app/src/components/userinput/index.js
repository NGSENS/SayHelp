import React from 'react';
import {View, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Colors} from '../../styles';
import styles from './styles';

const UserInput = props => {
  return (
    <View style={styles.inputWrapper}>
      <FontAwesomeIcon icon={props.icon} style={styles.inlineIcon} size={25} />
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        autoCorrect={props.autoCorrect}
        autoCapitalize={props.autoCapitalize}
        returnKeyType={props.returnKeyType}
        onChangeText={props.onChangeText}
        placeholderTextColor={Colors.BONE}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

UserInput.propTypes = {
  icon: PropTypes.object.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string,
};

export default UserInput;
