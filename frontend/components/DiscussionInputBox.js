import * as React from "react";
import { TextInput } from "react-native-paper";
import { View } from "react-native";
import { DiscussionButtonPanel } from "./DiscussionButtonPanel";

export default class MyComponent extends React.Component {
  state = {
    text: "",
  };

  render() {
    return (
      <View>
        <TextInput
          label="Your Message Here ... "
          value={this.state.text}
          onChangeText={(text) => this.setState({ text })}
          multiline={true}
          numberOfLines={4}
          mode="outlined"
          style={{ marginHorizontal: 10, marginBottom: 10 }}
        />
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <DiscussionButtonPanel />
        </View>
      </View>
    );
  }
}
