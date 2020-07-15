import React from "react";
import { Login } from "./Login";
import { createStackNavigator } from "@react-navigation/stack";
import { SignUp } from "./SignUp";
import { ResetPasswordGenerateLink } from "./ResetPasswordGenerateLink";
import { ResetPassword } from "./ResetPassword";
import { TwoFactorAuth } from "./TwoFactorAuth";
import { VerifyEmail } from "./VerifyEmail";

let Stack = createStackNavigator();

export class LoginNavigator extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Stack.Navigator
        initialRouteName={"login"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="sign_up"
          component={SignUp}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="reset_password"
          component={ResetPasswordGenerateLink}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="new_password"
          component={ResetPassword}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="two_step_verfication"
          component={TwoFactorAuth}
          options={{
            animationEnabled: false,
          }}
          initialParams={{ email: "none", password: "none" }}
        />
        <Stack.Screen
          name="verify_email"
          component={VerifyEmail}
          options={{
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}
