// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
import React from "react";
import { Text, View } from "react-native";
import AppBar from "./../../components/AppBar";

export default class Profile extends React.Component {
  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <View>
        <AppBar toggleNavBar={this.toggleNavBar} subTitle="Profile" />
        <View>
          <Text>Profile Screen</Text>
        </View>
      </View>
    );
  }
}
