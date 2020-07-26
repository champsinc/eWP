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
    // console.log(this.props.route.params.id);
  }

  render() {
    return (
      <Stack.Navigator
        initialRouteName={"home"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="home"
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
          name="section"
          component={(props) => (
            <SectionView {...props} user={this.props.user} />
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
        <Stack.Screen
          name="discussion_section"
          component={(props) => (
            <DiscussionView {...props} user={this.props.user} />
          )}
          options={{
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
    );
  }
}
