import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { TextInput } from "react-native-paper";
import { customTheme, commonStyles } from "../../../styles/Main";
import AddNote from "../../../components/AddNote";

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
    // Code to eliminate the outline for a textinput
    // TODO: Find a right place to put this code
    this.textInput.setNativeProps({
      style: {
        outline: "none",
      },
    });
    console.log(this.props.oldValue);
    textInputText =
      this.props.type == "number"
        ? textInputText.replace(/[^0-9]/g, "") // restrict non-numeric characters if the field type is number
        : textInputText;
    this.props.value.toLowerCase() != textInputText.trim().toLowerCase() // if the current value is/[is not] equal to the value it was when it was last saved then
      ? this.props.setChangesMade(
          this.props.name,
          true,
          this.props.subSectionId,
          this.props.dataItemId,
          textInputText
        ) // set changesMade object associated with this component key to true
      : this.props.setChangesMade(this.props.name, false); // set changesMade object associated with this component key to false
    this.props.required && textInputText.length == 0
      ? this.props.setError(this.props.name, true)
      : this.props.setError(this.props.name, false);
    this.setState({
      textInputText,
      error: this.props.required && textInputText.length == 0 ? true : false,
    });
  };

  flag = true;

  render() {
    return (
      <View style={this.styles.topView}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[this.styles.nameTextStyle, commonStyles.capitalizeText]}
          >
            {this.props.name}{" "}
          </Text>
          {this.props.required && (
            <Text style={this.styles.asteriskStyle}>*</Text>
          )}
        </View>
        {this.props.editable ? (
          <View>
            <View>
              <TextInput
                ref={(ref) => (this.textInput = ref)}
                style={this.styles.textInputStyle}
                value={this.state.textInputText}
                onChangeText={this.onChangeText}
                mode={"outlined"}
                selectionColor={customTheme.textSelectionColor}
                keyboardType={
                  Platform.OS == "web"
                    ? undefined
                    : this.props.type == "number"
                    ? "numeric"
                    : "default"
                }
                placeholder={this.props.value}
                multiline={false}
              />
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
        <View>
          {this.props.notes && (
            <AddNote previousNotes={this.props.previousNotes} />
          )}
        </View>
      </View>
    );
  }

  styles = StyleSheet.create({
    topView: {
      marginLeft: 75,
      marginBottom: 20,
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
      width: "75%",
    },
    valueTextStyle: {
      marginTop: 5,
      fontSize: 16,
      marginRight: 35,
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
