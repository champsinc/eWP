import React from "react";
import { WorkPackageUsers } from "./WorkPackageUsers";
import { WorkPackageView } from "../../views/work_package/WorkPackageView";
import { createStackNavigator } from "@react-navigation/stack";

let Stack = createStackNavigator();

export class WorkPackageNavigator extends React.Component {
  constructor(props) {
    super(props);
    // console.log(this.props.route.params.id);
  }

  render() {
    return (
      <Stack.Navigator
        initialRouteName={"work_package_view"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="work_package_view"
          component={(props) => (
            <WorkPackageView
              {...props}
              user={this.props.user}
              wpId={this.props.route.params ? this.props.route.params.id : null}
            />
          )}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="work_package_users"
          component={(props) => (
            <WorkPackageUsers {...props} user={this.props.user} />
          )}
          options={{
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}
