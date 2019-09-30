import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class GamesComponent extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Hello I am the Games </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default GamesComponent;
