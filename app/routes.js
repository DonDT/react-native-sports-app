import React from "react";
import { Platform } from "react-native";

import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

//Screens
import News from "./components/news";
import Games from "./components/games";
import SignIn from "./components/auth";
import Article from "./components/news/article";
import GamesArticle from "./components/games/article";

import Logo from "./utils/logo";

const headerConf = {
  headerLayoutPreset: "center",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#001338"
    },
    headerTintColor: "white",
    headerTitle: Logo
  }
};

const NewsStack = createStackNavigator(
  {
    News: News,
    Article: Article
  },
  headerConf
);
const GameStack = createStackNavigator(
  {
    Games: Games,
    Article: GamesArticle
  },
  headerConf
);

const AppStack = createBottomTabNavigator(
  {
    News: NewsStack,
    Games: GameStack
  },
  {
    tabBarOptions: {
      activeTintColor: "#fff",
      showLabel: false,
      activeBackgroundColor: "#00194b",
      inactiveBackgroundColor: "#001338",
      style: {
        backgroundColor: "#001338"
      }
    }
  }
);

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
