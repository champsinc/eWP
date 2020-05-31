import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Avatar, IconButton } from "react-native-paper";
import { theme } from "../styles/Main";
import { Dimensions } from "react-native";

export default class ChatBubble extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.topLevelView}>
        {this.props.left && (
          <View style={styles.avatarWithChatLeft}>
            <Avatar.Image
              size={24}
              source={require("../assets/avatar.jpg")}
              style={styles.avatar}
            />
            <View style={styles.balloonLeft}>
              <Text style={styles.itemIn}>{this.props.text}</Text>
              <Text style={styles.time}>{this.props.time}</Text>
            </View>
            <IconButton
              icon={"reply"}
              color={theme.discussionPanelIconColor}
              size={25}
              style={styles.replyButton}
              onPress={() => console.log("button pressed")}
            />
          </View>
        )}
        {!this.props.left && (
          <View style={styles.avatarWithChatRight}>
            <IconButton
              icon={"reply"}
              color={theme.discussionPanelIconColor}
              size={25}
              style={styles.replyButton}
              onPress={() => console.log("button pressed")}
            />
            <View style={styles.balloonRight}>
              <Text style={styles.itemIn}>{this.props.text}</Text>
              <Text style={styles.time}>{this.props.time}</Text>
            </View>
            <Avatar.Image
              size={24}
              source={require("../assets/avatar.jpg")}
              style={styles.avatar}
            />
          </View>
        )}
      </View>
    );
  }
}

const windowWidth = Dimensions.get("window").width;

const constants = {
  paddingHorizontal: 15,
  paddingTop: 10,
  paddingBottom: 15,
  borderRadius: 20,
  margin: 5,
  minWidth: 100,
};
const styles = StyleSheet.create({
  itemIn: {
    paddingTop: 5,
    color: "white",
  },
  balloonLeft: {
    maxWidth: windowWidth / 2.2,
    paddingHorizontal: constants.paddingHorizontal,
    paddingTop: constants.paddingTop,
    paddingBottom: constants.paddingBottom,
    borderRadius: constants.borderRadius,
    margin: constants.margin,
    minWidth: constants.minWidth,
    alignSelf: "flex-start",
    backgroundColor: theme.primaryColor,
  },
  balloonRight: {
    maxWidth: windowWidth / 2.2,
    paddingHorizontal: constants.paddingHorizontal,
    paddingTop: constants.paddingTop,
    paddingBottom: constants.paddingBottom,
    borderRadius: constants.borderRadius,
    margin: constants.margin,
    minWidth: constants.minWidth,
    alignSelf: "flex-end",
    backgroundColor: theme.primaryColor,
  },
  avatar: {
    flexDirection: "row",
    alignSelf: "center",
  },
  avatarWithChatLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: 10,
  },
  avatarWithChatRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 10,
  },
  time: {
    color: theme.timeColorInChatBubble,
    flexDirection: "row",
    alignSelf: "flex-end",
    marginTop: 5,
    fontSize: 12,
  },
  replyButton: {
    flexDirection: "column",
    alignSelf: "center",
  },
});
