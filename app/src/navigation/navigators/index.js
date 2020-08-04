import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from '../../utils/navigation';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {AuthNavigator} from './auth';
import {HomeNavigator} from './app';
import Loader from '../../features/loader/components';
import Conversation from '../../features/chat/components/conversation';
import * as screenNames from '../screen_names';

const Stack = createStackNavigator();

export default () => {
  const [comeFromAuth, setComeFromAuth] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    return auth().onAuthStateChanged(f_user => {
      // Check if the user comes from the authentication pages to know if we have to wait for the animation to finish
      if (!f_user) {
        setComeFromAuth(true);
        setUser(f_user);
      } else if (f_user && comeFromAuth) {
        setTimeout(() => {
          setUser(f_user);
        }, 2300);
      } else if (f_user && !comeFromAuth) {
        setUser(f_user);
      }
    });
  }, [comeFromAuth]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator headerMode="none">
        {!user ? (
          <Stack.Screen name={screenNames.AUTH} component={AuthNavigator} />
        ) : (
          <Stack.Screen
            name={screenNames.APP}
            options={{
              animationEnabled: false,
              animationTypeForReplace: 'pop',
            }}
            component={HomeNavigator}
          />
        )}
        <Stack.Screen
          name={screenNames.LOADER}
          options={{
            animationEnabled: false,
            animationTypeForReplace: 'pop',
          }}
          component={Loader}
        />
        <Stack.Screen
          name={screenNames.CONVERSATION}
          component={Conversation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
