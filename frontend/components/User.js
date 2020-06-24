import React from "react";
import { Avatar } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";

export const User = (props) => {
  return (
    <View style={styles.topView}>
      <Avatar.Image
        size={props.avatarSize}
        source={{ uri: props.avatarURL }}
        style={styles.avatar}
      />
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
