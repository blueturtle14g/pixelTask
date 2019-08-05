import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import LoadingScreen from '../screens/initialStack/loading/LoadingScreen.react';
import IntroductionScreen from '../screens/initialStack/introduction/IntroductionScreen.react';
import WelcomeScreen from '../screens/mainStack/welcome/WelcomeScreen.react';
import HallOfFameScreen from '../screens/mainStack/hallOfFame/HallOfFameScreen.react';

const MainStack = createStackNavigator({
  WelcomeScreen,
  HallOfFameScreen,
});

const IntroductionStack = createStackNavigator({
  LoadingScreen,
  IntroductionScreen,
});

export default createAppContainer(
  createSwitchNavigator({
    IntroductionStack,
    MainStack,
  })
);
