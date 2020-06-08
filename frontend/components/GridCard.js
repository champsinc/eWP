import { Card, Colors, IconButton } from "react-native-paper";
import { Text, StyleSheet } from "react-native";
import React from "react";

export const GridCard = (props) => {
  return (
    <Card
      style={styles.cardStyle}
      onPress={() => console.log("GridCard.js:14 pressed")}
      elevation={3}
    >
      <IconButton
        icon={props.icon || "information"}
        color={Colors.black500}
        size={50}
      />
      <Text style={styles.textInCard}>{props.title || ""}</Text>
    </Card>
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
