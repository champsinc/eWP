import React from "react";
import { Portal, Dialog } from "react-native-paper";

export default class FilePondModal extends React.Component {
  constructor(props) {
    super(props);
  }

  loaded = (res) => {
    console.log(res);
  };

  render() {
    return (
      <Portal>
        <Dialog
          visible={this.props.modalOpen}
          onDismiss={this.props.onModalClose}
        >
          <Dialog.Title>Attach Files</Dialog.Title>
          <Dialog.Content></Dialog.Content>
        </Dialog>
      </Portal>
    );
  }
}
