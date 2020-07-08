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
        <Stack.Screen
          name="Reset Password Generate Link"
          component={ResetPasswordGenerateLink}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="2 Factor Auth"
          component={TwoFactorAuth}
          options={{
            animationEnabled: false,
          }}
          initialParams={{ email: "none", password: "none" }}
        />
        <Stack.Screen
          name="Reset Password"
          component={ResetPassword}
          options={{
            animationEnabled: false,
          }}
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
