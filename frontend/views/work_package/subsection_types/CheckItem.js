import React from "react";
import { View, StyleSheet, Text, Dimensions, Platform } from "react-native";
import { Checkbox } from "react-native-paper";
import { customTheme } from "../../../styles/Main";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

/**
 * This class is used to render a single unit item of a subsection of checkitem type
 * @author Raghul Krishnan
 */
export class CheckItem extends React.Component {
  intialCheckBoxStatus = this.props.value;
  constructor(props) {
    super(props);
    this.state = {
      checkBoxStatus: this.props.value,
    };
  }

  onValueChange = () => {
    this.setState(
      {
        checkBoxStatus:
          this.state.checkBoxStatus == "checked" ? "unchecked" : "checked",
      },
      () => {
        this.state.checkBoxStatus != this.intialCheckBoxStatus
          ? this.props.setChangesMade(this.props.name, true)
          : this.props.setChangesMade(this.props.name, false);
      }
    );
  };

  render() {
    return (
      <View style={styles.topView}>
        <Checkbox
          disabled={!this.props.editable}
          status={this.state.checkBoxStatus}
          onPress={this.onValueChange}
          color={
            this.props.editable
              ? customTheme.primaryColor
              : customTheme.disabledColor
          }
        />
        <TouchableWithoutFeedback
          onPress={this.props.editable ? this.onValueChange : () => {}}
        >
          <View style={styles.touchableView}>
            <Text style={styles.textStyle}>
              {this.props.name}
              {this.props.required && (
                <Text style={styles.asteriskStyle}> *</Text>
              )}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  topView: {
    marginHorizontal: 15,
    marginBottom: 20,
    flexDirection: "row",
  },
  asteriskStyle: {
    color: "red",
    fontSize: 16,
    lineHeight: 20,
    position: "relative",
    bottom: 3,
  },
  touchableView: {
    marginTop: 7,
    marginHorizontal: 20,
    marginRight: 55,
    maxWidth: Platform.OS == "web" ? windowWidth - 100 : windowWidth / 1.1,
    flexDirection: "row",
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 20,
  },
});
