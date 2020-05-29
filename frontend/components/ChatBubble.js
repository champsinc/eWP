import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Avatar } from "react-native-paper";
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
            </View>
          </View>
        )}
        {!this.props.left && (
          <View style={styles.avatarWithChatRight}>
            <View style={styles.balloonRight}>
              <Text style={styles.itemIn}>{this.props.text}</Text>
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

const styles = StyleSheet.create({
  itemIn: {
    paddingTop: 5,
    color: "white",
  },
  balloonLeft: {
    maxWidth: windowWidth / 2.2,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 20,
    margin: 5,
    alignSelf: "flex-start",
    backgroundColor: theme.primaryColor,
  },
  balloonRight: {
    maxWidth: windowWidth / 2.2,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 20,
    margin: 5,
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
});
