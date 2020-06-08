import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton, Modal, Portal, Provider } from "react-native-paper";
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
      peopleInvolved: [],
      replyingToMessageIndex: "",
    };
    axios
      .get(
        "http://ganskop.com/proxy/https://rss.itunes.apple.com/api/v1/us/books/top-paid/all/10/explicit.json"
      )
      .then((res) =>
        this.setState({
          messages: this.messages,
          peopleInvolved: this.peopleInvolved,
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
      thread: [
        {
          id: "1.1",
          type: "text",
          text: "Hedy!",
          time: "02:47 PM",
        },
      ],
    },
    {
      id: "2",
      type: "text",
      text: "Hey!",
      user: "User 1",
      left: false,
      avatar: "Supervisor",
      time: "02:13 PM",
      thread: [
        {
          id: "2.1",
          type: "text",
          text: "Hoy!",
          time: "02:47 PM",
        },
      ],
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
    {
      id: "6",
      type: "attachment",
      fileName: "2020.pdf",
      user: "User 1",
      avatar: "Supervisor",
      time: "2.50 PM",
    },
  ];

  peopleInvolved = [
    {
      id: 1,
      UserName: "raghul",
      DisplayName: "Raghul Krishnan",
    },
    {
      id: 2,
      UserName: "dhiren",
      DisplayName: "Dhiren Chadnani",
    },
    {
      id: 3,
      UserName: "nirbhay",
      DisplayName: "Nirbhay Pherwani",
    },
  ];

  appendMessage = (message) => {
    this.state.messages.push(message);
    this.setState({
      messages: this.state.messages,
      replyingToMessageIndex: "",
    });
  };

  appendThread = (message) => {
    this.state.messages[this.state.replyingToMessageIndex].thread
      ? ""
      : (this.state.messages[this.state.replyingToMessageIndex].thread = []);
    this.state.messages[this.state.replyingToMessageIndex].thread.push(message);
    this.resetReplyingTo();
  };

  setReplyingTo = (index) => {
    this.discussionInputBox.focusInputField();
    this.setState({
      replyingToMessageIndex: index,
    });
  };

  resetReplyingTo = () => {
    this.setState({
      replyingToMessageIndex: "",
    });
  };

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps="handled" //added this, for the ability to press buttons while typing
        ref={(ref) => {
          this.scrollView = ref;
        }}
        onContentSizeChange={() =>
          this.scrollView.scrollToEnd({ animated: "true" })
        }
      >
        {this.state.messages.map((message, index) => {
          return message.type == "text" ? (
            <View>
              <ChatBubble
                key={message.id}
                messageIndex={index}
                message={message}
                avatar="../assets/avatar.jpg"
                setReplyingTo={this.setReplyingTo}
              />
              {message.thread &&
                message.thread.map((messageInThread) => {
                  return messageInThread.type == "text" ? (
                    <ChatBubble
                      key={messageInThread.id}
                      parentMessage={message}
                      message={messageInThread}
                      messageIndex={index}
                      setReplyingTo={this.setReplyingTo}
                    />
                  ) : messageInThread.type == "request" ? (
                    <RequestView
                      key={messageInThread.id}
                      parentMessage={message}
                      message={messageInThread}
                      thread={true}
                    />
                  ) : messageInThread.type == "attachment" ? (
                    <AttachmentView
                      key={messageInThread.id}
                      parentMessage={message}
                      message={messageInThread}
                      thread={true}
                    />
                  ) : (
                    ""
                  );
                })}
            </View>
          ) : message.type == "log" ? (
            <View>
              <LogsView
                key={message.id}
                messageIndex={index}
                message={message}
                setReplyingTo={this.setReplyingTo}
              />
              {message.thread &&
                message.thread.map((messageInThread) => {
                  return messageInThread.type == "text" ? (
                    <ChatBubble
                      key={messageInThread.id}
                      parentMessage={message}
                      message={messageInThread}
                      messageIndex={index}
                      setReplyingTo={this.setReplyingTo}
                    />
                  ) : messageInThread.type == "request" ? (
                    <RequestView
                      key={messageInThread.id}
                      parentMessage={message}
                      message={messageInThread}
                      messageIndex={index}
                      setReplyingTo={this.setReplyingTo}
                      thread={true}
                    />
                  ) : messageInThread.type == "attachment" ? (
                    <AttachmentView
                      key={messageInThread.id}
                      parentMessage={message}
                      message={messageInThread}
                      messageIndex={index}
                      setReplyingTo={this.setReplyingTo}
                      thread={true}
                    />
                  ) : (
                    ""
                  );
                })}
            </View>
          ) : message.type == "request" ? (
            <View>
              <RequestView
                key={message.id}
                messageIndex={index}
                message={message}
                setReplyingTo={this.setReplyingTo}
              />
              {message.thread &&
                message.thread.map((messageInThread) => {
                  return messageInThread.type == "text" ? (
                    <ChatBubble
                      key={messageInThread.id}
                      parentMessage={message}
                      message={messageInThread}
                      messageIndex={index}
                      setReplyingTo={this.setReplyingTo}
                    />
                  ) : messageInThread.type == "request" ? (
                    <RequestView
                      key={messageInThread.id}
                      parentMessage={message}
                      message={messageInThread}
                      messageIndex={index}
                      setReplyingTo={this.setReplyingTo}
                      thread={true}
                    />
                  ) : messageInThread.type == "attachment" ? (
                    <AttachmentView
                      key={messageInThread.id}
                      parentMessage={message}
                      message={messageInThread}
                      messageIndex={index}
                      setReplyingTo={this.setReplyingTo}
                      thread={true}
                    />
                  ) : (
                    ""
                  );
                })}
            </View>
          ) : message.type == "attachment" ? (
            <View>
              <AttachmentView
                key={message.id}
                messageIndex={index}
                message={message}
                setReplyingTo={this.setReplyingTo}
              />
              {message.thread &&
                message.thread.map((messageInThread) => {
                  return messageInThread.type == "text" ? (
                    <ChatBubble
                      key={messageInThread.id}
                      parentMessage={message}
                      message={messageInThread}
                      messageIndex={index}
                      setReplyingTo={this.setReplyingTo}
                    />
                  ) : messageInThread.type == "request" ? (
                    <RequestView
                      key={messageInThread.id}
                      parentMessage={message}
                      message={messageInThread}
                      messageIndex={index}
                      setReplyingTo={this.setReplyingTo}
                      thread={true}
                    />
                  ) : messageInThread.type == "attachment" ? (
                    <AttachmentView
                      key={messageInThread.id}
                      parentMessage={message}
                      message={messageInThread}
                      messageIndex={index}
                      setReplyingTo={this.setReplyingTo}
                      thread={true}
                    />
                  ) : (
                    ""
                  );
                })}
            </View>
          ) : (
            <View />
          );
        })}
        {this.state.replyingToMessageIndex !== "" && (
          <View style={styles.replyingToView}>
            <Text style={styles.replyingToText}>
              <Text style={{ fontWeight: "bold" }}>Replying to</Text>
              {this.messages[this.state.replyingToMessageIndex].type == "text"
                ? ": " + this.messages[this.state.replyingToMessageIndex].text
                : this.messages[this.state.replyingToMessageIndex].type == "log"
                ? ' a LOG: "' +
                  this.messages[this.state.replyingToMessageIndex].itemChanged +
                  '" by "' +
                  this.messages[this.state.replyingToMessageIndex].user +
                  '"'
                : this.messages[this.state.replyingToMessageIndex].type ==
                  "request"
                ? ' a REQUEST: "' +
                  this.messages[this.state.replyingToMessageIndex].text +
                  '" by "' +
                  this.messages[this.state.replyingToMessageIndex].user +
                  '"'
                : this.messages[this.state.replyingToMessageIndex].type ==
                  "attachment"
                ? ' an ATTACHMENT: "' +
                  this.messages[this.state.replyingToMessageIndex].fileName +
                  '" by "' +
                  this.messages[this.state.replyingToMessageIndex].user +
                  '"'
                : ""}
            </Text>
            <IconButton
              style={styles.crossIcon}
              icon="close"
              color="gray"
              size={20}
              onPress={this.resetReplyingTo}
            ></IconButton>
          </View>
        )}
        <DiscussionInputBox
          ref={(ref) => {
            this.discussionInputBox = ref;
          }}
          appendMessage={this.appendMessage}
          replyingToMessageIndex={this.state.replyingToMessageIndex}
          appendThread={this.appendThread}
          peopleInvolved={this.state.peopleInvolved}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  replyingToView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 0,
    borderRadius: 8,
    borderColor: theme.borderColorInDiscussionSection,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 7,
  },
  replyingToText: {
    flex: 1,
    marginRight: 3,
    flexDirection: "column",
    alignSelf: "center",
  },
  crossIcon: {
    flex: 0.05,
    flexDirection: "column",
    margin: 0,
    height: "auto",
    alignSelf: "center",
  },
});
