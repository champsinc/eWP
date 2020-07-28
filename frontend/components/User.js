import React from "react";
import { Avatar } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";

let extractInitialsFromName = (userName) => {
  return (
    userName.split(" ")[0][0].toUpperCase() +
    userName.split(" ").slice(-1)[0][0].toUpperCase()
  );
};

export const User = (props) => {
  return (
    <View style={styles.topView}>
      {props.avatarURL ? (
        <Avatar.Image
          size={props.avatarSize}
          source={{ uri: props.avatarURL }}
        />
      ) : (
        <Avatar.Text
          size={24}
          label={extractInitialsFromName(props.userName)}
        />
      )}
      <Text style={styles.userName}>{props.userName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    marginBottom: 10,
  },
  userName: {
    marginLeft: 5,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
