import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { IconButton, ToggleButton } from "react-native-paper";
import { theme } from "./../styles/Main";
import FilePondModal from "./FilePondModal";

export default class DiscussionButtonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendAsRequestSelected: "unchecked",
      modalOpen: false,
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
          onPress={this.props.addMentionSymbol}
        />
        <ToggleButton
          icon="alpha-r-box-outline"
          size={22}
          color={theme.discussionPanelIconColor}
          status={this.state.sendAsRequestSelected}
          onPress={this.toggleSendAsRequestButton}
        />
        <IconButton
          icon={"send"}
          color={theme.discussionPanelIconColor}
          size={20}
          onPress={this.sendButtonPressed}
        />
        <FilePondModal
          modalOpen={this.state.modalOpen}
          onModalClose={this.onModalClose}
        />
      </View>
    );
  }

  onModalClose = () => {
    this.setState({
      modalOpen: false,
    });
  };

  attachButtonPressed = () => {
    this.setState({
      modalOpen: true,
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
      ? Number.isInteger(this.props.replyingToMessageIndex)
        ? this.props.appendThread({
            id: "6",
            type:
              this.state.sendAsRequestSelected == "checked"
                ? "request"
                : "text",
            text: this.props.text,
            user: "User 1",
            avatar: "Supervisor",
            left: false,
            time: this.getTime(),
          })
        : this.props.appendMessage({
            id: "6",
            type:
              this.state.sendAsRequestSelected == "checked"
                ? "request"
                : "text",
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
