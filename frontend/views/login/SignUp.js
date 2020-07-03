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
import axios from "axios";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Fumi } from "react-native-textinput-effects";
import { customTheme } from "../../styles/Main";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native";
import { util } from "../../assets/Utility";

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      showError: false,
      nameError: false,
      userNameError: false,
      emailError: false,
      passwordError: false,
      confirmPasswordError: false,
    };
  }

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  crendentials = [
    {
      email: "raghul.sathya@gmail.com",
      password: "abcd",
    },
  ];

  onLoginPress = () => {
    this.props.navigation.pop();
  };

  onSignUpPress = () => {
    this.checkName();
    this.checkUserName();
    this.checkEmailAddress();
    this.checkPassword();
    this.checkConfirmPassword();
    !this.state.nameError &&
    this.state.name != "" &&
    !this.state.userNameError &&
    this.state.userName != "" &&
    !this.state.emailError &&
    this.state.email != "" &&
    !this.state.passwordError &&
    this.state.password != "" &&
    !this.state.confirmPasswordError &&
    this.state.confirmPassword != ""
      ? axios.post("URL")
      : "";
  };

  onChangeName = (name) => {
    this.setState({
      name,
    });
  };

  onChangeUserName = (userName) => {
    this.setState({
      userName,
    });
  };

  onChangeEmail = (email) => {
    this.setState({
      email,
    });
  };

  onChangePassword = (password) => {
    this.setState({
      password,
    });
  };

  onChangeConfirmPassword = (confirmPassword) => {
    this.setState({
      confirmPassword,
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

  checkName = () => {
    this.state.name.length >= 8
      ? this.setState({
          nameError: false,
        })
      : this.setState({
          nameError: true,
        });
  };

  checkUserName = () => {
    this.state.userName.length >= 6
      ? this.setState({
          userNameError: false,
        })
      : this.setState({
          userNameError: true,
        });
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

  render() {
    return (
      <View style={styles.view}>
        <Image
          source={{ uri: util.logoURL }}
          style={styles.logo}
          width={windowWidth - 20}
          height={(windowWidth - 20) * 0.2566}
        />
        <Card style={styles.container} elevation={3}>
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.onLoginPress}
              mode={"text"}
              uppercase={false}
              compact={false}
              labelStyle={styles.authNavButtonInActive}
            >
              Login
            </Button>
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
              Register
            </Button>
          </View>

          <ScrollView>
            <Fumi
              label={"Name"}
              value={this.state.name}
              autoCapitalize={"words"}
              onChangeText={this.onChangeName}
              error={this.state.nameError}
              textBreakStrategy={"balanced"}
              onBlur={this.checkName}
              iconClass={FontAwesomeIcon}
              iconName={"user"}
              iconColor={
                this.state.nameError
                  ? "rgb(176, 0, 32)"
                  : customTheme.primaryColor
              }
              passiveIconColor={
                this.state.nameError ? "rgb(176, 0, 32)" : "#a3a3a3"
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
              visible={this.state.nameError}
            >
              Name should be atleast 4 characters!
            </HelperText>

            <Fumi
              label={"User Name"}
              value={this.state.userName}
              autoCapitalize={"none"}
              onChangeText={this.onChangeUserName}
              error={this.state.userNameError}
              textBreakStrategy={"balanced"}
              onBlur={this.checkUserName}
              iconClass={FontAwesomeIcon}
              iconName={"user"}
              iconColor={
                this.state.userNameError
                  ? "rgb(176, 0, 32)"
                  : customTheme.primaryColor
              }
              passiveIconColor={
                this.state.userNameError ? "rgb(176, 0, 32)" : "#a3a3a3"
              }
              iconSize={22}
              iconWidth={40}
              inputPadding={18}
              inputStyle={{
                color: "black",
                outline: "none",
              }}
              height={50}
              style={styles.textInput}
              autoCompleteType="off"
            />
            <HelperText
              type="error"
              style={styles.helperText}
              visible={this.state.userNameError}
            >
              User name is invalid!
            </HelperText>

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
              style={styles.textInput}
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

            <Fumi
              label={"Confirm Password"}
              autoCapitalize={"none"}
              secureTextEntry={true}
              value={this.state.confirmPassword}
              onChangeText={this.onChangeConfirmPassword}
              error={this.state.confirmPasswordError}
              style={styles.textInput}
              onBlur={this.checkConfirmPassword}
              iconClass={FontAwesomeIcon}
              iconName={"key"}
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
              height={50}
              inputStyle={{ color: "black", outline: "none" }}
              autoCompleteType="off"
            />
            <HelperText
              type="error"
              style={[styles.helperText, { marginBottom: 0 }]}
              visible={this.state.confirmPasswordError}
            >
              Passwords do not match!
            </HelperText>

            <Button
              mode={"contained"}
              style={styles.loginButton}
              uppercase={false}
              labelStyle={{
                fontSize: 18,
              }}
              onPress={this.onSignUpPress}
              compact={false}
            >
              Sign Up
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

      //       <Text style={styles.fieldName}>Name:</Text>
      //       <TextInput
      //         mode={"outlined"}
      //         value={this.state.name}
      //         autoCapitalize={"none"}
      //         onChangeText={this.onChangeName}
      //         error={this.state.nameError}
      //         style={styles.textInput}
      //         textBreakStrategy={"balanced"}
      //         onBlur={this.checkName}
      //         autoCompleteType="off"
      //       />
      //     </View>
      //     {this.state.nameError && (
      //       <View style={styles.oneRow}>
      //         <Text style={styles.errorText}>
      //           Name should be a minimum of 8 characters
      //         </Text>
      //       </View>
      //     )}
      //     <View style={styles.oneRow}>
      //       <Text style={styles.fieldName}>User Name:</Text>
      //       <TextInput
      //         mode={"outlined"}
      //         value={this.state.userName}
      //         autoCapitalize={"none"}
      //         onChangeText={this.onChangeUserName}
      //         error={this.state.userNameError}
      //         style={styles.textInput}
      //         textBreakStrategy={"balanced"}
      //         onBlur={this.checkUserName}
      //         autoCompleteType="off"
      //       />
      //     </View>
      //     {this.state.userNameError && (
      //       <View style={styles.oneRow}>
      //         <Text style={styles.errorText}>
      //           User Name should be a minimum of 6 characters
      //         </Text>
      //       </View>
      //     )}
      //     <View style={styles.oneRow}>
      //       <Text style={styles.fieldName}>Email:</Text>

      //       <TextInput
      //         mode={"outlined"}
      //         value={this.state.email}
      //         autoCapitalize={"none"}
      //         onChangeText={this.onChangeEmail}
      //         keyboardType={"email-address"}
      //         error={this.state.emailError}
      //         style={styles.textInput}
      //         textContentType={"emailAddress"}
      //         textBreakStrategy={"balanced"}
      //         onBlur={this.checkEmailAddress}
      //         autoCompleteType="off"
      //       />
      //     </View>
      //     {this.state.emailError && (
      //       <Text style={styles.errorText}>
      //         Please enter a vaild Email Address
      //       </Text>
      //     )}
      //     <View style={styles.oneRow}>
      //       <Text style={styles.fieldName}>Password:</Text>
      //       <TextInput
      //         mode={"outlined"}
      //         autoCapitalize={"none"}
      //         secureTextEntry={true}
      //         value={this.state.password}
      //         onChangeText={this.onChangePassword}
      //         error={this.state.passwordError}
      //         style={styles.textInput}
      //         onBlur={this.checkPassword}
      //         autoCompleteType="off"
      //       />
      //     </View>
      //     {this.state.passwordError && (
      //       <View>
      //         <Text style={styles.errorText}>
      //           Your Password does not match the requirements:
      //         </Text>
      //         <Text style={styles.errorText}>1. Atleast 8 characters</Text>
      //         <Text style={styles.errorText}>2. Atleast one number</Text>
      //         <Text style={styles.errorText}>
      //           3. Atleast one uppercase and one lower case
      //         </Text>
      //         <Text style={styles.errorText}>
      //           4. Atleast one special character
      //         </Text>
      //       </View>
      //     )}
      //     <View style={styles.oneRow}>
      //       <Text style={styles.fieldName}>Confirm Password:</Text>
      //       <TextInput
      //         mode={"outlined"}
      //         autoCapitalize={"none"}
      //         secureTextEntry={true}
      //         value={this.state.confirmPassword}
      //         onChangeText={this.onChangeConfirmPassword}
      //         error={this.state.confirmPasswordError}
      //         style={styles.textInput}
      //         onBlur={this.checkConfirmPassword}
      //         autoCompleteType="off"
      //       />
      //     </View>
      //     {!this.state.passwordError && this.state.confirmPasswordError && (
      //       <Text style={styles.errorText}>Passwords do not match</Text>
      //     )}

      //     <View style={styles.oneRow}>
      //       <Button onPress={this.onSignUpPress}>Sign Up</Button>
      //     </View>

      //     <View style={styles.oneRow}>
      //       <Text style={styles.newUserText}>Existing User?</Text>
      //       <Button onPress={this.onExistingPress}>Login</Button>
      //     </View>
      //   </View>
      // </View>
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

  // view: {
  //   flex: 1,
  // },
  // container: {
  //   marginTop: windowHeight / 4,
  // },
  // oneRow: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // fieldName: {
  //   alignSelf: "center",
  //   flex: Platform.OS == "web" ? 0.06 : 0.5,
  // },
  // textInput: {
  //   minWidth: 150,
  //   maxWidth: 250,
  // },
  // newUserText: {
  //   marginRight: 10,
  // },
  // errorText: {
  //   color: "red",
  //   fontSize: 16,
  //   textAlign: "center",
  // },
});
