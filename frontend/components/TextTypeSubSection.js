import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { List } from "react-native-paper";

export default class TextTypeSubSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInputText: this.props.value,
    };
  }

  onChangeText = (textInputText) => {
    this.setState({
      textInputText,
    });
  };
  render() {
    return (
      <View style={styles.topView}>
        <Text style={styles.nameTextStyle}>
          {this.props.name} {": "}
        </Text>
        {this.props.editable ? (
          <TextInput
            style={styles.textInputStyle}
            value={this.state.textInputText}
            onChangeText={this.onChangeText}
            mode={"outlined"}
            placeholder={this.props.value}
            multiline={false}
          />
        ) : (
          <Text style={styles.valueTextStyle}>{this.props.value}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    marginLeft: 75,
    marginBottom: 20,
  },
  nameTextStyle: {
    fontWeight: "bold",
    alignSelf: "center",
  },
  textInputStyle: {
    height: 30,
    marginLeft: 10,
    padding: 5,
  },
  valueTextStyle: {
    marginLeft: 10,
    fontSize: 16,
  },
});
