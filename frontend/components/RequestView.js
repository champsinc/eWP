import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";
import { theme } from "../styles/Main";

export const RequestView = (props) => {
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
        <View style={styles.requestView}>
          <Text style={styles.text}>
            {props.message.user} requested to "{props.message.text}"
          </Text>
        </View>
      )}
      {props.thread && (
        <TouchableOpacity
          onLongPress={() => props.setReplyingTo(props.messageIndex)}
          underlayColor="white"
          style={styles.requestThreadView}
        >
          <View>
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
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
    marginLeft: 1,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: "#c7c7c7",
    borderStyle: "dashed",
    borderWidth: 1,
  },
  requestThreadView: {
    flex: 2,
    flexDirection: "row",
    marginHorizontal: 40,
    marginLeft: 41,
    borderStyle: "dashed",
    borderWidth: 0.5,
    paddingRight: 5,
    borderRightWidth: 1.67,
    borderRightColor: "red",
  },
  text: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 14,
  },
  replyButton: {
    margin: 0,
    marginLeft: 3,
    flexDirection: "column",
    alignSelf: "center",
  },
});
