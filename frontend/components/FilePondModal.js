import React from "react";
import { Portal, Dialog, Paragraph } from "react-native-paper";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
);
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
          <Dialog.Content>
            <FilePond
              ref={(ref) => (this.pond = ref)}
              acceptedFileTypes={["image/png", "image/jpg", "image/jpeg"]}
              labelIdle={"Upload files.."}
              allowMultiple={false}
              //   oninit={() => this.handleInit()}
              //   maxFileSize={"10MB"}
              //   allowFileSizeValidation={true}
              server={{
                process: {
                  url: "UPLOAD_MEDIA",
                  onload: (response) => this.loaded(response),
                },
              }}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>
    );
  }
}
