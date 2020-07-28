// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
import React from "react";
import { View, StyleSheet, Platform, Dimensions, Text } from "react-native";
import { Button, Avatar, Card } from "react-native-paper";
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
            <Text style={styles.text}>{this.props.user.name}</Text>
            <Button
              uppercase={false}
              style={styles.logoutButton}
              onPress={this.logout}
              labelStyle={styles.logoutButtonText}
            >
              Logout
            </Button>
          </Card>
        </View>
      </View>
    );
  }
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    paddingVertical: 20,
    width: "25%",
    minWidth: 220,
    alignSelf: "center",
  },
  avatar: {
    alignSelf: "center",
  },
  text: {
    alignSelf: "center",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    fontSize: 16,
  },
});
