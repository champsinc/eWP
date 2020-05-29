import * as React from "react";
import { View } from "react-native";
import DiscussionInputBox from "./DiscussionInputBox";
import axios from "axios";
import ChatBubble from "./ChatBubble";

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
      text: "Hi!",
      left: true,
      avatar: "Supervisor",
    },
    {
      id: "2",
      text: "Hi!",
      left: false,
      avatar: "Supervisor",
    },
  ];

  appendMessage = (message) => {
    this.state.messages.push(message);
    this.setState({
      messages: this.state.messages,
    });
  };

  render() {
    return (
      <View>
        {this.state.messages.map((message) => {
          return (
            <ChatBubble
              key={message.id}
              text={message.text}
              left={message.left}
              avatar="../assets/avatar.jpg"
            />
          );
        })}
        <DiscussionInputBox appendMessage={this.appendMessage} />
      </View>
    );
  }
}
