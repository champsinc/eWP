import { Card, Colors, IconButton } from "react-native-paper";
import React from "react";

export const GridCard = (props) => {
  return (
    <Card>
      <IconButton
        icon={props.icon || "information"}
        color={Colors.red500}
        size={50}
        // style={{left: 10}}
        onPress={() => console.log('Pressed')}
      />
      {/*<Avatar.icon icon={"folder"} />*/}
      <Card.Title
        // style={{width: "51%"}}
        title={props.title || ""}
      // left={(props) => <Avatar.Icon {...props} icon="folder" />}
      // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
      />
    </Card>
  );
}
