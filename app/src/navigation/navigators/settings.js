import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../../features/profile/components';
import UpdateProfile from '../../features/profile/components/update';
import Caregiver from '../../features/profile/components/caregiver';
import * as screenNames from '../screen_names';

const SettingsStack = createStackNavigator();

export const SettingsNavigator = (): React.ReactElement => (
  <SettingsStack.Navigator headerMode="none">
    <SettingsStack.Screen name={screenNames.PROFILE} component={Profile} />
    <SettingsStack.Screen
      name={screenNames.UPDATE_PROFILE}
      component={UpdateProfile}
    />
    <SettingsStack.Screen name={screenNames.CAREGIVER} component={Caregiver} />
  </SettingsStack.Navigator>
);
