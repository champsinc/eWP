import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
  Linking,
  StatusBar,
  TouchableOpacityBase,
} from "react-native";
import { Button, HelperText, Card } from "react-native-paper";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Fumi } from "react-native-textinput-effects";
import { customTheme } from "../../styles/Main";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native";
import { util } from "../../assets/Utility";

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
    };
  }
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  initialState = {
    password: "",
    confirmPassword: "",
    passwordError: false,
    confirmPasswordError: false,
    showError: false,
    showSuccess: true,
  };

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
    let valid = true;
    !this.state.passwordError &&
    this.state.password != "" &&
    !this.state.confirmPasswordError &&
    this.state.confirmPassword != ""
      ? // TODO: Axios call and then check
        valid
        ? this.setState(this.initialState, () => {
            this.setState({ showError: false, showSuccess: true });
          })
        : this.setState({ showError: true, showSuccess: false })
      : "";
  };

  render() {
    return (
      <View style={styles.view}>
        <StatusBar barStyle="dark-content" backgroundColor="#f6f6f6" />
        <Image
          source={{ uri: util.logoURL }}
          style={styles.logo}
          width={windowWidth - 20}
          height={(windowWidth - 20) * 0.2566}
        />
        <Card style={styles.container} elevation={3}>
          <View style={styles.buttonContainer}>
            <Text style={styles.headingText}>Reset Password</Text>
            <Text style={{ color: "#fff" }}>Reset Passwword</Text>
          </View>
          <ScrollView>
            {/* <Text style={styles.questionText}>New Password</Text> */}
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
              iconName={"user"}
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

            {/* <Text style={styles.questionText}>New Password</Text> */}
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
              iconName={"user"}
              iconColor={
                this.state.confirmPasswordError
                  ? "rgb(176, 0, 32)"
                  : customTheme.primaryColor
              }
              passiveIconColor={
                this.state.confirmPasswordError ? "rgb(176, 0, 32)" : "#a3a3a3"
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

            {this.state.showError && (
              <Text style={styles.errorText}>
                The link doesn't seem to be valid or expired
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
    color: "#777",
    marginLeft: Platform.OS == "web" ? 35 : -15,
  },
  emailSentText: {
    // marginHorizontal: Platform.OS == "web" ? "30%" : "10%",
    // width: Platform.OS == "web" ? "40%" : "80%",
    textAlign: "center",
    fontSize: 14,
    color: customTheme.linkColor,
  },
  actionButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
