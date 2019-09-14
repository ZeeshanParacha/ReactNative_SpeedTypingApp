import React, { Component } from 'react';
import { createSwitchNavigator, createBottomTabNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';


import HomeScreen from '../screens/Home'
import AuthScreen from '../screens/Auth'
import ScoreScreen from '../screens/score'
import GameScreen from '../screens/easymode'
import ScoresScreen from '../screens/mediummode'
import HardModeScreen from '../screens/hardmode'

import TabIcon from '../screens/Tabicons';

const EasyTabIcon = ({ tintColor }) => (
    <TabIcon name="ios-leaf" tintColor={tintColor} />
  );
  const MediumTabIcon = ({ tintColor }) => (
    <TabIcon name="ios-bonfire" tintColor={tintColor} />
  );
  const HardTabIcon = ({ tintColor }) => (
    <TabIcon name="md-bonfire" tintColor={tintColor} />
  );



const AuthNavigator = createStackNavigator(
    {
        Auth : AuthScreen
    }
);



const TopNavigator = createMaterialTopTabNavigator(
    {
        GameScreen: {
            screen: GameScreen,
            navigationOptions: { header: null,  tabBarIcon: EasyTabIcon }
          },
          Scores: {
            screen: ScoresScreen,
            navigationOptions: { header: null , tabBarIcon: MediumTabIcon }
          },
        //   Hard: {
        //     screen: HardModeScreen,
        //     navigationOptions: { header: null ,tabBarIcon: HardTabIcon}
        //   },
    },
    {
        tabBarPosition: 'top',
        tabBarOptions: {
          activeTintColor: '#2B1F33',
          inactiveTintColor: 'grey',
          pressColor: '#ccc',
          showIcon: true,
          showLabel: true,
          labelStyle: {
            fontWeight: 'bold',
            fontSize: 12,
            // fontFamily: AppStyles.fonts.FONT_MEDIUM
          },
          indicatorStyle: {
            backgroundColor: '#2B1F33'
          },
          style: {
            backgroundColor : '#fff'
          }
          
        }
    
    }
  );

  TopNavigator.navigationOptions={
    header:null,
}
  const HomeNavigation = createStackNavigator(
    {
        Home : TopNavigator,
        Score : ScoreScreen
    }
);

const AppNavigator = createSwitchNavigator(
    {
        Home: HomeNavigation,
        Auth: AuthNavigator,
    },
    {
      initialRouteName: 'Auth',
    }
  );



export default createAppContainer(AppNavigator);