import React, { Component } from "react";
import { View, Image } from "react-native";
import LogoImage from "../../assests/images/nba_login_logo.png";

const LogoComponent = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={LogoImage}
        resizeMode={"center"}
        style={{ width: 170, height: 150 }}
      />
    </View>
  );
};

export default LogoComponent;
