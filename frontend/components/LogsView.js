import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { customTheme } from "../styles/Main";
import { TouchableWithoutFeedback } from "react-native";

let onPressLog = (navigation, section, sectionId, subSectionId) => {
  navigation.navigate("section", {
    section,
    sectionId,
    subSectionId,
  });
};

export const LogsView = (props) => {
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        onPressLog(
          props.navigation,
          props.section,
          props.sectionId,
          props.subSectionId
        )
      }
    >
      <View style={styles.topView}>
        <IconButton
          icon={"reply"}
          color={customTheme.discussionPanelIconColor}
          size={25}
          style={styles.replyButton}
          onPress={() => props.setReplyingTo(props.messageIndex)}
        />
        <View style={styles.logsView}>
          <IconButton
            icon={"alpha-l-box-outline"}
            color={customTheme.discussionPanelIconColor}
            size={25}
            style={styles.logIcon}
          />
          <Text style={styles.text}>
            {props.message.userName} {props.message.verb} "
            {props.message.itemChanged}" in "{props.message.subSection}"
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
  },
  logsView: {
    flex: 2,
    flexDirection: "row",
    marginHorizontal: 10,
    marginLeft: 1,
    marginVertical: 10,
    borderRadius: 5,
    borderColor: customTheme.borderColorInDiscussionSection,
    borderStyle: "dashed",
    borderWidth: 1,
  },
  text: {
    margin: 10,
    marginLeft: 0,
    flex: 1,
    fontWeight: "bold",
    fontSize: 14,
  },
  logIcon: {
    margin: 0,
    alignSelf: "center",
  },
  replyButton: {
    margin: 0,
    marginLeft: 3,
    flexDirection: "column",
    alignSelf: "center",
  },
});
