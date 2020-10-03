import React from "react";
import { View, StyleSheet, Image, Text, Platform } from "react-native";
import { IconButton, ToggleButton } from "react-native-paper";
import { customTheme } from "../../styles/Main";
import FilePondModal from "../../components/FilePondModal";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY } from "expo-secure-store";
import axios from "axios";
import { util } from "../../assets/Utility";

export default class DiscussionButtonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendAsRequestSelected: "unchecked",
      modalOpen: false,
      uri: "",
    };
  }

  render() {
    return (
      <View style={styles.discussionButtonPanelView}>
        <IconButton
          icon={"attachment"}
          color={customTheme.discussionPanelIconColor}
          size={20}
          onPress={this.attachButtonPressed}
        />
        <IconButton
          icon={"at"}
          color={customTheme.discussionPanelIconColor}
          size={20}
          onPress={this.props.addMentionSymbol}
        />
        <ToggleButton
          icon="alpha-r-box-outline"
          size={22}
          color={customTheme.discussionPanelIconColor}
          status={this.state.sendAsRequestSelected}
          onPress={this.toggleSendAsRequestButton}
        />
        <IconButton
          icon={"send"}
          color={customTheme.discussionPanelIconColor}
          size={20}
          onPress={this.sendButtonPressed}
        />
        {this.state.uri != "" && <Text> **Hi** {this.state.uri}</Text>}
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

  attachButtonPressed = async (document) => {
    this.setState({});
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
    let value = this.props.text;
    this.props.clearInputBox();
    this.props.text.length > 0
      ? Number.isInteger(this.props.replyingToMessageIndex)
        ? axios
            .post(
              util.api_url + "/discuss/insert",
              {
                type:
                  this.state.sendAsRequestSelected == "checked"
                    ? "request"
                    : "text",
                value,
                senderName: this.props.user.name,
                senderUserId: this.props.user.id,
                avatarURL: this.props.user.avatar || "",
                wpId: this.props.wpId,
                parentDI: this.props.messages[this.props.replyingToMessageIndex]
                  .id,
              },
              {
                headers: {
                  api_key: util.api_key,
                },
              }
            )
            .then((res) => {
              this.props.appendThread({
                type:
                  this.state.sendAsRequestSelected == "checked"
                    ? "request"
                    : "text",
                id: res.data.Success,
                value,
                threads: [],
                senderName: this.props.user.name,
                senderUserId: this.props.user.id,
                avatarURL: this.props.user.avatar || "",
                wpId: this.props.wpId,
                timestamp: new Date(),
              });
            })
        : axios
            .post(
              util.api_url + "/discuss/insert",
              {
                type:
                  this.state.sendAsRequestSelected == "checked"
                    ? "request"
                    : "text",
                value,
                senderName: this.props.user.name,
                senderUserId: this.props.user.id,
                avatarURL: this.props.user.avatar || "",
                wpId: this.props.wpId,
              },
              {
                headers: {
                  api_key: util.api_key,
                },
              }
            )
            .then((res) => {
              this.props.appendMessage({
                id: res.data.Success,
                type:
                  this.state.sendAsRequestSelected == "checked"
                    ? "request"
                    : "text",
                value,
                threads: [],
                senderName: this.props.user.name,
                senderUserId: this.props.user.id,
                timestamp: new Date(),
                avatarURL: this.props.user.avatar || "",
                wpId: this.props.wpId,
              });
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
    borderColor: customTheme.borderColorInDiscussionSection,
    borderStyle: "solid",
    borderWidth: 1,
  },
});
