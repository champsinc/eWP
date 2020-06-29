import React from "react";
import MentionsTextInput from "react-native-mentions";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { customTheme } from "../styles/Main";
import { Button, Chip } from "react-native-paper";
import { util } from "../assets/Utility";

export class AutoCompleteTextBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoFocus: false,
      text: "",
      data: this.props.users,
      key: 1,
      mentions: new Set(),
      showAddButton: false,
      trigger: "@",
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

  clearText = () => {
    this.setState({
      text: "",
      key: ++this.state.key,
    });
  };

  onSuggestionTap(username, hidePanel) {
    hidePanel();
    this.clearText;
    const comment = this.state.text.slice(0, -this.state.keyword.length);
    this.setState({
      data: [],
      text: comment + "@" + username,
    });
    this.onChangeText(comment + "@" + username);
    this.setState({
      autoFocus: true,
      key: ++this.state.key,
    });
  }

  onChangeText = (text) => {
    this.props.users.some((user) => {
      return "@" + user.UserName == text.trim();
    })
      ? this.setState({
          text,
          showAddButton: true,
          trigger: "",
        })
      : this.setState({
          text,
          showAddButton: false,
          trigger: "@",
        });
  };

  callback(keyword) {
    const filtered = this.props.users.filter((user) => {
      return (
        user.role == this.props.filterRole &&
        user.DisplayName.toLowerCase().indexOf(keyword.slice(1).toLowerCase()) >
          -1
      );
    });
    this.setState({
      keyword: keyword,
      data: filtered,
    });
  }

  onAdd = () => {
    this.props.users.forEach((user) => {
      this.state.text.trim().toLowerCase().indexOf(user.UserName) > -1
        ? this.state.mentions.add(user.DisplayName)
        : "";
    });
    this.setState({
      text: "",
      showAddButton: false,
      trigger: "@",
    });
  };

  onRemove = (mention) => {
    this.state.mentions.delete(mention);
    this.setState({
      showAddButton: false,
    });
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <MentionsTextInput
            key={this.state.key}
            ref={(ref) => (this.mentionsInput = ref)}
            placeholder={"Mention one user at a time"}
            autoFocus={this.state.autoFocus}
            textInputStyle={{
              borderColor: "gray", // inline styles because styles variable doesnt work in web
              borderWidth: 1,
              padding: 10,
              minWidth: 200,
            }}
            suggestionsPanelStyle={{
              backgroundColor: "rgba(100,100,100,0.1)", // inline styles because styles variable doesnt work in web
              marginBottom: 2,
            }}
            loadingComponent={() => <View />}
            textInputMinHeight={50}
            textInputMaxHeight={80}
            trigger={this.state.trigger}
            triggerLocation={"new-word-only"}
            value={this.state.text}
            onChangeText={(text) => this.onChangeText(text)}
            triggerCallback={this.callback.bind(this)}
            renderSuggestionsRow={this.renderSuggestionsRow.bind(this)}
            suggestionsData={this.state.data} // array of objects
            suggestionRowHeight={45}
            horizontal={false} // the orientation of the list
            MaxVisibleRowCount={3}
          />
          {this.state.showAddButton && (
            <Button onPress={this.onAdd}>Add</Button>
          )}
        </View>
        <View style={styles.chipView}>
          {Array.from(this.state.mentions).map((mention) => {
            return (
              <Chip
                selected={true}
                style={styles.chip}
                key={mention}
                textStyle={styles.chipText}
                onClose={() => this.onRemove(mention)}
              >
                {mention}
              </Chip>
            );
          })}
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
    flexDirection: "row",
    alignItems: "center",
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
