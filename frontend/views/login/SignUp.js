import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  TouchableWithoutFeedbackBase,
  TouchableOpacityBase,
} from "react-native";
import AppBar from "./../../components/AppBar";
import { TextInput, Button } from "react-native-paper";

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      showError: false,
      userNameError: false,
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
      shouldShowSignUp: false,
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

  onExistingPress = () => {
    this.props.navigation.pop();
  };

  onSignUpPress = () => {
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

  onChangeUserName = (userName) => {
    this.setState({
      userName,
    });
  };

  onChangeEmail = (email) => {
    this.setState(
      {
        email,
      },
      () => {
        this.setState({
          shouldShowSignUp: this.shouldShowSignUp(),
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
          shouldShowSignUp: this.shouldShowSignUp(),
        });
      }
    );
  };

  onChangeConfirmPassword = (confirmPassword) => {
    this.setState(
      {
        confirmPassword,
      },
      () => {
        this.setState({
          shouldShowSignUp: this.shouldShowSignUp(),
        });
      }
    );
  };

  shouldShowSignUp = () => {
    return (
      true &&
      this.state.userNameError &&
      this.state.emailError &&
      this.state.passwordError &&
      this.state.confirmPasswordError
    );
  };

  checkEmailAddress = () => {
    this.emailRegex.test(String(this.state.email).toLowerCase())
      ? this.setState({ emailError: false })
      : this.setState({
          emailError: true,
        });
  };

  checkUserName = () => {
    this.state.userName.length > 4
      ? this.setState({
          userNameError: false,
        })
      : this.setState({
          userNameError: true,
        });
  };

  checkPassword = () => {
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    console.log(this.state.password);
    console.log(passwordRegex.test(String(this.state.password).toLowerCase()));
    passwordRegex.test(String(this.state.password).toLowerCase())
      ? this.setState({ passwordError: false })
      : this.setState({ passwordError: true });
  };

  checkConfirmPassword = () => {
    this.state.password == this.state.confirmPassword
      ? this.setState({
          confirmPasswordError: false,
        })
      : this.setState({
          confirmPasswordError: true,
        });
  };

  render() {
    return (
      <View style={styles.view}>
        <AppBar
          toggleNavBar={this.toggleNavBar}
          subTitle="Sign Up"
          backButton={true}
          backButtonAction={() => {
            this.props.navigation.pop();
          }}
        />
        <View style={styles.container}>
          <View style={styles.oneRow}>
            <Text style={styles.fieldName}>User Name:</Text>
            <TextInput
              mode={"outlined"}
              value={this.state.userName}
              autoCapitalize={"none"}
              onChangeText={this.onChangeUserName}
              error={this.state.userNameError}
              style={styles.textInput}
              textBreakStrategy={"balanced"}
              onBlur={this.checkUserName}
            />
          </View>
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
          <View style={styles.oneRow}>
            <Text style={styles.fieldName}>Confirm Password:</Text>
            <TextInput
              mode={"outlined"}
              autoCapitalize={"none"}
              secureTextEntry={true}
              value={this.state.confirmPassword}
              onChangeText={this.onChangeConfirmPassword}
              error={this.state.confirmPasswordError}
              style={styles.textInput}
              onBlur={this.checkConfirmPassword}
            />
          </View>
          {this.state.shouldShowSignUp && (
            <View style={styles.oneRow}>
              <Button onPress={this.onSignUpPress}>Sign Up</Button>
            </View>
          )}
          {this.state.showError && (
            <Text style={styles.errorText}>
              Your email address and password do not match our records
            </Text>
          )}
          <View style={styles.oneRow}>
            <Text style={styles.newUserText}>Existing User?</Text>
            <Button onPress={this.onExistingPress}>Login</Button>
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
    flex: Platform.OS == "web" ? 0.06 : 0.5,
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
    fontSize: 16,
    textAlign: "center",
  },
});
