import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'galio-framework';
import Home from '../../features/home/components';
import TabHomeButton from '../../features/home/components/tabButton';
import Chat from '../../features/chat/components';
import {SettingsNavigator} from './settings';
import {Colors} from '../../styles/index';
import * as screenNames from '../screen_names';

const BottomTab = createBottomTabNavigator();

export const HomeNavigator = (): React.ReactElement => (
  <BottomTab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === screenNames.SETTINGS) {
          iconName = focused ? 'user' : 'user';
        } else if (route.name === screenNames.CHAT) {
          iconName = focused ? 'comment' : 'comment';
        }

        // Return the icon to display
        return (
          <Icon
            family="font-awesome-5"
            name={iconName}
            size={size * 1.1}
            color={color}
            style={{marginTop: 4}}
          />
        );
      },
    })}
    tabBarOptions={{
      activeTintColor: Colors.TEAL_BLUE,
      inactiveTintColor: 'gray',
    }}
    initialRouteName={screenNames.HOME}>
    <BottomTab.Screen name={screenNames.CHAT} component={Chat} />
    <BottomTab.Screen
      name={screenNames.HOME}
      component={Home}
      options={{
        tabBarIcon: () => <TabHomeButton />,
        tabBarLabel: () => null,
      }}
    />
    <BottomTab.Screen
      name={screenNames.SETTINGS}
      component={SettingsNavigator}
    />
  </BottomTab.Navigator>
);
