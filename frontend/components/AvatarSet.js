import React from "react";
import { Avatar, Chip } from "react-native-paper";
import { View, StyleSheet, Platform } from "react-native";

const names = ['First Name', 'Last Name', 'Phone', 'Email', 'Etc', 'First Name', 'Last Name', 'Phone', 'Email', 'Etc']
//const chipComponents = this.props.users.map(name => <Chip style={{marginLeft: 4, marginTop: 3}} mode="flat">{name}</Chip>)
export const AvatarSet = (props) => {
    return (
        <View style={styles.view}>
            {props.users.map((name, index) => <Chip key={index} style={{marginLeft: 4, marginTop: 3}} mode="flat">{name}</Chip>)}
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      alignContent: "flex-start",
      maxWidth: Platform.OS == "web" ? "70%" : "100%"
    }
  });