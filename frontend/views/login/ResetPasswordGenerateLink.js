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

export class ResetPasswordGenerateLink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: false,
      showError: false,
      showSent: false,
      showSent: false,
    };
  }
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  onChangeEmail = (email) => {
    this.setState({ email, showError: false, showSent: false });
  };

  checkEmail = () => {
    this.emailRegex.test(String(this.state.email))
      ? this.setState({
          emailError: false,
        })
      : this.setState({
          emailError: true,
        });
  };

  onSendResetPress = () => {
    // TODO: Axios call and then check
    this.checkEmail();
    let valid = true; //whether this email belongs in our system
    !this.state.emailError && this.state.email.trim() != ""
      ? valid
        ? this.setState({ showError: false, showSent: true })
        : this.setState({ showError: true, showSent: false })
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
            <Text style={styles.questionText}>
              Enter the email address you wish to reset the password for
            </Text>
            <Fumi
              label={"Email"}
              value={this.state.email}
              autoCapitalize={"none"}
              onChangeText={this.onChangeEmail}
              error={this.state.emailError}
              keyboardType={"email-address"}
              textContentType={"emailAddress"}
              onBlur={this.checkEmail}
              textBreakStrategy={"balanced"}
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
                { marginTop: Platform.OS == "web" ? 20 : 15 },
              ]}
              autoCompleteType="off"
            />
            <HelperText
              type="error"
              style={styles.helperText}
              visible={this.state.emailError}
            >
              Please enter a valid email address
            </HelperText>

            {this.state.showError && (
              <Text style={styles.errorText}>
                The email address you provided doesn't seem to be resgistered on
                our system
              </Text>
            )}
            {this.state.showSent && (
              <HelperText type="info" style={styles.emailSentText}>
                An Email with the reset link has been sent to {this.state.email}
              </HelperText>
            )}
            <View style={styles.actionButtonContainer}>
              <Button
                mode={"contained"}
                style={styles.loginButton}
                uppercase={false}
                labelStyle={{
                  fontSize: 18,
                }}
                onPress={() => this.props.navigation.pop()}
                compact={false}
              >
                Back
              </Button>
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
                Send Reset Link
              </Button>
            </View>
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
    minWidth: 150,
    alignSelf: "center",
    marginTop: 60,
    marginRight: Platform.OS == "web" ? 35 : 0,
  },
  headingText: {
    fontSize: 22,
    color: "#777",
    marginLeft: Platform.OS == "web" ? 35 : -15,
  },
  emailSentText: {
    textAlign: "center",
    fontSize: 14,
    color: customTheme.linkColor,
  },
  actionButtonContainer: {
    flexDirection: "row",
    justifyContent: Platform.OS == "web" ? "center" : "space-around",
  },
});
