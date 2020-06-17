import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import { Portal, Dialog, Button } from "react-native-paper";

export const ConfirmSaveDialog = (props) => {
  return (
    <Portal>
      <Dialog
        visible={props.showDialog}
        onDismiss={props.dialogClickAwayAction}
        style={styles.dialog}
      >
        <Dialog.Title style={styles.dialogTitle}>
          {props.dialogTitle}
        </Dialog.Title>
        <Dialog.Content>
          <Text>{props.dialogContent}</Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button style={styles.actionButton} onPress={props.saveAction}>
            Save
          </Button>
          <Button style={styles.actionButton} onPress={props.cancelAction}>
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export const WarningDialog = (props) => {
  return (
    <Portal>
      <Dialog
        visible={props.showDialog}
        onDismiss={props.dialogClickAwayAction}
        style={styles.dialog}
      >
        <Dialog.Title style={styles.dialogTitle}>
          {props.dialogTitle}
        </Dialog.Title>
        <Dialog.Content>
          <Text>{props.dialogContent}</Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          <Button style={styles.actionButton} onPress={props.yesAction}>
            Yes
          </Button>
          <Button style={styles.actionButton} onPress={props.noAction}>
            No
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    width: Platform.OS == "web" ? "50%" : "auto",
    alignSelf: "center",
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
});
