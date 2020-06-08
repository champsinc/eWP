import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import MentionsTextInput from "react-native-mentions";
import { theme } from "../styles/Main";

const { height, width } = Dimensions.get("window");
export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      keyword: "",
      data: [],
    };
  }

  renderSuggestionsRow({ item }, hidePanel) {
    return (
      <TouchableOpacity
        onPress={() => this.onSuggestionTap(item.UserName, hidePanel)}
      >
        <View style={styles.suggestionsRowContainer}>
          <View style={styles.userIconBox}>
            <Text style={styles.usernameInitials}>
              {!!item.DisplayName &&
                item.DisplayName.split(" ")[0][0].toUpperCase() +
                  item.DisplayName.split(" ").slice(-1)[0][0].toUpperCase()}
            </Text>
          </View>
          <View style={styles.userDetailsBox}>
            <Text style={styles.displayNameText}>{item.DisplayName}</Text>
            <Text style={styles.usernameText}>@{item.UserName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  onSuggestionTap(username, hidePanel) {
    hidePanel();
    const comment = this.state.value.slice(0, -this.state.keyword.length);
    this.setState({
      data: [],
      value: comment + "@" + username,
    });
  }

  callback(keyword) {
    this.setState({
      keyword: keyword,
      data: this.props.personInfo,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MentionsTextInput
          autoFocus={true}
          placeholder={"Your Message Here ... "}
          textInputStyle={{
            borderColor: "gray",
            borderWidth: 1,
            padding: 5,
            // marginBottom: 10,
            // fontSize: 15,
          }}
          suggestionsPanelStyle={{
            backgroundColor: "rgba(100,100,100,0.1)",
            marginBottom: 2,
          }}
          loadingComponent={() => (
            <View
              style={{
                flex: 1,
                width,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator />
            </View>
          )}
          textInputMinHeight={50}
          textInputMaxHeight={80}
          trigger={"@"}
          triggerLocation={"new-word-only"} // 'new-word-only', 'anywhere'
          value={this.state.value}
          onChangeText={(val) => {
            this.setState({ value: val });
          }}
          triggerCallback={this.callback.bind(this)}
          renderSuggestionsRow={this.renderSuggestionsRow.bind(this)}
          suggestionsData={this.state.data} // array of objects
          keyExtractor={(item, index) => item.UserName}
          suggestionRowHeight={45}
          horizontal={false} // defaut is true, change the orientation of the list
          MaxVisibleRowCount={3} // this is required if horizontal={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    justifyContent: "flex-end",
  },
  suggestionsRowContainer: {
    flexDirection: "row",
  },
  userAvatarBox: {
    width: 35,
    paddingTop: 2,
  },
  userIconBox: {
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.primaryColor,
  },
  usernameInitials: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 14,
  },
  userDetailsBox: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 15,
  },
  displayNameText: {
    fontSize: 13,
    fontWeight: "500",
  },
  usernameText: {
    fontSize: 12,
    color: "rgba(0,0,0,0.6)",
  },
});
