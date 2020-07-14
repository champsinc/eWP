import React from "react";
import { View, Text, StyleSheet, Picker, Platform } from "react-native";

export class SingleSelect extends React.Component {
  intialSelected = "";
  emptyOption = this.props.fromAttachment
    ? "Select Status"
    : "Select Something";
  constructor(props) {
    super(props);
    this.props.value.forEach((selectItem) => {
      selectItem.value == "selected"
        ? (this.intialSelected = selectItem.name)
        : this.emptyOption;
    });
    this.state = {
      selected: this.intialSelected,
      error: false,
    };
  }

  onValueChange = (itemValue) => {
    itemValue != this.intialSelected
      ? this.props.setChangesMade(this.props.fieldName, true)
      : this.props.setChangesMade(this.props.fieldName, false);
    this.props.required && itemValue == this.emptyOption
      ? this.props.setError(this.props.fieldName, true)
      : this.props.setError(this.props.fieldName, false);
    this.setState({
      selected: itemValue,
      error:
        this.props.required && itemValue == this.emptyOption ? true : false,
    });
  };

  render() {
    return (
      <View style={this.props.fromAttachment ? {} : styles.topView}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={
              this.props.fromAttachment
                ? { fontSize: 16, marginBottom: 10 }
                : styles.nameTextStyle
            }
          >
            {this.props.name}
          </Text>
          {this.props.required && <Text style={styles.asteriskStyle}> *</Text>}
        </View>
        <View style={Platform.OS == "web" ? {} : styles.pickerView}>
          <Picker
            style={
              Platform.OS == "web" ? styles.pickerDesktop : styles.pickerPhone
            }
            mode={"dropdown"}
            itemStyle={styles.pickerItem}
            enabled={this.props.editable}
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange}
          >
            <Picker.Item
              label={this.emptyOption}
              key={this.emptyOption}
              value={this.emptyOption}
            />
            {this.props.value.map((selectItem) => {
              return (
                <Picker.Item
                  label={selectItem.name}
                  key={selectItem.name}
                  value={selectItem.name}
                />
              );
            })}
          </Picker>
        </View>
        {this.state.error && (
          <View>
            <Text style={styles.errorText}>This is a required field</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topView: {
    marginLeft: 75,
    marginBottom: 20,
  },
  asteriskStyle: {
    color: "red",
    fontSize: 16,
    lineHeight: Platform.OS == "web" ? 10 : 15,
  },
  pickerView: {
    borderWidth: 1,
    borderRadius: 5,
    width: "75%",
  },
  pickerDesktop: {
    width: "75%",
    paddingHorizontal: 5,
    paddingEnd: 5,
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
  },
  pickerPhone: {
    width: "100%",
    height: 40,
    borderColor: "black",
    borderWidth: 2,
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
