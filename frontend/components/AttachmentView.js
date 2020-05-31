import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { theme } from "../styles/Main";

export const AttachmentView = (props) => {
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
        <IconButton icon="attachment" color="black" size={40} />
        <Text style={styles.text}>
          {props.userUploaded} sent "{props.fileName}"
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
    borderStyle: "soild",
    borderWidth: 1,
  },
  text: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
  },
});
