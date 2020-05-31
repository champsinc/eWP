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
        onPress={() => console.log("button pressed")}
      />
      <View style={styles.logsView}>
        <Text style={styles.text}>
          {props.userResponsibleForChange} {props.verb} "{props.itemChanged}" in
          "{props.documentChanged}" {props.documentType}
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
    marginVertical: 10,
    borderRadius: 5,
    borderColor: "#c7c7c7",
    borderStyle: "dashed",
    borderWidth: 1,
  },
  text: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 14,
  },
});
