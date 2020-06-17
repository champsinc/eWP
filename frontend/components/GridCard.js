import { Card, Colors, IconButton } from "react-native-paper";
import { Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import React from "react";

export const GridCard = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.onPress(props.name)}>
      <Card style={styles.cardStyle} elevation={3}>
        <IconButton
          icon={props.icon || "information"}
          color={Colors.black500}
          size={50}
          onPress={() => props.onPress(props.name)}
        />
        <Text style={styles.textInCard}>{props.name || ""}</Text>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  textInCard: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardStyle: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    paddingBottom: 10,
  },
});
