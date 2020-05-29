import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { theme } from "./../styles/Main";
import * as DocumentPicker from "expo-document-picker";

export const DiscussionButtonPanel = (props) => {
  return (
    <View style={styles.discussionButtonPanelView}>
      <IconButton
        icon={"attachment"}
        color={theme.discussionPanelIconColor}
        size={20}
        onPress={() =>
          DocumentPicker.getDocumentAsync(options).then((res) => {
            console.log(res.uri);
          })
        }
      />
      <IconButton
        icon={"at"}
        color={theme.discussionPanelIconColor}
        size={20}
        onPress={() => console.log("DiscussionButtonPanel.js:19 Pressed")}
      />
      <IconButton
        icon={"alpha-r-box-outline"}
        color={theme.discussionPanelIconColor}
        size={20}
        onPress={() => console.log("DiscussionButtonPanel.js:25 Pressed")}
      />
      <IconButton
        icon={"send"}
        color={theme.discussionPanelIconColor}
        size={20}
        onPress={() => {
          props.clearInputBox();
          props.text.length > 0
            ? props.appendMessage({
                id: "5",
                type: "text",
                text: props.text,
                avatar: "Supervisor",
                left: false,
              })
            : "";
        }}
      />
    </View>
  );
};
const options = {
  multiple: true,
};

const styles = StyleSheet.create({
  discussionButtonPanelView: {
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 10,
    borderRadius: 5,
    borderColor: "#c7c7c7",
    borderStyle: "solid",
    borderWidth: 1,
  },
});
