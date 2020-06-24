// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import AppBar from "./../../components/AppBar";
import { WorkPackageCard } from "../../components/WorkPackageCard";
import { FlatList } from "react-native-gesture-handler";

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

export default class Dashboard extends React.Component {
  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <View style={styles.view}>
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
                this.props.navigation.navigate("Work Package")
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
