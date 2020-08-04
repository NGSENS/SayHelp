import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {Header, ListItem} from 'react-native-elements';
import SwipeablePanel from 'rn-swipeable-panel/lib/components/Panel';
import {Linking} from 'react-native';
import styles from './style';
import * as screenNames from '../../../navigation/screen_names';
import {getVictimPhoneNumber} from '../../../utils/user';
import {getVictim} from '../../../utils/emergency';
import {getChatRooms} from '../../../utils/message';
import {Colors} from '../../../styles';
import default_user from '../../../assets/images/default_user.png';

const Chat = ({route, navigation}) => {
  // Get route params
  const emergency = route.params ? route.params.emergency : '';
  const isQuickPanelActiveProps = route.params
    ? route.params.quickPanel
    : false;

  // Create state properties
  const [loading, setLoading] = useState(true);
  const [chatRooms, setChatRooms] = useState([]);
  const [victimPhoneNumber, setVictimPhoneNumber] = useState(null);
  const [isQuickPanelActive, setIsQuickPanelActive] = useState(
    isQuickPanelActiveProps,
  );

  const closePanel = () => {
    setIsQuickPanelActive(false);
    route.params.quickPanel = false;
  };

  const addNavigationListener = useCallback(() => {
    return navigation.addListener('focus', () => {
      setIsQuickPanelActive(route.params ? route.params.quickPanel : false);
    });
  });

  const onChatChannel = () => {
    closePanel();
    navigation.navigate(screenNames.CONVERSATION, {
      emergency: emergency,
    });
  };

  useEffect(() => {
    const unsubscribe = addNavigationListener();

    // Set victim phone number
    if (emergency) {
      getVictim(emergency).then(victim => {
        getVictimPhoneNumber(victim).then(number => {
          setVictimPhoneNumber(number);
        });
      });
    }

    return unsubscribe;
  }, [addNavigationListener, emergency]);

  useEffect(() => {
    // Get conversations
    getChatRooms().then(rooms => {
      setChatRooms(rooms);

      if (loading) {
        setLoading(false);
      }
    });
  }, [loading]);

  useFocusEffect(() => {
    addNavigationListener();
  });

  const getImage = image => {
    return image ? {uri: image} : default_user;
  };

  let content;
  if (loading) {
    content = (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={Colors.TEAL_BLUE} />
      </View>
    );
  } else if (chatRooms.length > 0) {
    content = (
      <ScrollView style={styles.container}>
        {chatRooms.map((l, i) => (
          <TouchableOpacity
            key={i}
            onPress={() =>
              navigation.navigate(screenNames.CONVERSATION, {
                emergency: l.emergency,
              })
            }>
            <ListItem
              key={i}
              title={l.title}
              titleStyle={styles.listTitle}
              subtitle={l.lastMessage}
              subtitleStyle={styles.listSubtitle}
              containerStyle={styles.listContainer}
              contentContainerStyle={styles.listContentContainer}
              leftAvatar={{
                containerStyle: styles.leftAvatarContainer,
                size: 60,
                source: getImage(l.image),
              }}
              bottomDivider
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  } else {
    content = (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'gray'}}>No conversations yet</Text>
      </View>
    );
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header
        containerStyle={styles.header}
        barStyle={'light-content'}
        centerComponent={{text: 'SayHelp !', style: styles.headerTitle}}
      />
      {content}
      <SwipeablePanel
        isActive={isQuickPanelActive}
        fullWidth="true"
        openLarge="true"
        onlyLarge="true"
        showCloseButton="true"
        onClose={() => closePanel()}
        onPressCloseButton={() => closePanel()}
        barStyle={{width: 100}}
        style={styles.panel}>
        <View style={[styles.panelContainer, {alignItems: 'center'}]}>
          <Text style={styles.panelTitle}>A quick alert was triggered</Text>
          <Text style={styles.panelText}>
            A person has triggered an alert because they are in an emergency
            situation. At the moment you are close to this person. Contact the
            person to provide first aid.
          </Text>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => onChatChannel()}>
            <Text style={styles.panelButtonText}>Chat with the person</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => {
              Linking.openURL(`tel:${victimPhoneNumber}`);
            }}>
            <Text style={styles.panelButtonText}>Call the person</Text>
          </TouchableOpacity>
        </View>
      </SwipeablePanel>
    </View>
  );
};

export default Chat;
