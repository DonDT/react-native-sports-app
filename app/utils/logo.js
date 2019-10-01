import React from "react";
import { Image } from "react-native";
import LogoImg from "../assests/images/nba_login_logo.png";

const LogoTitle = () => (
  <Image
    source={LogoImg}
    style={{ width: 70, height: 75 }}
    resizeMode="contain"
  />
);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff"
//   }
// });

export default LogoTitle;
