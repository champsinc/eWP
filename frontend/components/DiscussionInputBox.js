import * as React from "react";
import { TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import DiscussionButtonPanel from "./DiscussionButtonPanel";

export default class DiscussionInputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }

  clearInputBox = () => {
    this.setState({
      text: "",
    });
  };

  render() {
    return (
      <View>
        <TextInput
          label="Your Message Here ... "
          value={this.state.text}
          onChangeText={(text) => this.setState({ text })}
          multiline={true}
          numberOfLines={3}
          mode="outlined"
          style={styles.textInput}
        />
        <View style={styles.discussionButtonPanel}>
          <DiscussionButtonPanel
            text={this.state.text.trim()}
            appendMessage={this.props.appendMessage}
            clearInputBox={this.clearInputBox}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  discussionButtonPanel: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
