import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Header, CheckBox} from 'react-native-elements';
import {Icon, theme} from 'galio-framework';
import styles from './styles';
import {Colors} from '../../../styles';
import {
  getAllCaresFields,
  getUserCaresFields,
  setUserCaresFields,
} from '../../../utils/user';

const Caregiver = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState([]);
  const [actualUserFields, setActualUserFields] = useState([]);
  const [temp, setTemp] = useState(false);

  useEffect(() => {
    getAllCaresFields().then(allFields => {
      getUserCaresFields().then(userFields => {
        if (userFields) {
          userFields.forEach(userField => {
            allFields[userField].isSelected = true;
          });
        }
        setActualUserFields(userFields);
        setFields(allFields);
        setLoading(false);
      });
    });
  }, []);

  useEffect(() => {
    // When the screen is not focused anymore, store the new care's fields
    const unsubscribe = navigation.addListener('blur', () => {
      setLoading(true);
      const userFields = [];
      for (const [key, value] of Object.entries(fields)) {
        if (value.isSelected) {
          userFields.push(key);
        }
      }

      // Check if user has edit something before invoking the database
      if (!areSameArrays(actualUserFields, userFields)) {
        // Store usersCaresFields
        setUserCaresFields(userFields)
          .then(() => {
            console.log("User care's fields updated successfully.");
            setActualUserFields(userFields);
            setLoading(false);
          })
          .catch(error => {
            console.log("Error updating user care's fields");
          });
      } else {
        console.log("User care's fields have remained the same.");
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [actualUserFields, areSameArrays, fields, navigation]);

  const areSameArrays = useCallback((fields1, fields2) => {
    if (!fields1 || !fields2) {
      return false;
    }
    if (fields1.length !== fields2.length) {
      return false;
    }
    const arr1 = fields1.concat().sort();
    const arr2 = fields2.concat().sort();

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }, []);

  const onCheckBoxPress = key => {
    let currentFields = fields;
    let fieldToUpdate = {...currentFields[key]};
    fieldToUpdate.isSelected = !fieldToUpdate.isSelected;
    currentFields[key] = fieldToUpdate;
    setFields(currentFields);
    setTemp(!temp);
  };

  let content;
  if (loading) {
    content = (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={Colors.TEAL_BLUE} />
      </View>
    );
  } else {
    const checkBoxes = [];
    for (const [key, value] of Object.entries(fields)) {
      checkBoxes.push(
        <CheckBox
          key={key}
          checked={fields[key].isSelected}
          title={value.title}
          checkedIcon="check-square"
          checkedColor={Colors.TEAL_BLUE}
          uncheckedIcon="square"
          iconType="font-awesome-5"
          iconRight={true}
          containerStyle={styles.caregiverFieldsContainer}
          textStyle={styles.caregiverFieldsText}
          onPress={() => onCheckBoxPress(key)}
        />,
      );
    }

    content = (
      <ScrollView>
        <Text style={styles.caregiverTitle}>
          I am a specialist in the following fields
        </Text>
        <View style={styles.caregiverFieldsContainerView}>{checkBoxes}</View>
      </ScrollView>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        containerStyle={styles.smallHeader}
        barStyle={'light-content'}
        centerComponent={{text: 'SayHelp !', style: styles.headerTitle}}
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="chevron-left"
              family="font-awesome-5"
              color={theme.COLORS.WHITE}
              size={24}
            />
          </TouchableOpacity>
        }
      />
      {content}
    </View>
  );
};

export default Caregiver;
