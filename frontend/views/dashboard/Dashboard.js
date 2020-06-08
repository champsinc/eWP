// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
import React from "react";
import { Text, View } from "react-native";
import AppBar from "./../../components/AppBar";

export default class Dashboard extends React.Component {
  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <View>
        <AppBar toggleNavBar={this.toggleNavBar} subTitle="Dashboard" />
        <View>
          <Text>Dashboard Screen</Text>
        </View>
      </View>
    );
  }
}
