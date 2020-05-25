import * as React from "react";
import { View } from "react-native";
import DiscussionInputBox from "./DiscussionInputBox";

export default class DiscussionView extends React.Component {
  render() {
    return (
      <View>
        <DiscussionInputBox />
      </View>
    );
  }
}
