import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
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
import { Link } from "@react-navigation/native";

export class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      passwordError: false,
      confirmPasswordError: false,
      showError: false,
      showSuccess: false,
      token:
        this.props.route.params && this.props.route.params.token
          ? this.props.route.params.token
          : "",
      tokenError: false,
    };
  }

  onChangePassword = (password) => {
    this.setState({ password });
  };

  onChangeConfirmPassword = (confirmPassword) => {
    this.setState({ confirmPassword });
  };

  checkPassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    passwordRegex.test(String(this.state.password))
      ? this.setState({
          passwordError: false,
        })
      : this.setState({
          passwordError: true,
        });
  };

  checkConfirmPassword = () => {
    this.state.passwordError
      ? this.setState({
          confirmPasswordError: false,
        })
      : this.state.password == this.state.confirmPassword
      ? this.setState({
          confirmPasswordError: false,
        })
      : this.setState({
          confirmPasswordError: true,
        });
  };

  onSendResetPress = () => {
    this.checkPassword();
    this.checkConfirmPassword();

    !this.state.passwordError &&
    this.state.password != "" &&
    !this.state.confirmPasswordError &&
    this.state.confirmPassword != ""
      ? axios
          .get(
            util.api_url +
              "/user/forgot_password_change?password=" +
              this.state.password +
              "&token=" +
              this.state.token,
            {
              headers: {
                api_key: util.api_key,
              },
            }
          )
          .then((res) => {
            console.log("in");
            this.setState({
              showSuccess: true,
            });
          })
          .catch((err) => {
            console.log("in");
            this.setState({
              tokenError: true,
            });
          })
      : "";
  };

  render() {
    return (
      <View style={styles.view}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={customTheme.loginStatusBarColor}
        />
        <Image
          source={{ uri: util.logoURL }}
          style={styles.logo}
          width={windowWidth - 20}
          height={(windowWidth - 20) * 0.2566}
        />
        <Card style={styles.container} elevation={3}>
          <View style={styles.buttonContainer}>
            <Text style={styles.headingText}>Reset Password</Text>
          </View>
          {this.state.token != "" ? (
            <ScrollView>
              <Fumi
                label={"New Password"}
                value={this.state.password}
                secureTextEntry={true}
                autoCapitalize={"none"}
                onChangeText={this.onChangePassword}
                error={this.state.passwordError}
                onBlur={this.checkPassword}
                textBreakStrategy={"balanced"}
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
                inputStyle={{
                  color: "black",
                  outline: "none",
                }}
                height={50}
                style={[
                  styles.textInput,
                  { marginTop: Platform.OS == "web" ? 40 : 35 },
                ]}
                autoCompleteType="off"
              />
              <HelperText
                type="error"
                style={styles.helperText}
                visible={this.state.passwordError}
              >
                Please enter a valid password!
              </HelperText>

              <Fumi
                label={"Confirm Password"}
                value={this.state.confirmPassword}
                autoCapitalize={"none"}
                secureTextEntry={true}
                onChangeText={this.onChangeConfirmPassword}
                error={this.state.confirmPasswordError}
                onBlur={this.checkConfirmPassword}
                textBreakStrategy={"balanced"}
                iconClass={FontAwesomeIcon}
                iconName={"key"}
                iconColor={
                  this.state.confirmPasswordError
                    ? "rgb(176, 0, 32)"
                    : customTheme.primaryColor
                }
                passiveIconColor={
                  this.state.confirmPasswordError
                    ? "rgb(176, 0, 32)"
                    : "#a3a3a3"
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
                  { marginTop: Platform.OS == "web" ? 20 : 15 },
                ]}
                autoCompleteType="off"
              />
              <HelperText
                type="error"
                style={styles.helperText}
                visible={this.state.confirmPasswordError}
              >
                Passwords don't match
              </HelperText>

              {this.state.tokenError && (
                <Text style={styles.errorText}>
                  This link doesn't seem to be valid or has expired
                </Text>
              )}
              {this.state.showSuccess && (
                <HelperText type="info" style={styles.emailSentText}>
                  Your password was successfully reset, Login now
                </HelperText>
              )}
              {this.state.showSuccess ? (
                <Button
                  mode={"contained"}
                  style={styles.loginButton}
                  uppercase={false}
                  labelStyle={{
                    fontSize: 18,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("Login");
                  }}
                  compact={false}
                >
                  Login
                </Button>
              ) : (
                <Button
                  mode={"contained"}
                  style={styles.loginButton}
                  uppercase={false}
                  labelStyle={{
                    fontSize: 18,
                  }}
                  onPress={this.onSendResetPress}
                  compact={false}
                >
                  Reset
                </Button>
              )}
            </ScrollView>
          ) : (
            <ScrollView>
              <Text style={styles.errorText}>
                It appears that you have a broken link, go to{" "}
                <Link to="/Login/Login" style={styles.Link}>
                  Login
                </Link>
              </Text>
            </ScrollView>
          )}
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
    marginTop: Platform.OS == "web" ? 40 : 20,
  },
  questionText: {
    fontSize: 16,
    marginHorizontal: Platform.OS == "web" ? "30%" : "10%",
    marginTop: Platform.OS == "web" ? 75 : 50,
  },
  textInput: {
    marginHorizontal: Platform.OS == "web" ? "30%" : "10%",
    width: Platform.OS == "web" ? "40%" : "80%",
    borderRadius: 15,
    backgroundColor: "rgba(206,206,206, 0.3)",
    borderColor: "red",
  },
  errorText: {
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
  loginButton: {
    minWidth: Platform.OS == "web" ? 300 : 200,
    alignSelf: "center",
    marginTop: 60,
  },
  headingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#777",
    textAlign: "center",
  },
  emailSentText: {
    textAlign: "center",
    fontSize: 14,
    color: customTheme.linkColor,
  },
  actionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  link: {
    fontSize: 15,
    color: customTheme.linkColor,
  },
});
