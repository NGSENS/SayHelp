import React, {Component} from 'react';
import {View, TouchableOpacity, Alert, Platform, Linking} from 'react-native';
import {Header} from 'react-native-elements';
import Bridgefy from 'react-native-bridgefy-sdk';
import {Icon, theme} from 'galio-framework';
import MapView from 'react-native-maps';
import {
  GiftedChat,
  Send,
  InputToolbar,
  Composer,
  Actions,
  MessageText,
} from 'react-native-gifted-chat';
import {getUserEmail} from '../../../utils/user';
import {
  getMessages,
  sendMessage,
  getUid,
  snapshotOff,
} from '../../../utils/message';
import {Colors} from '../../../styles';
import styles from './style';
import Geolocation from '@react-native-community/geolocation';
require('dayjs/locale/fr');

class Conversation extends Component {
  state = {
    messages: [],
    receiver: null,
  };

  get user() {
    return {
      _id: getUid(),
      name: getUserEmail(),
    };
  }

  componentDidMount() {
    const emergency = this.props.route.params.emergency;
    getMessages(emergency, message => {
      this.setState(previous => ({
        messages: GiftedChat.append(previous.messages, message),
      }));
    });

    // TODO Why BridgeFy SDK is null ?
    console.log('BridgeFy SDK: ', Bridgefy);
  }

  componentWillUnmount() {
    snapshotOff(this.props.route.params.emergency);
  }

  onSend = messages => {
    sendMessage(messages, this.props.route.params.emergency);
  };

  onBack = () => {
    this.props.navigation.goBack();
  };

  openMap = async location => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?q=victim&ll=${location.latitude},${
        location.longitude
      }`,
      default: `http://maps.google.com/?q=${location.latitude},${
        location.longitude
      }`,
    });

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        return Linking.openURL(url);
      }
      Alert.alert('Opening the map is not supported.');
    } catch ({message}) {
      Alert.alert(message);
    }
  };

  renderMessageText = props => {
    const {currentMessage} = props;
    if (currentMessage.location) {
      return (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.mapView}
            onPress={() => this.openMap(currentMessage.location)}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          />
        </View>
      );
    }

    return <MessageText {...props} />;
  };

  renderSend = props => {
    return (
      <Send {...props} containerStyle={styles.sendContainer}>
        <View style={styles.sendButton}>
          <Icon
            name="arrow-up"
            family="font-awesome-5"
            size={20}
            color={Colors.WHITE}
          />
        </View>
      </Send>
    );
  };

  renderInputToolbar = props => {
    return (
      <InputToolbar {...props} containerStyle={styles.inputToolBarContainer} />
    );
  };

  renderComposer = props => {
    return <Composer {...props} textInputStyle={styles.composerTextInput} />;
  };

  renderActions = props => {
    const options = {
      Localisation: props => {
        const {onSend} = props;
        Geolocation.getCurrentPosition(
          info => {
            onSend([{location: info.coords, text: 'Location'}]);
          },
          error => {
            console.log('Error getting the current position. Error: ', error);
          },
          {enableHighAccuracy: true},
        );
      },
      Cancel: () => {
        console.log('User has cancelled location sharing.');
      },
    };

    return <Actions {...props} options={options} />;
  };

  render() {
    return (
      <View style={{backgroundColor: 'white', flex: 1}}>
        <Header
          containerStyle={styles.header}
          barStyle={'light-content'}
          centerComponent={{text: 'SayHelp !', style: styles.headerTitle}}
          leftComponent={
            <TouchableOpacity onPress={() => this.onBack()}>
              <Icon
                name="chevron-left"
                family="font-awesome-5"
                color={theme.COLORS.WHITE}
                size={24}
              />
            </TouchableOpacity>
          }
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          user={this.user}
          alwaysShowSend
          locale={'fr'}
          renderMessageText={this.renderMessageText}
          renderSend={this.renderSend}
          renderInputToolbar={this.renderInputToolbar}
          renderComposer={this.renderComposer}
          renderActions={this.renderActions}
        />
      </View>
    );
  }
}

export default Conversation;
