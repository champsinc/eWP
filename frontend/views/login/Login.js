import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  TouchableWithoutFeedbackBase,
} from "react-native";
import AppBar from "./../../components/AppBar";
import { Button, TextInput } from "react-native-paper";

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showError: false,
      emailError: false,
      passwordError: false,
      shouldShowLogin: false,
    };
  }

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  crendentials = [
    {
      email: "raghul.sathya@gmail.com",
      password: "abcd",
    },
  ];

  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  onSignUpPress = () => {
    this.props.navigation.push("SignUp");
  };

  onLoginPress = () => {
    this.crendentials.filter((credential) => {
      return (
        credential.email == this.state.email &&
        credential.password == this.state.password
      );
    }).length > 0
      ? this.props.navigation.navigate("Dashboard")
      : this.setState({
          showError: true,
        });
  };

  onChangeEmail = (email) => {
    this.setState(
      {
        email,
      },
      () => {
        this.setState({
          shouldShowLogin: this.shouldShowLogin(),
        });
      }
    );
  };

  onChangePassword = (password) => {
    this.setState(
      {
        password,
      },
      () => {
        this.setState({
          shouldShowLogin: this.shouldShowLogin(),
        });
      }
    );
  };

  shouldShowLogin = () => {
    return (
      this.emailRegex.test(String(this.state.email).toLowerCase()) &&
      this.state.password.length > 3
    );
  };

  checkEmailAddress = () => {
    this.emailRegex.test(String(this.state.email).toLowerCase())
      ? this.setState({
          emailError: false,
        })
      : this.setState({
          emailError: true,
        });
  };

  checkPassword = () => {
    this.state.password.length > 3
      ? this.setState({
          passwordError: false,
        })
      : this.setState({
          passwordError: true,
        });
  };

  render() {
    return (
      <View style={styles.view}>
        <AppBar toggleNavBar={this.toggleNavBar} subTitle="Login" />
        <View style={styles.container}>
          <View style={styles.oneRow}>
            <Text style={styles.fieldName}>Email:</Text>
            <TextInput
              mode={"outlined"}
              value={this.state.email}
              autoCapitalize={"none"}
              onChangeText={this.onChangeEmail}
              keyboardType={"email-address"}
              error={this.state.emailError}
              style={styles.textInput}
              textContentType={"emailAddress"}
              textBreakStrategy={"balanced"}
              onBlur={this.checkEmailAddress}
            />
          </View>
          {this.state.emailError && (
            <Text style={styles.errorText}>
              Please enter a vaild Email Address
            </Text>
          )}
          <View style={styles.oneRow}>
            <Text style={styles.fieldName}>Password:</Text>
            <TextInput
              mode={"outlined"}
              autoCapitalize={"none"}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={this.onChangePassword}
              error={this.state.passwordError}
              style={styles.textInput}
              onBlur={this.checkPassword}
            />
          </View>
          {this.state.passwordError && (
            <Text style={styles.errorText}>Minimum passsword length is 4</Text>
          )}
          {this.state.shouldShowLogin && (
            <View style={styles.oneRow}>
              <Button onPress={this.onLoginPress}>Login</Button>
            </View>
          )}
          {this.state.showError && (
            <Text style={styles.errorText}>
              Your email address and password do not match our records
            </Text>
          )}
          <View style={styles.oneRow}>
            <Text style={styles.newUserText}>New User?</Text>
            <Button onPress={this.onSignUpPress}> Sign Up</Button>
          </View>
        </View>
      </View>
    );
  }
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    marginTop: windowHeight / 4,
  },
  oneRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldName: {
    alignSelf: "center",
    flex: Platform.OS == "web" ? 0.1 : 0.5,
  },
  textInput: {
    minWidth: 150,
    maxWidth: 250,
  },
  newUserText: {
    marginRight: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
  },
});
