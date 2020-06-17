import React from "react";
import { View, Text, StyleSheet, Picker, Platform } from "react-native";
import CheckBox from "react-native-check-box";
import { customTheme } from "../../../styles/Main";

export class CheckItem extends React.Component {
  intialCheckBoxStatus = this.props.value == "checked";
  constructor(props) {
    super(props);
    this.state = {
      checkBoxStatus: this.props.value == "checked",
    };
  }

  onValueChange = () => {
    !this.state.checkBoxStatus != this.intialCheckBoxStatus
      ? this.props.setChangesMade(this.props.name, true)
      : this.props.setChangesMade(this.props.name, false);
    this.setState({
      checkBoxStatus: !this.state.checkBoxStatus,
    });
  };

  render() {
    return (
      <View style={styles.topView}>
        <Text>*</Text>
        <CheckBox
          disabled={!this.props.editable}
          isChecked={this.state.checkBoxStatus}
          onClick={this.onValueChange}
          rightText={this.props.name}
          checkBoxColor={customTheme.primaryColor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topView: {
    marginLeft: 75,
    marginBottom: 20,
    flexDirection: "row",
  },
  asteriskStyle: {
    color: "red",
    fontSize: 16,
    lineHeight: Platform.OS == "web" ? 10 : 15,
  },
  pickerDesktop: {
    width: 200,
    height: 40,
    backgroundColor: "white",
  },
  pickerPhone: {
    width: 200,
    height: 40,
  },
  pickerItem: {
    height: 40,
    color: "red",
  },
  nameTextStyle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    marginTop: 5,
    flexWrap: "wrap",
    color: "red",
  },
});
