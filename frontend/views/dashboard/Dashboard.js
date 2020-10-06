// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import AppBar from "./../../components/AppBar";
import { WorkPackageCard } from "../../components/WorkPackageCard";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";
import { util } from "../../assets/Utility";
import { useLinkTo } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

let workPackages = [
  {
    title: "Lockout Tagout",
    ewpNumber: "100",
    dateCreated: "05 Jan 2020",
    percentageComplete: 46,
    unopenedNotifications: false,
  },
  {
    title: "Kitchen Amendments",
    ewpNumber: "101",
    dateCreated: "14 Mar 2020",
    percentageComplete: 67,
    unopenedNotifications: true,
  },
  {
    title: "Architectural Re-design",
    ewpNumber: "102",
    dateCreated: "17 Feb 2020",
    percentageComplete: 94,
    unopenedNotifications: true,
  },
  {
    title: "Smart Lock Installation",
    ewpNumber: "103",
    dateCreated: "21 Jun 2020",
    percentageComplete: 78,
    unopenedNotifications: true,
  },
];

const NavigateTo = (props) => {
  const linkTo = useLinkTo();
  linkTo("/" + props.navigateTo);
  return <View />;
};

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      navigateTo: null,
      workPackages: null,
    };
    this.getData();
  }

  getData = () => {
    axios
      .get(util.api_url + "/user/wp/" + this.props.user.id, {
        headers: {
          api_key: util.api_key,
        },
      })
      .then((res) => {
        this.setState({
          workPackages: res.data,
        });
        this.goToURL();
      })
      .catch((res) => {
        this.goToURL();
      });
  };

  goToURL = () => {
    this.props.navigateTo
      ? this.setState({
          navigateTo: <NavigateTo navigateTo={this.props.navigateTo} />,
        })
      : "";
  };

  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  navigateToWorkPackage = (id, status) => {
    AsyncStorage.setItem("workPackageId", id.toString());
    this.props.navigation.navigate("work_package", {
      screen: "home",
      params: {
        id,
        status,
      },
    });
  };

  render() {
    return (
      <View style={styles.view}>
        {this.state.navigateTo}
        <AppBar toggleNavBar={this.toggleNavBar} subTitle="Dashboard" />
        <FlatList
          data={this.state.workPackages}
          renderItem={({ item }) => (
            <WorkPackageCard
              title={item.title}
              ewpNumber={item.id}
              dateCreated={item.dateCreated}
              status={item.status}
              percentageComplete={item.percentageComplete}
              navigateToWorkPackage={() =>
                this.navigateToWorkPackage(item.id, item.status)
              }
              unopenedLogs={item.unopenedLogs || true}
              unopenedNotifications={item.unopenedNotifications || false}
            />
          )}
          numColumns={1}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});
