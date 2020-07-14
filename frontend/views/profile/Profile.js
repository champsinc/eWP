// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
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

  render() {
    return (
      <View>
        <AppBar toggleNavBar={this.toggleNavBar} subTitle="Profile" />
        <View>
          <Button onPress={this.logout}>Log Out</Button>
          {this.state.logout}
        </View>
      </View>
    );
  }
}
