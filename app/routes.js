import React from "react";
import { Platform } from "react-native";

import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

//Screens
import News from "./components/news";
import Games from "./components/games";
import SignIn from "./components/auth";

const AppStack = createBottomTabNavigator({
  News: News,
  Games: Games
});

const AuthStack = createStackNavigator(
  {
    SignIn: SignIn
  },
  {
    //this takes out the header from stack navigations
    headerMode: "none"
  }
);

export const RootNavigator = () => {
  return createAppContainer(
    createSwitchNavigator(
      {
        App: AppStack,
        Auth: AuthStack
      },
      {
        initialRouteName: "Auth"
      }
    )
  );
};
