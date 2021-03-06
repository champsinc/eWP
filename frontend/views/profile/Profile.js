// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
import React from "react";
import { View, StyleSheet, Platform, Dimensions, Text } from "react-native";
import { Button, Avatar, Card, TextInput } from "react-native-paper";
import AppBar from "./../../components/AppBar";
import { AuthContext } from "../../App";

export const SignOut = (props) => {
  const { signOut } = React.useContext(AuthContext);
  signOut(props);
  return null;
};

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: <View />,
      name: this.props.user.name,
      email: this.props.user.email,
      saveButtonDisabled: true,
    };
  }

  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  logout = () => {
    this.setState({
      logout: <SignOut navigation={this.props.navigation} />,
    });
  };

  extractInitialsFromName = (userName) => {
    return (
      userName.split(" ")[0][0].toUpperCase() +
      userName.split(" ").slice(-1)[0][0].toUpperCase()
    );
  };

  onChangeTextName = (name) => {
    this.setState({
      name,
      saveButtonDisabled:
        this.props.user.name == name &&
        this.props.user.email == this.state.email,
    });
  };

  onChangeTextEmail = (email) => {
    this.setState({
      email,
      saveButtonDisabled:
        this.props.user.email == email &&
        this.props.user.name == this.state.name,
    });
  };

  onTextInputFocus = () => {
    // Code to eliminate the outline for a textinput
    this.name.setNativeProps({
      style: {
        outline: "none",
      },
    });
    this.email.setNativeProps({
      style: {
        outline: "none",
      },
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.logout}
        <AppBar toggleNavBar={this.toggleNavBar} subTitle="Profile" />
        <View style={styles.cardContainer}>
          <Card style={styles.card} elevation={Platform.OS == "web" ? 5 : 10}>
            <Avatar.Text
              style={styles.avatar}
              label={this.extractInitialsFromName(this.props.user.name)}
              size={50}
            />
            <View style={styles.textButtonWrapper}>
              <View style={{justifyContent: "flex-start", marginRight: 20, alignItems: "flex-start"}}><Text style={styles.labelStyle}>Username:</Text></View>
              {/* <TextInput
                ref={(ref) => (this.name = ref)}
                style={styles.textInput}
                onFocus={this.onTextInputFocus}
                value={this.state.name}
                placeholder={"Username"}
                mode={"outlined"}
                onChangeText={this.onChangeTextName}
              /> */}
              <View>
                <Text style={styles.textValues}>{this.state.name}</Text>
              </View>
            </View>
            <View style={styles.textButtonWrapper}>
              <View style={{justifyContent: "flex-start", marginRight: 20, alignItems: "flex-start"}}><Text style={styles.labelStyle}>Email:</Text></View>
              {/* <TextInput
                ref={(ref) => (this.email = ref)}
                style={styles.textInput}
                onFocus={this.onTextInputFocus}
                placeholder={"Email"}
                mode={"outlined"}
                value={this.state.email}
                onChangeText={this.onChangeTextEmail}
              ></TextInput> */}
              <View><Text style={styles.textValues}>{this.state.email}</Text></View>
            </View>
            <View
              style={[
                styles.textButtonWrapper,
                { width: Platform.OS == "web" ? "75%" : "100%" },
              ]}
            >
              <Button
                uppercase={false}
                style={styles.saveButton}
                onPress={() => {}}
                labelStyle={styles.saveButtonText}
                disabled={this.state.saveButtonDisabled}
              >
                Save
              </Button>
              <Button
                uppercase={false}
                style={styles.logoutButton}
                onPress={this.logout}
                labelStyle={styles.logoutButtonText}
              >
                Logout
              </Button>
            </View>
          </Card>
        </View>
      </View>
    );
  }
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    paddingVertical: 20,
    width: Platform.OS == "web" ? windowWidth / 2 : "95%",
    minWidth: 220,
    alignSelf: "center",
    flexDirection: "row",
  },
  avatar: {
    alignSelf: "center",
  },
  textInput: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  textValues: {
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
  },
  labelStyle: {
    alignSelf: "center",
    fontSize: 16,
  },
  logoutButton: {
    alignSelf: "center",
    marginTop: 20,
  },
  saveButton: {
    alignSelf: "center",
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
  },
  logoutButtonText: {
    fontSize: 16,
  },
  textButtonWrapper: {
    flexDirection: "row",
    alignSelf: "center",
    width: Platform.OS == "web" ? "70%" : "100%",
    justifyContent: "center",
    padding: 30,
    // padding: 10,
  },
});
