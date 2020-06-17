import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { WorkPackageView } from "./WorkPackageView";
import { SectionView } from "./SectionView";

const Stack = createStackNavigator();

export const WorkPackageNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Work Package">
      <Stack.Screen name="Work Package" component={WorkPackageView} />
      <Stack.Screen name="Section" component={SectionView} />
    </Stack.Navigator>
  );
};
