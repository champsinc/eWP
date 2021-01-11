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
import { FontAwesome5 } from "@expo/vector-icons";
import { customTheme } from "../styles/Main";
import { WorkPackageNavigator } from "../views/work_package/WorkPackageNavigator";
import { LoginNavigator } from "../views/login/LoginNavigator";
import { UserManagement } from "../views/user_management/UserManagement";

const linking = {
  prefixes: ["/"],
};

const Drawer = createDrawerNavigator();

export default class NavigationDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const DASH = props => (
      <Dashboard
        {...props}
        user={this.props.user}
        navigateTo={this.props.navigateTo || null}
      />
    );
    const PROF = props => (
      <Profile {...props} user={this.props.user} />
    );
    const WP = props => (
      <WorkPackageNavigator {...props} user={this.props.user} />
    );
    const UM = props => (
      <UserManagement {...props} user={this.props.user} />
    );
    return (
      <NavigationContainer linking={linking}>
        <Drawer.Navigator
          initialRouteName={this.props.userToken == null ? "auth" : "dashboard"}
          drawerContentOptions={{
            activeTintColor: customTheme.primaryColor,
            itemStyle: { marginHorizontal: 0 },
          }}
          backBehavior={"history"}
        >
          {/*
            component={(props) => (
              <Dashboard
                {...props}
                user={this.props.user}
                navigateTo={this.props.navigateTo || null}
              />
            )}
            component={(props) => (
              <Profile {...props} user={this.props.user} />
            )}
            component={(props) => (
              <WorkPackageNavigator {...props} user={this.props.user} />
            )}
            component={(props) => (
              <UserManagement {...props} user={this.props.user} />
            )}
          */}
          {!this.props.userToken && (
            <Drawer.Screen
              name="auth"
              component={LoginNavigator}
              options={{
                title: null,
                drawerLabel: () => null,
                drawerIcon: () => null,
              }}
            />
          )}

          {this.props.userToken && (
            <Drawer.Screen
              name="dashboard"
              component={DASH}
              options={{
                title: "Dashboard",
                drawerIcon: ({ focused, size }) => (
                  <MaterialIcons name="dashboard" size={size} />
                ),
              }}
            />
          )}
          {this.props.userToken && (
            <Drawer.Screen
              name="profile"
              component = {PROF}
              options={{
                title: "Profile",
                drawerIcon: ({ focused, size }) => (
                  <FontAwesome5 name="user-circle" size={size} />
                ),
              }}
            />
          )}
          {this.props.userToken && (
            <Drawer.Screen
              name="work_package"
              component = {WP}
              options={{
                title: "Work Package",
                drawerIcon: ({ focused, size }) => (
                  <FontAwesome5 name="briefcase" size={size} />
                ),
              }}
            />
          )}
          {this.props.userToken && (
            <Drawer.Screen
              name="user_management"
              component = {UM}
              options={{
                title: "User Management",
                drawerIcon: ({ focused, size }) => (
                  <FontAwesome5 name="users" size={size} />
                ),
              }}
            />
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
