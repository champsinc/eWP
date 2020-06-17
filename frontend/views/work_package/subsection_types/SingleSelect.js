import React from "react";
import { View, Text, StyleSheet, Picker, Platform } from "react-native";

export class SingleSelect extends React.Component {
  intialSelected = "";
  constructor(props) {
    super(props);
    this.props.value.forEach((selectItem) => {
      selectItem.value == "selected"
        ? (this.intialSelected = selectItem.name)
        : "";
    });
    this.state = {
      selected: this.intialSelected,
      error: false,
    };
  }

  onValueChange = (itemValue) => {
    itemValue != this.intialSelected
      ? this.props.setChangesMade(this.props.name, true)
      : this.props.setChangesMade(this.props.name, false);
    this.props.required && itemValue.length == 0
      ? this.props.setError(this.props.name, true)
      : this.props.setError(this.props.name, false);
    this.setState({
      selected: itemValue,
      error: this.props.required && itemValue.length == 0 ? true : false,
    });
  };

  render() {
    return (
      <View style={styles.topView}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.nameTextStyle}>{this.props.name}</Text>
          {this.props.required && <Text style={styles.asteriskStyle}>*</Text>}
        </View>
        <Picker
          style={
            Platform.OS == "web" ? styles.pickerDesktop : styles.pickerPhone
          }
          itemStyle={styles.pickerItem}
          enabled={this.props.editable}
          selectedValue={this.state.selected}
          onValueChange={this.onValueChange}
        >
          <Picker.Item label={""} value={""} />
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
  pickerDesktop: {
    width: 200,
    height: 40,
    backgroundColor: "white",
    // borderColor: "black",
    // borderWidth: 1,
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
