import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator
} from "react-native";
import AuthLogo from "./authLogo";
import AuthForm from "./authForm";

class AuthComponent extends Component {
  state = {
    loading: false
  };
  goNext = () => {
    this.props.navigation.navigate("App");
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.container}>
          <View>
            <AuthLogo />
            <AuthForm goNext={this.goNext} />
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d428a",
    padding: 50
  },
  loading: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default AuthComponent;
