import React from "react";
import { View, Text, StyleSheet, Platform, Dimensions } from "react-native";
import { Portal, Dialog, Button, TextInput, Divider } from "react-native-paper";
import { customTheme } from "../styles/Main";
import { ScrollView } from "react-native-gesture-handler";
import { User } from "./User";
import { util } from "../assets/Utility";

export default class AddNote extends React.Component {
  textInput = "";
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      showSave: false,
      textInput: "",
    };
  }

  showDialog = () => {
    this.setState(
      {
        showDialog: true,
      },
      () => {
        setTimeout(() => this.textInput.focus()); //wait for the dialog to open
      }
    );
  };

  onDismiss = () => {
    this.setState({
      showDialog: false,
    });
  };

  saveButtonPressed = () => {
    //TODO: persist data
    this.props.previousNotes.push(this.state.textInput);
    this.setState({
      textInput: "",
      showSave: false,
    });
  };

  onTextInputChange = (text) => {
    this.setState({
      textInput: text,
      showSave:
        this.state.textInput.toLowerCase() != text.trim().toLowerCase() &&
        text != "",
    });
  };

  render() {
    return (
      <View style={this.props.fromAttachment ? {} : styles.topView}>
        <Button onPress={this.showDialog}>
          {this.props.previousNotes.length > 0 ? "View/Add Notes" : "Add Notes"}
        </Button>
        <Portal>
          <Dialog
            visible={this.state.showDialog}
            onDismiss={this.onDismiss}
            style={styles.dialog}
          >
            <Dialog.Title style={styles.dialogTitle}>
              {this.props.previousNotes.length > 0
                ? "View/Add Notes"
                : "Add Notes"}
            </Dialog.Title>
            <Dialog.Content>
              {this.props.previousNotes && (
                <ScrollView
                  style={{ maxHeight: windowHeight / 4 }}
                  ref={(ref) => {
                    this.scrollView = ref;
                  }}
                  onContentSizeChange={() =>
                    this.scrollView.scrollToEnd({ animated: "true" })
                  }
                >
                  {this.props.previousNotes.map((note, index) => {
                    return (
                      <View style={styles.logText}>
                        <User
                          avatarURL={util.avatarURL}
                          userName={"Sergio Marquina"}
                          avatarSize={20}
                        />
                        <Text key={note}>{note}</Text>
                      </View>
                    );
                  })}
                </ScrollView>
              )}
              <TextInput
                ref={(ref) => {
                  this.textInput = ref;
                }}
                value={this.state.textInput}
                multiline={true}
                numberOfLines={2}
                onChangeText={this.onTextInputChange}
                placeholder={"Enter your note here"}
                mode={"outlined"}
              />
            </Dialog.Content>
            <Dialog.Actions style={styles.dialogActions}>
              {this.state.showSave && (
                <Button
                  style={styles.actionButton}
                  onPress={this.saveButtonPressed}
                >
                  Save
                </Button>
              )}
              <Button style={styles.actionButton} onPress={this.onDismiss}>
                Cancel
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: -15,
  },
  dialog: {
    maxHeight: windowHeight / 2,
    width: Platform.OS == "web" ? "50%" : "auto",
    alignSelf: Platform.OS == "web" ? "center" : "auto",
  },
  dialogTitle: {
    fontFamily: "System",
  },
  dialogActions: {
    marginHorizontal: 10,
  },
  actionButton: {
    marginLeft: 15,
  },
  logText: {
    marginBottom: 5,
    borderColor: customTheme.borderColorInDiscussionSection,
    borderWidth: 1,
    padding: 10,
  },
});
