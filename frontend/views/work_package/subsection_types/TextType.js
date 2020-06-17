import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { TextInput } from "react-native-paper";
import { customTheme } from "../../../styles/Main";

/**
 * This class is used to render a single unit item of a subsection of text or number type
 * @author Raghul Krishnan
 */
export default class TextType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputText: this.props.value,
      error: false,
    };
  }

  onChangeText = (textInputText) => {
    textInputText =
      this.props.type == "number"
        ? textInputText.replace(/[^0-9]/g, "") // restrict non-numeric characters if the field type is number
        : textInputText;
    this.props.value != textInputText // if the current value is/[is not] equal to the value it was when it was last saved then
      ? this.props.setChangesMade(this.props.name, true) // set changesMade object associated with this component key to true
      : this.props.setChangesMade(this.props.name, false); // set changesMade object associated with this component key to false
    this.props.required && textInputText.length == 0
      ? this.props.setError(this.props.name, true)
      : this.props.setError(this.props.name, false);
    this.setState({
      textInputText,
      error: this.props.required && textInputText.length == 0 ? true : false,
    });
  };

  render() {
    return (
      <View style={this.styles.topView}>
        <View style={{ flexDirection: "row" }}>
          <Text style={this.styles.nameTextStyle}>{this.props.name} </Text>
          {this.props.required && (
            <Text style={this.styles.asteriskStyle}>*</Text>
          )}
          {/* <Text
            style={
              this.state.error
                ? [this.styles.nameTextStyle, this.styles.switchBasedOnError]
                : this.styles.nameTextStyle
            }
          >
            {": "}
          </Text> */}
        </View>
        {this.props.editable ? (
          <View>
            <View>
              {Platform.OS == "web" ? (
                <TextInput
                  style={this.styles.textInputStyle}
                  value={this.state.textInputText}
                  onChangeText={this.onChangeText}
                  mode={"outlined"}
                  selectionColor={customTheme.textSelectionColor}
                  placeholder={this.props.value}
                  multiline={false}
                />
              ) : (
                <TextInput
                  style={this.styles.textInputStyle}
                  value={this.state.textInputText}
                  onChangeText={this.onChangeText}
                  mode={"outlined"}
                  keyboardType={
                    this.props.type == "number" ? "numeric" : "default"
                  }
                  selectionColor={customTheme.textSelectionColor}
                  placeholder={this.props.value}
                  multiline={false}
                />
              )}
            </View>
            <View>
              {this.state.error && (
                <View>
                  <Text style={this.styles.errorText}>
                    This is a required field
                  </Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <Text style={this.styles.valueTextStyle}>{this.props.value}</Text>
        )}
      </View>
    );
  }

  styles = StyleSheet.create({
    topView: {
      marginLeft: 75,
      marginBottom: 20,
      maxWidth: 250,
    },
    nameTextStyle: {
      fontWeight: "bold",
      fontSize: 16,
      alignSelf: "center",
      marginBottom: 10,
    },
    textInputStyle: {
      height: 40,
      fontSize: 16,
      minWidth: 120,
    },
    valueTextStyle: {
      marginTop: 5,
      fontSize: 16,
    },
    asteriskStyle: {
      color: "red",
      fontSize: 16,
      lineHeight: Platform.OS == "web" ? 10 : 15,
    },
    errorText: {
      marginTop: 5,
      flexWrap: "wrap",
      color: "red",
    },
  });
}
