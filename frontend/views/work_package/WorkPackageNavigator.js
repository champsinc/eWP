import React from "react";
import { WorkPackageUsers } from "./WorkPackageUsers";
import { WorkPackageView } from "../../views/work_package/WorkPackageView";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

let Stack = createStackNavigator();
export class WorkPackageNavigator extends React.Component {
  constructor(props) {
    super(props);
    // Stack = this.props.route.params.drawer;
  }
  render() {
    return (
      <Stack.Navigator
        initialRouteName={"Work Package"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Work Package" component={WorkPackageView} />
        <Stack.Screen name="Work Package Users" component={WorkPackageUsers} />
      </Stack.Navigator>
    );
  }
}
