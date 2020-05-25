import { Card, Colors, IconButton } from "react-native-paper";
import { Text } from "react-native";
import React from "react";

export const GridCard = (props) => {
  return (
    <Card
      style={{
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        paddingBottom: 10,
      }}
    >
      <IconButton
        icon={props.icon || "information"}
        color={Colors.black500}
        size={50}
      />
      <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 16 }}>
        {props.title || ""}
      </Text>
    </Card>
  );
};
