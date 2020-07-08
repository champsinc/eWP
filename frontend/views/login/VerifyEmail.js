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

export class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:
        (this.props.route.params && this.props.route.params.id) ||
        "Invalid URL",
      email: "",
      emailError: false,
      showError: false,
      showSent: false,
      showSent: false,
      verifySuccess: false,
      verifyFail: false,
    };
    this.props.route.params && this.props.route.params.id
      ? axios
          .get(util.api_url + "/user/activate?id=" + this.state.id, {
            headers: {
              api_key: util.api_key,
            },
          })
          .then((res) => {
            this.setState({
              verifySuccess: true,
            });
          })
          .catch((error) => {
            this.setState({
              verifyFail: true,
            });
          })
      : "";
  }

  render() {
    return (
      <View style={styles.view}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={customTheme.loginColor}
        />
        <Image
          source={{ uri: util.logoURL }}
          style={styles.logo}
          width={windowWidth - 20}
          height={(windowWidth - 20) * 0.2566}
        />
        <Card style={styles.container} elevation={3}>
          <View style={styles.buttonContainer}>
            <Text style={styles.headingText}>Verify Email</Text>
          </View>
          <ScrollView>
            {this.state.id == "Invalid URL" ? (
              <Text style={styles.errorText}>Invalid URL</Text>
            ) : this.state.verifySuccess ? (
              <Text style={styles.infoText}>
                Your email address has been successfully activated, you can
                login now
              </Text>
            ) : this.state.verifyFail ? (
              <Text style={styles.errorText}>Invalid URL</Text>
            ) : (
              <View />
            )}

            {this.state.verifySuccess && (
              <View style={styles.actionButtonContainer}>
                <Button
                  mode={"contained"}
                  style={styles.loginButton}
                  uppercase={false}
                  labelStyle={{
                    fontSize: 18,
                  }}
                  onPress={() => this.props.navigation.navigate("Login")}
                  compact={false}
                >
                  Login
                </Button>
              </View>
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
    marginTop: Platform.OS == "web" ? 75 : 50,
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
    fontWeight: "bold",
    textAlign: "center",
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
  infoText: {
    textAlign: "center",
    fontSize: 14,
    color: customTheme.linkColor,
    marginTop: Platform.OS == "web" ? 75 : 50,
  },
});
