import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  Linking,
  StatusBar,
} from "react-native";
import { Button, HelperText, Card } from "react-native-paper";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Fumi } from "react-native-textinput-effects";
import { customTheme } from "../../styles/Main";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native";
import { util } from "../../assets/Utility";
import axios from "axios";

import { AuthContext } from "./../../App";

const SignIn = (props) => {
  const { signIn } = React.useContext(AuthContext);
  signIn(props);
  return <View />;
};

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showError: false,
      emailError: false,
      passwordError: false,
      signIn: null,
    };
  }

  initialState = {
    email: "",
    password: "",
    showError: false,
    emailError: false,
    passwordError: false,
    signIn: null,
  };

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  onRegisterPress = () => {
    this.props.navigation.navigate("sign_up");
  };

  onLoginPress = () => {
    this.checkEmailAddress();
    this.checkPassword();
    !this.state.emailError &&
    this.state.email.trim() != "" &&
    !this.state.passwordError &&
    this.state.password != ""
      ? axios
          .post(
            util.api_url + "/user/login",
            {
              email: this.state.email,
              password: this.state.password,
            },
            {
              headers: {
                api_key: util.api_key,
              },
            }
          )
          .then((res) => {
            res.data.error
              ? this.setState({
                  showError: true,
                })
              : [
                  this.setState({
                    signIn: (
                      <SignIn
                        navigation={this.props.navigation}
                        token="dummy-token"
                        user={res.data}
                      />
                    ),
                  }),
                ];
          })
          .catch((err) => {
            this.setState({
              showError: true,
            });
          })
      : "";
  };

  onResetPress = () => {
    this.props.navigation.navigate("reset_password");
  };

  onChangeEmail = (email) => {
    this.setState({
      email,
      showError: false,
    });
  };

  onChangePassword = (password) => {
    this.setState({
      password,
      showError: false,
    });
  };

  checkEmailAddress = () => {
    this.emailRegex.test(String(this.state.email))
      ? this.setState({
          emailError: false,
        })
      : this.setState({
          emailError: true,
        });
  };

  checkPassword = () => {
    this.state.password.length >= 8
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
        {this.state.signIn}
        <StatusBar barStyle="dark-content" backgroundColor="#f6f6f6" />
        <Image
          source={{ uri: util.logoURL }}
          style={styles.logo}
          width={windowWidth - 20}
          height={(windowWidth - 20) * 0.2566}
        />
        <Card style={styles.container} elevation={3}>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {}}
              mode={"text"}
              uppercase={false}
              compact={false}
              labelStyle={styles.authNavButtonActive}
              style={{
                borderBottomColor: customTheme.primaryColor,
                borderBottomWidth: 3,
              }}
            >
              Login
            </Button>
            <Button
              onPress={this.onRegisterPress}
              mode={"text"}
              uppercase={false}
              compact={false}
              labelStyle={styles.authNavButtonInActive}
            >
              Register
            </Button>
          </View>
          <ScrollView>
            <Fumi
              label={"Your Email"}
              value={this.state.email}
              autoCapitalize={"none"}
              onChangeText={this.onChangeEmail}
              keyboardType={"email-address"}
              error={this.state.emailError}
              textContentType={"emailAddress"}
              textBreakStrategy={"balanced"}
              onBlur={this.checkEmailAddress}
              iconClass={FontAwesomeIcon}
              iconName={"user"}
              iconColor={
                this.state.emailError
                  ? "rgb(176, 0, 32)"
                  : customTheme.primaryColor
              }
              passiveIconColor={
                this.state.emailError ? "rgb(176, 0, 32)" : "#a3a3a3"
              }
              iconSize={22}
              iconWidth={40}
              inputPadding={18}
              inputStyle={{
                color: "black",
                outline: "none",
              }}
              height={50}
              style={[
                styles.textInput,
                { marginTop: Platform.OS == "web" ? 80 : 50 },
              ]}
              autoCompleteType="off"
            />
            <HelperText
              type="error"
              style={styles.helperText}
              visible={this.state.emailError}
            >
              Email address is invalid!
            </HelperText>
            <Fumi
              label={"Password"}
              autoCapitalize={"none"}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={this.onChangePassword}
              error={this.state.passwordError}
              style={styles.textInput}
              onBlur={this.checkPassword}
              iconClass={FontAwesomeIcon}
              iconName={"key"}
              iconColor={
                this.state.passwordError
                  ? "rgb(176, 0, 32)"
                  : customTheme.primaryColor
              }
              passiveIconColor={
                this.state.passwordError ? "rgb(176, 0, 32)" : "#a3a3a3"
              }
              iconSize={22}
              iconWidth={40}
              inputPadding={18}
              height={50}
              inputStyle={{ color: "black", outline: "none" }}
              autoCompleteType="off"
            />
            <HelperText
              type="error"
              style={[styles.helperText, { marginBottom: 0 }]}
              visible={this.state.passwordError}
            >
              Password is invalid!
            </HelperText>

            <HelperText type="info" style={styles.forgotPasswordLink}>
              <Text onPress={this.onResetPress}>Forgot Password?</Text>
            </HelperText>

            {this.state.showError && (
              <Text style={styles.errorText}>
                Your email address or password is not correct
              </Text>
            )}
            <Button
              mode={"contained"}
              style={styles.loginButton}
              uppercase={false}
              labelStyle={{
                fontSize: 18,
              }}
              onPress={this.onLoginPress}
              compact={false}
            >
              Login
            </Button>

            <Text style={styles.termsAndConditionsText}>
              By continuing you agree to CHAMPS's{" "}
              <Text
                style={{ color: customTheme.linkColor }}
                onPress={() => {
                  Platform.OS === "web"
                    ? window.open("https://google.com", "_blank")
                    : Linking.openURL("https://google.com");
                }}
              >
                Terms of Use
              </Text>
            </Text>
          </ScrollView>
        </Card>
      </View>
    );
  }
}

const windowHeight = Dimensions.get("window").height;

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  logo: {
    minHeight: Platform.OS == "web" ? 100 : 50,
    alignSelf: "center",
    top: Platform.OS == "web" ? windowHeight / 8 : windowHeight / 10,
    width: Platform.OS == "web" ? 390 : windowWidth,
  },
  container: {
    flex: 1,
    marginTop: Platform.OS == "web" ? windowHeight / 4 : windowHeight / 5,
    alignSelf: "center",
    width: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: Platform.OS == "web" ? "space-evenly" : "space-evenly",
    marginTop: Platform.OS == "web" ? 40 : 20,
  },
  textInput: {
    marginHorizontal: Platform.OS == "web" ? "30%" : "10%",
    width: Platform.OS == "web" ? "40%" : "80%",
    borderRadius: 15,
    backgroundColor: "rgba(206,206,206, 0.3)",
    borderColor: "red",
  },
  errorText: {
    marginTop: 20,
    color: "rgb(176, 0, 32)",
    fontSize: 14,
    textAlign: "center",
  },
  helperText: {
    marginHorizontal: Platform.OS == "web" ? "30%" : "10%",
    width: Platform.OS == "web" ? "40%" : "80%",
    marginBottom: 10,
    fontWeight: "bold",
  },
  forgotPasswordLink: {
    marginHorizontal: Platform.OS == "web" ? "30%" : "10%",
    width: Platform.OS == "web" ? "40%" : "80%",
    textAlign: "right",
    fontSize: 15,
    color: customTheme.linkColor,
  },
  loginButton: {
    minWidth: Platform.OS == "web" ? 300 : 200,
    alignSelf: "center",
    marginTop: 60,
  },
  termsAndConditionsText: {
    textAlign: "center",
    marginTop: 45,
    color: "rgba(0,0,0,0.36)",
  },
  authNavButtonActive: {
    fontSize: 20,
    paddingBottom: 5,
  },
  authNavButtonInActive: {
    fontSize: 20,
    color: "#777",
  },
});
