import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Chip } from "react-native-paper";
import DiscussionButtonPanel from "./DiscussionButtonPanel";
import { customTheme } from "../../styles/Main";
import MentionsTextInput from "react-native-mentions";

export default class DiscussionInputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      keyword: "",
      data: [],
      mentions: new Set(),
      key: 1,
      autoFocus: false,
    };
  }

  clearInputBox = () => {
    this.setState({
      text: "",
      mentions: new Set(),
    });
  };

  focusInputField = () => {
    this.setState({
      autoFocus: true,
      key: ++this.state.key,
    });
  };

  addMentionSymbol = () => {
    this.setState({
      text: this.state.text + " @",
    });
  };

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
    const comment = this.state.text.slice(0, -this.state.keyword.length);
    this.setState({
      data: [],
      text: comment + "@" + username,
    });
    this.onChangeText(comment + "@" + username);
    this.focusInputField();
  }

  onChangeText = (text) => {
    this.props.peopleInvolved.forEach((people) => {
      text.toLowerCase().indexOf(people.UserName) > -1
        ? this.state.mentions.add(people.DisplayName)
        : this.state.mentions.delete(people.DisplayName);
    });
    this.setState({
      text,
    });
  };

  callback(keyword) {
    const filtered = this.props.peopleInvolved.filter((people) => {
      return (
        people.DisplayName.toLowerCase().indexOf(
          keyword.slice(1).toLowerCase()
        ) > -1
      );
    });
    this.setState({
      keyword: keyword,
      data: filtered,
    });
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <MentionsTextInput
            key={this.state.key}
            autoFocus={this.state.autoFocus}
            placeholder={"Your Message Here ... "}
            textInputStyle={{
              borderColor: "gray", // inline styles because styles variable doesnt work in web
              borderWidth: 1,
              padding: 10,
            }}
            suggestionsPanelStyle={{
              backgroundColor: "rgba(100,100,100,0.1)", // inline styles because styles variable doesnt work in web
              marginBottom: 2,
            }}
            loadingComponent={() => <View />}
            textInputMinHeight={50}
            textInputMaxHeight={80}
            trigger={"@"}
            triggerLocation={"new-word-only"}
            value={this.state.text}
            onChangeText={(text) => this.onChangeText(text)}
            triggerCallback={this.callback.bind(this)}
            renderSuggestionsRow={this.renderSuggestionsRow.bind(this)}
            suggestionsData={this.state.data} // array of objects
            keyExtractor={(item, index) => item.UserName}
            suggestionRowHeight={this.state.data.length > 0 ? 45 : 0}
            horizontal={false} // the orientation of the list
            MaxVisibleRowCount={this.state.data.length > 0 ? 3 : 0}
          />
        </View>
        <View style={styles.chipView}>
          {Array.from(this.state.mentions).map((mention) => {
            return (
              <Chip
                selected={true}
                disabled={true}
                style={styles.chip}
                key={mention}
                textStyle={styles.chipText}
              >
                {mention}
              </Chip>
            );
          })}
        </View>
        <View style={styles.discussionButtonPanel}>
          <DiscussionButtonPanel
            text={this.state.text.trim()}
            replyingToMessageIndex={this.props.replyingToMessageIndex}
            appendMessage={this.props.appendMessage}
            appendThread={this.props.appendThread}
            clearInputBox={this.clearInputBox}
            peopleInvolved={this.props.peopleInvolved}
            addMentionSymbol={this.addMentionSymbol}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 15,
  },
  discussionButtonPanel: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
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
    backgroundColor: customTheme.primaryColor,
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
  chip: {
    marginHorizontal: 10,
    marginVertical: 3,
    backgroundColor: "lightgray",
  },
  chipText: {
    color: "black",
    fontWeight: "bold",
  },
  chipView: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
