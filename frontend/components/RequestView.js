import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { customTheme } from "../styles/Main";

export const RequestView = (props) => {
  return (
    <View style={styles.topView}>
      {!props.thread && (
        <IconButton
          icon={"reply"}
          color={customTheme.discussionPanelIconColor}
          size={25}
          style={styles.replyButton}
          onPress={() => props.setReplyingTo(props.messageIndex)}
        />
      )}
      {!props.thread && (
        <View style={styles.requestView}>
          <IconButton
            icon={"alpha-r-box-outline"}
            color={customTheme.discussionPanelIconColor}
            size={25}
            style={styles.requestIcon}
          />
          <Text style={styles.text}>
            {props.message.user} requested to "{props.message.text}"
          </Text>
        </View>
      )}
      {props.thread && (
        <TouchableOpacity
          onLongPress={() => props.setReplyingTo(props.messageIndex)}
          underlayColor="white"
          style={styles.requestThreadViewTouchable}
        >
          <View style={styles.requestThreadTopView}>
            <IconButton
              icon={"alpha-r-box-outline"}
              color={customTheme.discussionPanelIconColor}
              size={25}
              style={[styles.requestIcon, { marginLeft: 0 }]}
            />
            <Text style={styles.text}>
              {props.message.user} requested to "{props.message.text}"
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
  },
  requestView: {
    flex: 2,
    backgroundColor: "lightgray",
    flexDirection: "row",
    marginHorizontal: 10,
    marginLeft: 1,
    marginVertical: 10,
    borderRadius: 5,
  },
  requestThreadViewTouchable: {
    flex: 2,
    flexDirection: "row",
    marginHorizontal: 40,
    marginLeft: 41,
    borderStyle: "dashed",
    borderWidth: 0.5,
    paddingRight: 5,
    borderRightWidth: 1.67,
    borderRightColor: customTheme.threadColorInDiscussionSection,
  },
  requestThreadTopView: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: 10,
    marginLeft: 1,
  },
  text: {
    marginVertical: 10,
    marginRight: 15,
    marginLeft: 1,
    fontWeight: "bold",
    fontSize: 14,
  },
  requestIcon: {
    margin: 0,
    alignSelf: "center",
  },
  replyButton: {
    margin: 0,
    marginLeft: 3,
    alignSelf: "center",
  },
});
