import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const LogsView = (props) => {
  return (
    <View style={styles.logsView}>
      <Text style={styles.text}>
        {props.userResponsibleForChange} {props.verb} "{props.itemChanged}" in "
        {props.documentChanged}" {props.documentType}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logsView: {
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
