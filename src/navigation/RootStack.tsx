import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackNavigationType} from '../utils/types/navigationType';

import BottomTabNavigator from './BottomTabNavigation';

const Stack = createStackNavigator<RootStackNavigationType>();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'BottomTabNavigator'}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default RootStack;

/*
  Ce composant `RootStack` configure la navigation principale de l'application
  en utilisant un `StackNavigator` de React Navigation.

  - Le stack commence avec l'écran `BottomTabNavigator` comme écran initial.
  - L'en-tête (header) est désactivé sur toutes les pages du stack via `headerShown: false`.
  - Le `BottomTabNavigator` gère la navigation par onglets en bas de l'écran,
    ce qui permet de structurer l'app avec plusieurs sections accessibles facilement.

  Ce pattern permet d'avoir une navigation par pile principale, avec un navigateur par onglets intégré.
*/
