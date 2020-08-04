import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  View,
  Dimensions,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import spinner from '../../assets/images/spinner.gif';
import * as screenNames from '../../navigation/screen_names';

const DEVICE_WIDTH = Dimensions.get('window').width;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  async _onPress() {
    if (this.state.isLoading) {
      return;
    }

    if (!this.props.canSubmit()) {
      return;
    }

    this.setState({isLoading: true});
    Keyboard.dismiss();

    // Shrink the submit button
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    // Execute the onSubmit callback
    this.props
      .onSubmit()
      .then(() => {
        setTimeout(() => {
          this._onGrow();
        }, 2000);

        setTimeout(() => {
          // TODO Make the navigation dynamic
          //this.props.navigation.navigate(screenNames.APP);
          this.setState({isLoading: false});
          this.buttonAnimated.setValue(0);
          this.growAnimated.setValue(0);
        }, 2300);
      })
      .catch(() => {
        setTimeout(() => {
          this.setState({isLoading: false});

          // Get submit button back
          Animated.timing(this.buttonAnimated, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: false,
          }).start();
          this.growAnimated.setValue(0);
        }, 2300);
      });
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>{this.props.name}</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>
      </View>
    );
  }
}

ButtonSubmit.propTypes = {
  name: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  canSubmit: PropTypes.func,
};
