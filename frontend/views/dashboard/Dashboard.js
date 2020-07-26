// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import AppBar from "./../../components/AppBar";
import { WorkPackageCard } from "../../components/WorkPackageCard";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";
import { util } from "../../assets/Utility";
import { useLinkTo } from "@react-navigation/native";

let workPackages = [
  {
    title: "Lockout Tagout",
    ewpNumber: "100",
    dateCreated: "05 Jan 2020",
    percentageComplete: 46,
    unopenedLogs: true,
    unopenedNotifications: false,
  },
  {
    title: "Kitchen Amendments",
    ewpNumber: "101",
    dateCreated: "14 Mar 2020",
    percentageComplete: 67,
    unopenedLogs: false,
    unopenedNotifications: true,
  },
  {
    title: "Architectural Re-design",
    ewpNumber: "102",
    dateCreated: "17 Feb 2020",
    percentageComplete: 94,
    unopenedLogs: true,
    unopenedNotifications: true,
  },
  {
    title: "Smart Lock Installation",
    ewpNumber: "103",
    dateCreated: "21 Jun 2020",
    percentageComplete: 78,
    unopenedLogs: true,
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
    };
    axios
      .get(util.api_url + "/user/wp?userId=" + this.props.user.id, {
        headers: {
          api_key: util.api_key,
        },
      })
      .then((res) => {
        //TODO: get the data from the backend and display it in cards
        console.log(res);
      })
      .catch((res) => {
        this.goToURL();
        console.log(res);
      });
  }

  goToURL = () => {
    console.log(this.props.navigateTo);
    this.props.navigateTo
      ? this.setState({
          navigateTo: <NavigateTo navigateTo={this.props.navigateTo} />,
        })
      : "";
  };

  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  navigateToWorkPackage = (id) => {
    this.props.navigation.navigate("work_package", {
      id,
    });
  };

  render() {
    return (
      <View style={styles.view}>
        {this.state.navigateTo}
        <AppBar toggleNavBar={this.toggleNavBar} subTitle="Dashboard" />
        <FlatList
          data={workPackages}
          renderItem={({ item }) => (
            <WorkPackageCard
              title={item.title}
              ewpNumber={item.ewpNumber}
              dateCreated={item.dateCreated}
              percentageComplete={item.percentageComplete}
              navigateToWorkPackage={() =>
                this.navigateToWorkPackage(item.ewpNumber)
              }
              unopenedLogs={item.unopenedLogs}
              unopenedNotifications={item.unopenedNotifications}
            />
          )}
          numColumns={1}
          keyExtractor={(item) => item.ewpNumber}
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
