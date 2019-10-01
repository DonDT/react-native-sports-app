import React, { Component } from "react";
import { StyleSheet, View, Image, Text, Button, Platform } from "react-native";
import Input from "../../utils/forms/input";
import ValidationRules from "../../utils/forms/validationRules";
import { connect } from "react-redux";
import { signUp, signIn } from "../../store/actions/user_actions";
import { bindActionCreators } from "redux";
import { setTokens } from "../../utils/misc";

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
          minLength: 6
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
    //rules
    let rules = formCopy[name].rules;
    let valid = ValidationRules(value, rules, formCopy);
    console.log(valid);
    formCopy[name].valid = valid;
    this.setState({
      form: formCopy
    });
  };

  manageAccess = () => {
    // since we have access to state through redux, when the user sign in
    if (!this.props.User.auth.uid) {
      // if there is no id throw an error
      this.setState({ hasErrors: true });
    } else {
      // else pass the data, set the state of errors to false, and go next.
      setTokens(this.props.User.auth, () => {
        this.setState({ hasErrors: true });
        this.props.goNext();
      });
    }
  };

  submitUser = () => {
    let isFormValid = true;
    let formToSubmit = {};

    const formCopy = this.state.form;

    for (let key in formCopy) {
      if (this.state.type === "Login") {
        if (key !== "confirmPassword") {
          isFormValid = isFormValid && formCopy[key].valid;
          formToSubmit[key] = formCopy[key].value;
        }
      } else {
        isFormValid = isFormValid && formCopy[key].valid;
        formToSubmit[key] = formCopy[key].value;
      }
    }

    if (isFormValid) {
      if (this.state.type === "Login") {
        // when the promise is resolved, manageAccess is called to check
        this.props.signIn(formToSubmit).then(() => {
          this.manageAccess();
        });
      } else {
        this.props.signUp(formToSubmit).then(() => {
          this.manageAccess();
        });
      }
    } else {
      this.setState({ hasErrors: true });
    }
  };

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
          autoCapitalize={"none"}
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

function mapStateToProps(state) {
  return {
    User: state.User
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ signIn, signUp }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthForm);
