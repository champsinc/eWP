import * as React from "react";
import { View } from "react-native";
import DiscussionInputBox from "./DiscussionInputBox";
import axios from "axios";
import ChatBubble from "./ChatBubble";
import { LogsView } from "./LogsView";
import { RequestView } from "./RequestView";
import { ScrollView } from "react-native-gesture-handler";
import { AttachmentView } from "./AttachmentView";

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
      user: "User 1",
      left: true,
      avatar: "Supervisor",
      time: "02:11 PM",
    },
    {
      id: "2",
      type: "text",
      text: "Hi!",
      user: "User 1",
      left: false,
      avatar: "Supervisor",
      time: "02:13 PM",
    },
    {
      id: "3",
      type: "log",
      user: "User 1", //user who sent the message/request/attachment
      verb: "checked",
      itemChanged: "Buy plumbing tools",
      documentChanged: "Intial Procedure",
      documentType: "list",
      time: "02:16 PM",
    },
    {
      id: "4",
      type: "image",
      uri: "",
      time: "02:30 PM",
    },
    {
      id: "5",
      type: "request",
      text: "add a new Work Package for this work",
      user: "User 1",
      time: "02:45 PM",
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
      <ScrollView
        keyboardShouldPersistTaps="handled" //added for the ability to press buttons while typing
        ref={(ref) => {
          this.scrollView = ref;
        }}
        onContentSizeChange={() =>
          this.scrollView.scrollToEnd({ animated: "true" })
        }
      >
        <View>
          {this.state.messages.map((message) => {
            return message.type == "text" ? (
              <ChatBubble
                key={message.id}
                text={message.text}
                left={message.left}
                user={message.user}
                // replyButton={true}
                avatar="../assets/avatar.jpg"
                time={message.time}
              />
            ) : message.type == "log" ? (
              <LogsView
                userResponsibleForChange={message.user}
                verb={message.verb}
                itemChanged={message.itemChanged}
                documentChanged={message.documentChanged}
                documentType={message.documentType}
              />
            ) : message.type == "request" ? (
              <RequestView
                userRequesting={message.user}
                request={message.text}
              />
            ) : message.type == "attachment" ? (
              <AttachmentView
                userUploaded={message.user}
                fileName={message.fileName}
              />
            ) : (
              <View />
            );
          })}
          <DiscussionInputBox appendMessage={this.appendMessage} />
        </View>
      </ScrollView>
    );
  }
}
