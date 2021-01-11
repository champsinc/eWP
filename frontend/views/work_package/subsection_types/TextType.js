import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { TextInput } from "react-native-paper";
import { customTheme, commonStyles } from "../../../styles/Main";
import AddNote from "../../../components/AddNote";
import AsyncStorage from "@react-native-community/async-storage";

/**
 * This class is used to render a single unit item of a subsection of text or number type
 * @author Raghul Krishnan
 */
export default class TextType extends React.Component {
  intitalValue;

  constructor(props) {
    super(props);
    this.state = {
      textInputText: this.props.value,
      error: false,
    };
    this.getIntitalValue();
  }

  getIntitalValue = async () => {
    await AsyncStorage.getItem("wpId-" + this.props.wpId).then((wpData) => {
      wpData = JSON.parse(wpData);
      wpData.forEach((section) => {
        if (section.id == this.props.sectionId) {
          section.section_data.forEach((subsection) => {
            if (subsection.id == this.props.subSectionId) {
              subsection.dataitems.forEach((dataItem) => {
                if (dataItem.id == this.props.dataItemId) {
                  this.intitalValue = dataItem.value;
                }
              });
            }
          });
        }
      });
    });
  };

  onTextInputFocus = () => {
    // Code to eliminate the outline for a textinput
    this.textInput.setNativeProps({
      style: {
        outline: "none",
      },
    });
  };

  onChangeText = (textInputText) => {
    this.setState(
      {
        textInputText,
        error: this.props.required && textInputText.length == 0 ? true : false,
      },
      async () => {
        await this.getIntitalValue();
        textInputText =
          this.props.type == "number"
            ? textInputText.replace(/[^0-9]/g, "") // restrict non-numeric characters if the field type is number
            : textInputText;
        this.intitalValue != textInputText.trim() // if the current value is/[is not] equal to the value it was when it was last saved then
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
      }
    );
  };

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
                onFocus={this.onTextInputFocus}
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
            <AddNote
              previousNotes={this.props.previousNotes}
              currentUser={this.props.currentUser}
            />
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
