import React from "react";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { theme } from "./../styles/Main";

export const DiscussionButtonPanel = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        marginHorizontal: 10,
        borderRadius: 5,
        borderColor: "#c7c7c7",
        borderStyle: "solid",
        borderWidth: 1,
      }}
    >
      <IconButton
        icon={"attachment"}
        color={theme.discussionPanelIconColor}
        size={20}
      />
      <IconButton
        icon={"at"}
        color={theme.discussionPanelIconColor}
        size={20}
      />
      <IconButton
        icon={"alpha-r-box-outline"}
        color={theme.discussionPanelIconColor}
        size={20}
      />
      <IconButton
        icon={"send"}
        color={theme.discussionPanelIconColor}
        size={20}
      />
    </View>
  );
};
