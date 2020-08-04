import {
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';

export default class KeyboardAvoidingAndDismissingView extends React.PureComponent {
  static propTypes = KeyboardAvoidingView.propTypes;

  static defaultProps = {
    behavior: 'padding',
    keyboardVerticalOffset: 0,
    style: {flex: 1},
  };

  state = {
    isDisabled: true,
  };

  UNSAFE_componentWillMount() {
    this.hideListener = Keyboard.addListener('keyboardDidHide', this.onHide);
    this.showListener = Keyboard.addListener('keyboardDidShow', this.onShow);
  }

  componentWillUnmount() {
    this.hideListener.remove();
    this.showListener.remove();
  }

  onHide = () => {
    this.setState({
      isDisabled: true,
    });
  };

  onShow = () => {
    this.setState({
      isDisabled: false,
    });
  };

  render() {
    const {props, state} = this;

    return (
      <TouchableWithoutFeedback
        onPressOut={Keyboard.dismiss}
        disabled={state.isDisabled}>
        <KeyboardAvoidingView {...props}>{props.children}</KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}
