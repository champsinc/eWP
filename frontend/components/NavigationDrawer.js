// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
// this is the navigation drawer component
// contains route to different screens in the app
// this is the app wide navigation
// uses material icons for representation purposes

import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "./../views/dashboard/Dashboard";
import Profile from "./../views/profile/Profile";
import WorkPackage from "./../views/work_package/WorkPackage";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../styles/Main";
import SafeAreaView from "react-native-safe-area-view";

const Drawer = createDrawerNavigator();

export default class NavigationDrawer extends React.Component {
  render() {
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={{ flex: 1 }}
      >
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Dashboard "
            drawerStyle={{
              backgroundColor: theme.backgroundColor,
              activeBackgroundColor: theme.primaryColor,
            }}
            drawerContentOptions={{
              activeTintColor: theme.primaryColor,
              itemStyle: { marginHorizontal: 0 },
            }}
          >
            <Drawer.Screen
              name="Dashboard "
              component={Dashboard}
              options={{
                title: "Dashboard ",
                drawerIcon: ({ focused, size }) => (
                  <MaterialIcons
                    name="dashboard"
                    size={size}
                    color={focused ? theme.primaryColor : theme.offFocusColor}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Profile"
              component={Profile}
              options={{
                title: "Profile",
                drawerIcon: ({ focused, size }) => (
                  <MaterialIcons
                    name="account-circle"
                    size={size}
                    color={focused ? theme.primaryColor : theme.offFocusColor}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Work Package"
              component={WorkPackage}
              options={{
                title: "Work Package",
                drawerIcon: ({ focused, size }) => (
                  <MaterialIcons
                    name="work"
                    size={size}
                    color={focused ? theme.primaryColor : theme.offFocusColor}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}
