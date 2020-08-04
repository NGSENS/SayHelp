import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Header, CheckBox} from 'react-native-elements';
import {Icon, Input} from 'galio-framework';
import SwipeablePanel from 'rn-swipeable-panel/lib/components/Panel';
import RNPickerSelect from 'react-native-picker-select';
import {
  sendQuickAlert,
  sendTargetedAlert,
  generateTopic,
} from '../../../utils/notification';
import {getAllCaresFields} from '../../../utils/user';
import styles, {pickerSelectStyles} from './styles';
import {Colors} from '../../../styles';
import * as screenNames from '../../../navigation/screen_names';

const Home = ({navigation}) => {
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: true,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    closeOnTouchOutside: true,
  });
  const [isQuickPanelActive, setIsQuickPanelActive] = useState(false);
  const [isTargetedPanelActive, setIsTargetedPanelActive] = useState(false);
  const [emergencyAlreadyCalled, setEmergencyAlreadyCalled] = useState(false);
  const [selectItems, setSelectItems] = useState([]);
  const [emergencyField, setEmergencyField] = useState(null);
  const [emergencyDescription, setEmergencyDescription] = useState(null);

  const openPanel = type => {
    if (type === 'quick') {
      setEmergencyAlreadyCalled(false);
      setIsTargetedPanelActive(false);
      setIsQuickPanelActive(true);
    } else if (type === 'targeted') {
      setIsQuickPanelActive(false);
      setIsTargetedPanelActive(true);
    }
  };

  const closePanel = () => {
    setIsQuickPanelActive(false);
    setIsTargetedPanelActive(false);
  };

  const onQuickAlert = () => {
    // Send notification to all nearby users
    sendQuickAlert();

    // Register to topic to receive notification
    generateTopic();

    // Redirect to the waiting screen
    navigation.navigate(screenNames.LOADER, {
      callEmergency: !emergencyAlreadyCalled,
    });
  };

  const onTargetedAlert = () => {
    // Send notification to all nearby users
    sendTargetedAlert(emergencyField, emergencyDescription);

    // Register to topic to receive notification
    generateTopic();

    // Redirect to the waiting screen
    navigation.navigate(screenNames.LOADER);
  };

  useEffect(() => {
    getAllCaresFields().then(allFields => {
      const items = [];
      for (const [key, field] of Object.entries(allFields)) {
        items.push({label: field.title, value: key});
      }
      setSelectItems(items);
    });
  }, []);

  useEffect(() => {
    navigation.addListener('blur', () => {
      setIsQuickPanelActive(false);
      setIsTargetedPanelActive(false);
    });
  });

  return (
    <View style={{backgroundColor: 'white'}}>
      <Header
        containerStyle={styles.header}
        barStyle={'light-content'}
        centerComponent={{text: 'SayHelp !', style: styles.headerTitle}}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Quick alert</Text>
        <Text style={styles.description}>
          You are facing a very urgent situation and you need help as soon as
          possible, so issue an early warning to find a caregiver quickly.
        </Text>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => openPanel('quick')}>
            <Text style={styles.buttonText}>Trigger a quick alert !</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.title, {marginTop: 50}]}>Targeted alert</Text>
        <Text style={styles.description}>
          Your are facing a situation that is not very urgent but you still need
          help and advice from a specialist, so issue a targeted alert to find
          the best caregiver.
        </Text>
        <View style={{alignItems: 'center', paddingBottom: 60}}>
          <TouchableOpacity
            style={[styles.button, styles.warningButton]}
            onPress={() => openPanel('targeted')}>
            <Text style={[styles.buttonText, styles.warningButtonText]}>
              Trigger a targeted alert !
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SwipeablePanel
        isActive={isQuickPanelActive}
        {...panelProps}
        onlySmall="true"
        barStyle={{width: 100}}>
        <View style={[styles.panelContainer, {alignItems: 'center'}]}>
          <Text style={styles.panelTitle}>Please confirm</Text>
          <CheckBox
            center
            title="I've already call emergency :"
            checkedIcon="check-square"
            checkedColor={Colors.TEAL_BLUE}
            uncheckedIcon="square"
            iconType="font-awesome-5"
            iconRight={true}
            checked={emergencyAlreadyCalled}
            onPress={() => setEmergencyAlreadyCalled(!emergencyAlreadyCalled)}
          />
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => onQuickAlert()}>
            <Text style={styles.panelButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SwipeablePanel>
      <SwipeablePanel
        isActive={isTargetedPanelActive}
        {...panelProps}
        onlyLarge="true"
        barStyle={{width: 100}}>
        <View style={[styles.panelContainer]}>
          <Text style={styles.panelTitle}>Please confirm</Text>
          <RNPickerSelect
            onValueChange={value => setEmergencyField(value)}
            items={selectItems}
            style={{...pickerSelectStyles}}
            placeholder={{
              label: 'Select the health area...',
              value: null,
              color: Colors.GRAY_MS,
            }}
            Icon={() => {
              return (
                <Icon
                  name="caret-down"
                  family="font-awesome-5"
                  color={Colors.GRAY_MS}
                  size={25}
                />
              );
            }}
          />
          <Input
            placeholder="Describe your emergency"
            color={Colors.BLACK}
            multiline={true}
            style={styles.panelEmergencyDescription}
            onChangeText={text => setEmergencyDescription(text)}
          />
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={[styles.panelButton]}
              onPress={() => onTargetedAlert()}>
              <Text style={styles.panelButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SwipeablePanel>
    </View>
  );
};

export default Home;
