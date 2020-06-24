import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

export class WorkPackageUsers extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Button
          onPress={() => {
            this.props.navigation.navigate("Work Package");
          }}
        >
          Users
        </Button>
      </View>
    );
  }
}
