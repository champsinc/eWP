import React from "react";
import { Login } from "./Login";
import { createStackNavigator } from "@react-navigation/stack";
import { SignUp } from "./SignUp";

let Stack = createStackNavigator();

export class LoginNavigator extends React.Component {
  constructor(props) {
    super(props);
    // Stack = this.props.route.params.drawer;
  }
  render() {
    return (
      <Stack.Navigator
        initialRouteName={"Login"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}
