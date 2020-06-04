import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { theme } from "../styles/Main";

export const LogsView = (props) => {
  return (
    <View style={styles.topView}>
      <IconButton
        icon={"reply"}
        color={theme.discussionPanelIconColor}
        size={25}
        style={styles.replyButton}
        onPress={() => props.setReplyingTo(props.messageIndex)}
      />
      <View style={styles.logsView}>
        <Text style={styles.text}>
          {props.message.user} {props.message.verb} "{props.message.itemChanged}
          " in "{props.message.documentChanged}" {props.message.documentType}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
  },
  logsView: {
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
  text: {
    margin: 10,
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
