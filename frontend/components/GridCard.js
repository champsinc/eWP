import { Card, Colors, IconButton, Avatar } from "react-native-paper";
import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Dimensions,
} from "react-native";
import React from "react";

export const GridCard = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.onPress(props.name)}>
      <Card style={styles.cardStyle} elevation={Platform.OS == "web" ? 5 : 10}>
        <Avatar.Text size={45} label={props.label} style={styles.avatar} />
        {/* <IconButton
          icon={props.icon || "information"}
          color={Colors.black500}
          size={50}
          style={styles.iconButton}
          onPress={() => props.onPress(props.name)}
        /> */}
        <Text style={styles.textInCard}>{props.name || ""}</Text>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  textInCard: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: Platform.OS == "web" ? "normal" : "bold",
    fontSize: 16,
    paddingHorizontal: 10,
    textTransform: "capitalize",
  },
  iconButton: {
    margin: 0,
    alignSelf: "center",
  },
  cardStyle: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    paddingBottom: 10,
    paddingTop: 15,
    height: 150,
  },
  avatar: {
    margin: 0,
    padding: 0,
    alignSelf: "center",
  },
});
