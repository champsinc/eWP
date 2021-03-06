import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { customTheme, monthNames } from "../styles/Main";
import { Dimensions } from "react-native";

const activeTouchOpacity = 0.6;

export default class ChatBubble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar:
        this.props.message.avatarURL.toString().length > 0 ? (
          <Avatar.Image
            size={22}
            source={{ uri: this.props.message.avatarURL }}
            style={styles.avatar}
          />
        ) : (
          <Avatar.Text
            size={28}
            label={this.extractInitialsFromName(this.props.message.senderName)}
            style={styles.avatar}
          />
        ),
    };
  }

  extractInitialsFromName = (userName) => {
    return (
      userName.split(" ")[0][0].toUpperCase() +
      userName.split(" ").slice(-1)[0][0].toUpperCase()
    );
  };

  getFormattedTime = () => {
    const date = new Date(this.props.message.timestamp);
    const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const timeOfTheDay = date.getHours() < 12 ? " AM" : " PM";
    return hours + ":" + minutes + timeOfTheDay;
  };

  getTimeForThread = () => {
    const parentMessageDate = new Date(this.props.parentMessage.timestamp);
    const threadMessageDate = new Date(this.props.message.timestamp);
    return parentMessageDate.getMonth() != threadMessageDate.getMonth() ||
      parentMessageDate.getDate() != threadMessageDate.getDate()
      ? monthNames[threadMessageDate.getMonth()] +
          " " +
          threadMessageDate.getDate() +
          " at " +
          this.getFormattedTime()
      : this.getFormattedTime();
  };

  render() {
    return !this.props.parentMessage ? ( // if the chat message is a parent message and not one of the thread messages
      <View style={styles.topLevelView}>
        {this.props.message.senderUserId != this.props.user.id && ( // if the message needs to be on the left or the right in the screen
          <View
            style={[styles.avatarWithChat, { justifyContent: "flex-start" }]} //styles to display the chatbubble on the left
          >
            {this.state.avatar}
            <View style={[styles.balloon, { marginRight: 3 }]}>
              <Text style={styles.senderNameText}>
                {this.props.message.senderName}
              </Text>
              <Text style={styles.itemIn}>{this.props.message.value}</Text>
              <Text style={styles.time}>{this.getFormattedTime()}</Text>
            </View>
            <IconButton
              icon={"reply"}
              color={customTheme.discussionPanelIconColor}
              size={25}
              style={styles.replyButton}
              onPress={() => this.props.setReplyingTo(this.props.messageIndex)}
            />
          </View>
        )}
        {this.props.message.senderUserId == this.props.user.id && (
          <View
            style={[styles.avatarWithChat, { justifyContent: "flex-end" }]} // styles to display the chatbubble on the right
          >
            <IconButton
              icon={"reply"}
              color={customTheme.discussionPanelIconColor}
              size={25}
              style={styles.replyButton}
              onPress={() => this.props.setReplyingTo(this.props.messageIndex)}
            />
            <View style={[styles.balloon, { marginLeft: 3 }]}>
              <Text style={styles.senderNameText}>
                {this.props.message.senderName}
              </Text>
              <Text style={styles.itemIn}>{this.props.message.value}</Text>
              <Text style={styles.time}>{this.getFormattedTime()}</Text>
            </View>
            {this.state.avatar}
          </View>
        )}
      </View>
    ) : (
      <View>
        {this.props.parentMessage.senderUserId != this.props.user.id && (
          <View
            style={[
              styles.avatarWithChat,
              styles.threadTopViewLeft,
              { justifyContent: "flex-start" },
            ]} // styles to display the chatbubble thread on the left
          >
            <TouchableOpacity
              onLongPress={() =>
                this.props.setReplyingTo(this.props.messageIndex)
              }
              activeOpacity={activeTouchOpacity}
            >
              <View style={[styles.balloon, styles.balloonThread]}>
                <Text style={styles.senderNameText}>
                  {this.props.message.senderName}
                </Text>
                <Text style={styles.itemIn}>{this.props.message.value}</Text>
                <Text style={styles.time}>{this.getTimeForThread()}</Text>
              </View>
            </TouchableOpacity>
            {this.state.avatar}
          </View>
        )}
        {this.props.parentMessage.senderUserId == this.props.user.id && (
          <View
            style={[
              styles.avatarWithChat,
              styles.threadTopViewRight,
              { justifyContent: "flex-end" },
            ]} // styles to display the chatbubble thread on the right
          >
            {this.state.avatar}
            <TouchableOpacity
              onLongPress={() =>
                this.props.setReplyingTo(this.props.messageIndex)
              }
              activeOpacity={activeTouchOpacity}
            >
              <View style={[styles.balloon, styles.balloonThread]}>
                <Text style={styles.senderNameText}>
                  {this.props.message.senderName}
                </Text>
                <Text style={styles.itemIn}>{this.props.message.value}</Text>
                <Text style={styles.time}>{this.getTimeForThread()}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const windowWidth = Dimensions.get("window").width;

const constants = {
  paddingHorizontal: 10,
  paddingTop: 5,
  paddingBottom: 8,
  borderRadius: 20,
  margin: 5,
  minWidth: 100,
};

const styles = StyleSheet.create({
  itemIn: {
    paddingTop: 3,
    color: "white",
  },
  senderNameText: {
    color: "white",
    paddingTop: 5,
    fontSize: 12,
  },
  balloon: {
    maxWidth: windowWidth / 2.2,
    paddingHorizontal: constants.paddingHorizontal,
    paddingTop: constants.paddingTop,
    paddingBottom: constants.paddingBottom,
    borderRadius: constants.borderRadius,
    margin: constants.margin,
    minWidth: constants.minWidth,
    backgroundColor: customTheme.primaryColor,
  },
  balloonThread: {
    maxWidth: windowWidth / 2.4,
    minWidth: constants.minWidth,
  },
  avatar: {
    alignSelf: "center",
  },
  avatarWithChat: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  time: {
    color: customTheme.timeColorInChatBubble,
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 3,
    fontSize: 10.25,
  },
  replyButton: {
    margin: 0,
    flexDirection: "column",
    alignSelf: "center",
  },
  threadTopViewLeft: {
    marginLeft: 40,
    paddingLeft: 10,
    borderLeftWidth: 1.67,
    borderLeftColor: customTheme.threadColorInDiscussionSection,
  },
  threadTopViewRight: {
    marginRight: 40,
    paddingRight: 10,
    borderRightWidth: 1.67,
    borderRightColor: customTheme.threadColorInDiscussionSection,
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#2196F3",
  },
  buttonText: {
    textAlign: "center",
    padding: 20,
    color: "white",
  },
});
