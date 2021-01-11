import React from "react";
import { WorkPackageUsers } from "./WorkPackageUsers";
import { WorkPackageView } from "../../views/work_package/WorkPackageView";
import { SectionView } from "./SectionView";
import { createStackNavigator } from "@react-navigation/stack";
import DiscussionView from "../discussion_section/DiscussionView";

let Stack = createStackNavigator();

export class WorkPackageNavigator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const WPV = props => (
      <WorkPackageView
              {...props}
              user={this.props.user}
              wpId={this.props.route.params ? this.props.route.params.id : null}
      />
    );
    const SV = props => (
      <SectionView {...props} user={this.props.user} />
    );
    const WPU = props => (
      <WorkPackageUsers {...props} user={this.props.user} />
    );
    const DV = props => (
      <DiscussionView {...props} user={this.props.user} />
    );
    return (
      <Stack.Navigator
        initialRouteName={"home"}
        screenOptions={{
          headerShown: false,
        }}
      >
        {/*
        component={(props) => (
          <WorkPackageView
            {...props}
            user={this.props.user}
            wpId={this.props.route.params ? this.props.route.params.id : null}
          />
        )}
        component={(props) => (
          <SectionView {...props} user={this.props.user} />
        )}
        component={(props) => (
          <WorkPackageUsers {...props} user={this.props.user} />
        )}
        component={(props) => (
          <DiscussionView {...props} user={this.props.user} />
        )}
        */}
        <Stack.Screen
          name="home"
          component = {WPV}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="section"
          component = {SV}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="work_package_users"
          component = {WPU}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="discussion_section"
          component = {DV}
          options={{
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}
