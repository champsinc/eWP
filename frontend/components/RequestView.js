import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { theme } from "../styles/Main";

export const RequestView = (props) => {
  return (
    <View style={styles.topView}>
      <IconButton
        icon={"reply"}
        color={theme.discussionPanelIconColor}
        size={25}
        style={styles.replyButton}
        onPress={() => console.log("button pressed")}
      />
      <View style={styles.requestView}>
        <Text style={styles.text}>
          {props.userRequesting} requested to "{props.request}"
        </Text>
      </View>
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
