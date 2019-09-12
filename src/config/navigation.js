import React, { Component } from 'react';
import { createSwitchNavigator, createMaterialTopTabNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from '../screens/Home'
import AuthScreen from '../screens/Auth'
import ScoreScreen from '../screens/score'

const AuthNavigator = createStackNavigator(
    {
        Auth : AuthScreen
    }
);

const HomeNavigation = createStackNavigator(
    {
        Home : HomeScreen,
        Score : ScoreScreen
    }
);

const AppNavigator = createSwitchNavigator(
    {
        HomeScreen: HomeNavigation,
      Auth: AuthNavigator,
    },
    {
      initialRouteName: 'Auth',
    }
  );



export default createAppContainer(AppNavigator);