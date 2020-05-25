// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
import React from "react";
import {Text, View} from "react-native";
import AppBar from "./../../components/AppBar";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  IconButton,
  Colors
} from 'react-native-paper';
import {GridCard} from "../../components/GridCard";

export default class WorkPackage extends React.Component {
  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  leftContent = props => <Avatar.Icon {...props} icon="folder"/>

  render() {
    return (
        <View>
          <AppBar
              toggleNavBar={this.toggleNavBar}
              subTitle="Work Package"
              searchPlaceHolder="Search in this work package"
          />
          <View>
            <GridCard icon={"information"} title={"General"}/>
          </View>
        </View>
    );
  }
}
