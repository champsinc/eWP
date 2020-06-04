import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { theme } from "../styles/Main";

export const AttachmentView = (props) => {
  return (
    <View style={styles.topView}>
      {!props.thread && (
        <IconButton
          icon={"reply"}
          color={theme.discussionPanelIconColor}
          size={25}
          style={styles.replyButton}
          onPress={() => props.setReplyingTo(props.messageIndex)}
        />
      )}
      {!props.thread && (
        <View style={styles.attachmentView}>
          <IconButton
            style={styles.attachmentIcon}
            icon="attachment"
            color="black"
            size={30}
          />
          <Text style={styles.text}>
            {props.message.user} sent "{props.message.fileName}"
          </Text>
        </View>
      )}
      {props.thread && (
        <TouchableOpacity
          onLongPress={() => props.setReplyingTo(props.messageIndex)}
          underlayColor="white"
          style={styles.attachmentThreadViewTouchable}
        >
          <View style={styles.attachmentThreadView}>
            <IconButton
              style={styles.attachmentIcon}
              icon="attachment"
              color="black"
              size={30}
            />
            <Text style={styles.text1}>
              {props.message.user} sent "{props.message.fileName}"
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
  attachmentView: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    marginHorizontal: 10,
    marginLeft: 1,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: "#c7c7c7",
    borderStyle: "solid",
    borderWidth: 1,
  },
  attachmentThreadViewTouchable: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "flex-start",
    marginLeft: 41,
    marginRight: 40,
    borderStyle: "dashed",
    borderLeftColor: "#c7c7c7",
    borderTopColor: "#c7c7c7",
    borderBottomColor: "#c7c7c7",
    borderRightColor: "red",
    borderWidth: 0.5,
    paddingRight: 5,
    borderRightWidth: 1.67,
  },
  attachmentThreadView: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingRight: 5,
  },
  attachmentIcon: {
    margin: 0, //required to remove extra margins that come with the IconButton
    marginLeft: 1,
    alignSelf: "center",
  },
  text: {
    flex: 2,
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 10,
    marginVertical: 10,
    alignSelf: "center",
  },
  text1: {
    flex: 2,
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 10,
    marginVertical: 10,
    // alignSelf: "center",
  },
  replyButton: {
    margin: 0,
    marginLeft: 3,
    flexDirection: "column",
    alignSelf: "center",
  },
});
