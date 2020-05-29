import * as React from "react";
import { View } from "react-native";
import DiscussionInputBox from "./DiscussionInputBox";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import { LogsView } from "./LogsView";

export default class DiscussionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    axios
      .get(
        "http://ganskop.com/proxy/https://rss.itunes.apple.com/api/v1/us/books/top-paid/all/10/explicit.json"
      )
      .then((res) =>
        this.setState({
          messages: this.messages,
        })
      );
  }
  messages = [
    {
      id: "1",
      type: "text",
      text: "Hi!",
      left: true,
      avatar: "Supervisor",
    },
    {
      id: "2",
      type: "text",
      text: "Hi!",
      left: false,
      avatar: "Supervisor",
    },
    {
      id: "3",
      type: "log",
      user: "User 1",
      verb: "checked",
      itemChanged: "Buy plumbing tools",
      documentChanged: "Intial Procedure",
      documentType: "list",
    },
  ];

  appendMessage = (message) => {
    this.state.messages.push(message);
    console.log(this.state.messages);
    this.setState({
      messages: this.state.messages,
    });
  };

  render() {
    return (
      <View>
        {this.state.messages.map((message) => {
          return message.type == "text" ? (
            <ChatBubble
              key={message.id}
              text={message.text}
              left={message.left}
              avatar="../assets/avatar.jpg"
            />
          ) : message.type == "log" ? (
            <LogsView
              userResponsibleForChange={message.user}
              verb={message.verb}
              itemChanged={message.itemChanged}
              documentChanged={message.documentChanged}
              documentType={message.documentType}
            ></LogsView>
          ) : (
            <View></View>
          );
        })}
        <DiscussionInputBox appendMessage={this.appendMessage} />
      </View>
    );
  }
}
