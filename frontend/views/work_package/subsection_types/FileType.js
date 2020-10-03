import React from "react";
import { View, StyleSheet, Platform, Text, Dimensions } from "react-native";
import { Portal } from "react-native-paper";
import ImageViewer from "react-native-image-zoom-viewer";
import { AttachmentView } from "./AttachmentView";

/**
 * This class is used to render a single unit item of a subsection of file type
 * @author Raghul Krishnan
 */
export default class FileType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  images = [
    {
      url: this.props.value,
    },
  ];

  setIsVisible = (visible) => {
    this.setState({
      visible,
    });
  };

  render() {
    return (
      <View style={{ overflow: "hidden" }}>
        <AttachmentView
          data={this.props}
          openModal={this.setIsVisible}
          subSectionId={this.props.subSectionId}
          dataItemId={this.props.dataItemId}
        />
        {this.state.visible && (
          <Portal>
            <ImageViewer
              imageUrls={this.images}
              enableSwipeDown={true}
              onSwipeDown={() => this.setIsVisible(false)}
              onClick={() => this.setIsVisible(false)}
              handleLongPress={(event) => {}}
              renderFooter={(currentIndex) => {
                return (
                  <Text
                    style={{
                      color: "white",
                      width: windowWidth,
                      textAlign: "center",
                      marginBottom: 40,
                      fontWeight: "bold",
                    }}
                  >
                    Swipe down or click to close
                  </Text>
                );
              }}
            />
          </Portal>
        )}
      </View>
    );
  }
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  topView: {
    marginLeft: 15,
    marginBottom: 10,
  },
  nameTextStyle: {
    marginLeft: 15,
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 16,
  },
  asteriskStyle: {
    color: "red",
    fontSize: 16,
    lineHeight: 30,
  },
  dialog: {
    width: Platform.OS == "web" ? "50%" : "97%",
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
  button: {
    marginLeft: 41,
    padding: 0,
    flexDirection: "row",
    alignSelf: "flex-start",
    fontSize: 16,
  },
  calendarIcon: {
    alignSelf: "center",
  },
  dateText: {
    marginLeft: 56,
    alignSelf: "flex-start",
    marginTop: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  errorText: {
    marginLeft: 56,
    marginTop: 5,
    flexWrap: "wrap",
    color: "red",
  },
});
