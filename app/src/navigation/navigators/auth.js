import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../features/login/components'; // TODO import containers when available
import Register from '../../features/register/components'; // TODO import containers when available
import * as screenNames from '../screen_names';

const AuthStack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name={screenNames.LOGIN} component={Login}/>
    <AuthStack.Screen name={screenNames.REGISTER} component={Register}/>
  </AuthStack.Navigator>
);
