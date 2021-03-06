import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Dimensions,
  StatusBar,
  Linking,
} from "react-native";
import { Button, HelperText, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Fumi } from "react-native-textinput-effects";
import { customTheme } from "../../styles/Main";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native";
import { util } from "../../assets/Utility";
import axios from "axios";

const SignIn = (props) => {
  const { signIn } = React.useContext(AuthContext);
  signIn(props);
  return <View />;
};

export class TwoFactorAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    code: "",
    codeError: false,
    showError: false,
    signIn: null,
  };

  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  onLoginPress = () => {
    this.checkCode();
    !this.state.codeError && this.state.code.trim() != ""
      ? axios
          .get(
            "http://ewpackage.gq:8080/api/user/activate?id=" + this.state.code,
            {
              headers: { api_key: util.api_key },
            }
          )
          .then((res) => {
            let user = res.user || { name: "raghul", id: "fhefejfgef54fe" };
            this.setState({
              signIn: (
                <SignIn
                  navigation={this.props.navigation}
                  token="dummy-token"
                  user={user}
                />
              ),
            });
          })
      : "";
    this.state.code.length < 6 || this.state.code == ""
      ? this.setState({ codeError: true })
      : this.setState({ codeError: false }, () => {
          // valid= axios.get().then((res=>res.data.valid))
          let valid = false;
          valid
            ? this.props.navigation.navigate("dashboard")
            : this.setState({
                showError: true,
              });
        });
  };

  onChangeCode = (code) => {
    code = code.replace(/[^0-9]/g, ""); // restrict non-numeric characters if the field type is number
    this.setState({
      code,
      showError: false,
    });
  };

  checkCode = () => {
    this.state.code.length < 6 || this.state.code == ""
      ? this.setState({ codeError: true })
      : this.setState({ codeError: false });
  };

  render() {
    let props = this.props.route.params;
    return (
      <View style={styles.view}>
        {this.state.signIn}
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
            <Text style={styles.headingText}>Two Step Verification</Text>
          </View>
          <ScrollView>
            <Text style={styles.questionText}>
              Please enter the code sent to {props.email}
            </Text>
            <Fumi
              label={"Code"}
              value={this.state.code}
              autoCapitalize={"none"}
              onChangeText={this.onChangeCode}
              keyboardType={Platform.OS == "web" ? "" : "numeric"}
              error={this.state.codeError}
              onBlur={this.checkCode}
              textBreakStrategy={"balanced"}
              iconClass={Icon}
              iconName={"numeric"}
              iconColor={
                this.state.codeError
                  ? "rgb(176, 0, 32)"
                  : customTheme.primaryColor
              }
              passiveIconColor={
                this.state.codeError ? "rgb(176, 0, 32)" : "#a3a3a3"
              }
              iconSize={22}
              iconWidth={40}
              inputPadding={18}
              inputStyle={{
                color: "black",
                outline: "none",
              }}
              height={50}
              maxLength={6}
              style={[
                styles.textInput,
                { marginTop: Platform.OS == "web" ? 20 : 15 },
              ]}
              autoCompleteType="off"
            />
            <HelperText
              type="error"
              style={styles.helperText}
              visible={this.state.codeError}
            >
              Please enter a valid code
            </HelperText>

            {this.state.showError && (
              <Text style={styles.errorText}>
                The code you entered is wrong.
              </Text>
            )}
            <View style={styles.actionButtonContainer}>
              <Button
                mode={"contained"}
                style={styles.loginButton}
                uppercase={false}
                labelStyle={{
                  fontSize: 18,
                }}
                onPress={() => this.props.navigation.navigate("login")}
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
                onPress={this.onLoginPress}
                compact={false}
              >
                Login
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
    fontWeight: "bold",
    color: "#777",
    textAlign: "center",
  },
  actionButtonContainer: {
    flexDirection: "row",
    justifyContent: Platform.OS == "web" ? "center" : "space-around",
  },
});
