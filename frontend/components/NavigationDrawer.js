// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
// this is the navigation drawer component
// contains route to different screens in the app
// this is the app wide navigation
// uses material icons for representation purposes

import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "../views/dashboard/Dashboard";
import Profile from "../views/profile/Profile";
import { MaterialIcons } from "@expo/vector-icons";
import { customTheme } from "../styles/Main";
import { WorkPackageNavigator } from "../views/work_package/WorkPackageNavigator";
import { LoginNavigator } from "../views/login/LoginNavigator";

const Drawer = createDrawerNavigator();

export default class NavigationDrawer extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Work Package"
          drawerContentOptions={{
            activeTintColor: customTheme.primaryColor,
            itemStyle: { marginHorizontal: 0 },
          }}
          backBehavior={"history"}
        >
          <Drawer.Screen
            name="Login"
            component={LoginNavigator}
            options={{
              title: "Login",
              drawerIcon: ({ focused, size }) => (
                <MaterialIcons name="dashboard" size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              title: "Dashboard",
              drawerIcon: ({ focused, size }) => (
                <MaterialIcons name="dashboard" size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{
              title: "Profile",
              drawerIcon: ({ focused, size }) => (
                <MaterialIcons name="account-circle" size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="Work Package"
            component={WorkPackageNavigator}
            initialParams={{ drawer: Drawer }}
            options={{
              title: "Work Package",
              drawerIcon: ({ focused, size }) => (
                <MaterialIcons name="work" size={size} />
              ),
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
