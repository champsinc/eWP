// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
import React from "react";
import { Text, View } from "react-native";
import AppBar from "./../../components/app_bar/AppBar";

export default class Dashboard extends React.Component {
  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <View>
        <AppBar
          toggleNavBar={this.toggleNavBar}
          subTitle="Work Package"
          searchPlaceHolder="Search in this work package"
        />
        <View>
          <Text>Work Package Screen</Text>
        </View>
      </View>
    );
  }
}
