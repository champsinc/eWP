import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { theme } from "../styles/Main";
import { Dimensions } from "react-native";

export default class ChatBubble extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return !this.props.parentMessage ? ( // if the chat message is a parent message and not one of the thread messages
      <View style={styles.topLevelView}>
        {this.props.message.left && ( // if the message needs to be on the left or the right in the screen
          <View
            style={[styles.avatarWithChat, { justifyContent: "flex-start" }]} //styles to display the chatbubble on the left
          >
            <Avatar.Image
              size={22}
              source={require("../assets/avatar.jpg")}
              style={styles.avatar}
            />
            <View style={[styles.balloon, { marginRight: 3 }]}>
              <Text style={styles.itemIn}>{this.props.message.text}</Text>
              <Text style={styles.time}>{this.props.message.time}</Text>
            </View>
            <IconButton
              icon={"reply"}
              color={theme.discussionPanelIconColor}
              size={25}
              style={styles.replyButton}
              onPress={() => this.props.setReplyingTo(this.props.messageIndex)}
            />
          </View>
        )}
        {!this.props.message.left && (
          <View
            style={[styles.avatarWithChat, { justifyContent: "flex-end" }]} // styles to display the chatbubble on the right
          >
            <IconButton
              icon={"reply"}
              color={theme.discussionPanelIconColor}
              size={25}
              style={styles.replyButton}
              onPress={() => this.props.setReplyingTo(this.props.messageIndex)}
            />
            <View style={[styles.balloon, { marginLeft: 3 }]}>
              <Text style={styles.itemIn}>{this.props.message.text}</Text>
              <Text style={styles.time}>{this.props.message.time}</Text>
            </View>
            <Avatar.Image
              size={22}
              source={require("../assets/avatar.jpg")}
              style={styles.avatar}
            />
          </View>
        )}
      </View>
    ) : (
      <View>
        {this.props.parentMessage.left && (
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
              underlayColor="white"
            >
              <View style={[styles.balloon, styles.balloonThread]}>
                <Text style={styles.itemIn}>{this.props.message.text}</Text>
                <Text style={styles.time}>{this.props.message.time}</Text>
              </View>
            </TouchableOpacity>
            <Avatar.Image
              size={22}
              source={require("../assets/avatar.jpg")}
              style={styles.avatar}
            />
          </View>
        )}
        {!this.props.parentMessage.left && (
          <View
            style={[
              styles.avatarWithChat,
              styles.threadTopViewRight,
              { justifyContent: "flex-end" },
            ]} // styles to display the chatbubble thread on the right
          >
            <Avatar.Image
              size={22}
              source={require("../assets/avatar.jpg")}
              style={styles.avatar}
            />
            <TouchableOpacity
              onLongPress={() =>
                this.props.setReplyingTo(this.props.messageIndex)
              }
              underlayColor="white"
            >
              <View style={[styles.balloon, styles.balloonThread]}>
                <Text style={styles.itemIn}>{this.props.message.text}</Text>
                <Text style={styles.time}>{this.props.message.time}</Text>
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
    paddingTop: 5,
    color: "white",
  },
  balloon: {
    maxWidth: windowWidth / 2.2,
    paddingHorizontal: constants.paddingHorizontal,
    paddingTop: constants.paddingTop,
    paddingBottom: constants.paddingBottom,
    borderRadius: constants.borderRadius,
    margin: constants.margin,
    minWidth: constants.minWidth,
    backgroundColor: theme.primaryColor,
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
    color: theme.timeColorInChatBubble,
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
    borderLeftColor: "red",
  },
  threadTopViewRight: {
    marginRight: 40,
    paddingRight: 10,
    borderRightWidth: 1.67,
    borderRightColor: "red",
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
