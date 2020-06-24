import * as React from "react";
import { Avatar, Button, Card } from "react-native-paper";
import { StyleSheet, Platform } from "react-native";
import { SingleSelect } from "./SingleSelect";
import AddNote from "../../../components/AddNote";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";

const LeftContent = (props) => <Avatar.Icon {...props} icon="attachment" />;

const imageFileTypes = new Set(["jpg", "jpeg", "png", "gif"]);

const download = async (url) => {
  let result = await WebBrowser.openBrowserAsync(url);
};

/**
 * This constant is for rendering any kind of file type in a subsection
 */
export const AttachmentView = (props) => {
  let openModal = props.openModal;
  const options = [
    {
      name: "Incomplete",
      value: "not-selected",
      type: "selectitem",
    },
    {
      name: "In Progress",
      value: "not-selected",
      type: "selectitem",
    },
    {
      name: "Completed",
      value: "not-selected",
      type: "selectitem",
    },
  ];
  props = props.data;
  props.statusCode && props.statusCode >= 0 && props.statusCode <= 2
    ? (options[props.statusCode].value = "selected")
    : "";

  const subTitle =
    (props.dueDate ? "Due on " + props.dueDate : "") +
    (props.dueDate && (props.fileSize || props.fileType) ? " • " : "") +
    (props.fileSize ? "Size " + props.fileSize : "") +
    (props.fileSize && props.fileType ? " • " : "") +
    (props.fileType ? props.fileType.toUpperCase() : "");

  return (
    <Card style={styles.card} elevation={Platform.OS == "web" ? 5 : 10}>
      <Card.Title
        style={styles.cardTitle}
        title={props.name}
        subtitle={subTitle}
        left={LeftContent}
      />
      {props.editable && (
        <Card.Content>
          <SingleSelect
            name={"Change Status"}
            key={"Change Status"}
            value={options}
            editable={props.editable}
            required={props.required}
            setChangesMade={props.setChangesMade}
            setError={props.setError}
            fromAttachment={true}
          />
        </Card.Content>
      )}
      {imageFileTypes.has(props.fileType) && (
        <TouchableWithoutFeedback onPress={() => openModal(true)}>
          <Card.Cover style={styles.cardCover} source={{ uri: props.value }} />
        </TouchableWithoutFeedback>
      )}
      <Card.Actions style={styles.cardActions}>
        {imageFileTypes.has(props.fileType) && (
          <Button onPress={() => openModal(true)}>View</Button>
        )}
        <Button onPress={() => download(props.value)}>Download</Button>
        {props.notes && (
          <AddNote previousNotes={props.previousNotes} fromAttachment={true} />
        )}
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: Platform.OS == "web" ? "60%" : "95%",
    marginLeft: Platform.OS == "web" ? 25 : 0,
    alignSelf: Platform.OS == "web" ? "flex-start" : "center",
    marginBottom: 20,
  },
  cardTitle: {
    marginBottom: 10,
    marginRight: 30,
  },
  cardActions: {
    alignSelf: "flex-end",
  },
  cardCover: {
    marginTop: 25,
  },
});
