import React from "react";
import { View, StyleSheet, TouchableWithoutFeedbackBase } from "react-native";
import { IconButton, ToggleButton } from "react-native-paper";
import { theme } from "./../styles/Main";
import * as DocumentPicker from "expo-document-picker";
import { getLightEstimationEnabled } from "expo/build/AR";

export default class DiscussionButtonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendAsRequestSelected: "unchecked",
    };
  }

  render() {
    return (
      <View style={styles.discussionButtonPanelView}>
        <IconButton
          icon={"attachment"}
          color={theme.discussionPanelIconColor}
          size={20}
          onPress={this.attachButtonPressed}
        />
        <IconButton
          icon={"at"}
          color={theme.discussionPanelIconColor}
          size={20}
          onPress={() => console.log("DiscussionButtonPanel.js:19 Pressed")}
        />
        <ToggleButton
          icon="alpha-r-box-outline"
          color={theme.discussionPanelIconColor}
          status={this.state.sendAsRequestSelected}
          onPress={this.toggleSendAsRequestButton}
        />
        {/* <IconButton
        icon={"alpha-r-box-outline"}
        color={theme.discussionPanelIconColor}
        size={20}
        onPress={() => changeStyle()}
        style={styles.none}
        ref={sendAsRequestIcon}
      /> */}
        <IconButton
          icon={"send"}
          color={theme.discussionPanelIconColor}
          size={20}
          onPress={this.sendButtonPressed}
        />
      </View>
    );
  }

  attachButtonPressed = () => {
    DocumentPicker.getDocumentAsync({}).then((res) => {
      console.log(res.file.name);
      this.props.appendMessage({
        id: "6",
        type: "attachment",
        fileName: res.file.name,
        user: "User 1",
        avatar: "Supervisor",
        left: false,
        time: this.getTime(),
      });
    });
  };
  getTime = () => {
    let date = new Date();
    let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours(); //Current Hours
    hours = hours < 10 ? "0" + hours : hours;
    let min = date.getMinutes(); //Current Minutes
    min = min < 10 ? "0" + min : min;
    let AMPM = date.getHours() > 12 ? "PM" : "AM";
    return hours + ":" + min + " " + AMPM;
  };

  toggleSendAsRequestButton = () => {
    this.setState({
      sendAsRequestSelected:
        this.state.sendAsRequestSelected === "checked"
          ? "unchecked"
          : "checked",
    });
  };

  sendButtonPressed = () => {
    this.state.sendAsRequestSelected == "checked"
      ? this.toggleSendAsRequestButton()
      : "";
    this.props.clearInputBox();
    this.props.text.length > 0
      ? this.props.appendMessage({
          id: "6",
          type:
            this.state.sendAsRequestSelected == "checked" ? "request" : "text",
          text: this.props.text,
          user: "User 1",
          avatar: "Supervisor",
          left: false,
          time: this.getTime(),
        })
      : "";
  };
}

const styles = StyleSheet.create({
  discussionButtonPanelView: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: "#c7c7c7",
    borderStyle: "solid",
    borderWidth: 1,
  },
});
