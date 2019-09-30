import React, { Component } from "react";
import { StyleSheet, View, Image, Text, Button, Platform } from "react-native";
import Input from "../../utils/forms/input";

class AuthForm extends React.Component {
  state = {
    type: "Login",
    action: "Login",
    actionMode: "I want to register",
    hasErrors: false,
    form: {
      email: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          isEmail: true
        }
      },
      password: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          isRequired: true,
          minlength: 6
        }
      },
      confirmPassword: {
        value: "",
        valid: false,
        type: "textinput",
        rules: {
          confirmPass: "password"
        }
      }
    }
  };

  updateInput = (name, value) => {
    this.setState({
      hasErrors: false
    });
    let formCopy = this.state.form;
    formCopy[name].value = value;

    this.setState({
      form: formCopy
    });
  };

  submitUser = () => {};

  formHasError = () =>
    this.state.hasErrors ? (
      <View style={styles.errorContainer}>
        <Text style={styles.errorLabel}>Oops, check your info</Text>
      </View>
    ) : null;

  confirmPassword = () =>
    this.state.type !== "Login" ? (
      <Input
        placeholder="Confirm password"
        placeholderTextColor="#cecece"
        type={this.state.form.confirmPassword.type}
        value={this.state.form.confirmPassword.value}
        onChangeText={value => this.updateInput("confirmPassword", value)}
        secureTextEntry
      />
    ) : null;

  changeFormType = () => {
    const type = this.state.type;

    this.setState({
      type: type === "Login" ? "Register" : "Login",
      action: type === "Login" ? "Register" : "Login",
      actionMode: type === "Login" ? "I want to Login" : "I want to register"
    });
  };

  render() {
    return (
      <View>
        <Input
          placeholder="Enter email"
          placeholderTextColor="#cecece"
          autoCapiatalize={"none"}
          type={this.state.form.email.type}
          value={this.state.form.email.value}
          keyboardType={"email-address"}
          onChangeText={value => this.updateInput("email", value)}
        />
        <Input
          placeholder="Enter password"
          placeholderTextColor="#cecece"
          type={this.state.form.password.type}
          value={this.state.form.password.value}
          onChangeText={value => this.updateInput("password", value)}
          secureTextEntry
        />

        {this.confirmPassword()}
        {this.formHasError()}
        <View style={{ marginTop: 20 }}>
          <View style={styles.button}>
            <Button title={this.state.action} onPress={this.submitUser} />
          </View>
          <View style={styles.button}>
            <Button
              title={this.state.actionMode}
              onPress={this.changeFormType}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="I'll do it later"
              onPress={() => this.props.goNext()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    marginBottom: 10,
    marginTop: 30,
    padding: 10,
    backgroundColor: "#f44336"
  },
  errorLabel: {
    color: "#fff",
    textAlign: "center",
    textAlignVertical: "center"
  },
  button: {
    ...Platform.select({
      ios: { marginBottom: 0 },
      android: { marginBottom: 10, marginTop: 10 }
    })
  }
});

export default AuthForm;
