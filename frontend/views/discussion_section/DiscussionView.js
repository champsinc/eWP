import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import DiscussionInputBox from "./DiscussionInputBox";
import axios from "axios";
import ChatBubble from "../../components/ChatBubble";
import { LogsView } from "../../components/LogsView";
import { RequestView } from "../../components/RequestView";
import { ScrollView } from "react-native-gesture-handler";
import { AttachmentView } from "../../components/AttachmentView";
import { customTheme, monthNames } from "../../styles/Main";
import DiscussionPanel from "./DiscussionPanel";
import { util } from "../../assets/Utility";

export default class DiscussionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      peopleInvolved: [],
      replyingToMessageIndex: "",
    };
  }

  componentDidMount(){
    this.getData();
    this.interval = setInterval(() => {
      this.getData();
    }, 15000);
  }

  getData() {
    axios
      .get(
        "http://ewpackage.gq:8080/api/discuss/wp/" +
          this.props.route.params.wpId,
        {
          headers: {
            api_key: util.api_key,
          },
        }
      )
      .then((res) =>
        this.setState({
          messages: res.data,
          peopleInvolved: this.peopleInvolved,
        })
      );
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

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
      replyingToMessageIndex: "",
    });
  };

  appendThread = (message) => {
    this.state.messages[this.state.replyingToMessageIndex].threads.push(
      message
    );
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

  isMessageDateSameAsToday = (timestamp) => {
    return (
      new Date().getDate() == new Date(timestamp).getDate() &&
      new Date().getMonth() == new Date(timestamp).getMonth() &&
      new Date().getFullYear() == new Date(timestamp).getFullYear()
    );
  };

  getFormattedDate = (timestamp) => {
    return (
      monthNames[new Date(timestamp).getMonth()] +
      " " +
      new Date(timestamp).getDate() +
      ", " +
      new Date(timestamp).getFullYear()
    );
  };

  lastDate = "";

  render() {
    return (
      <View style={{ flex: 1 }}>
        <DiscussionPanel
          discussionViewOpen={true}
          toggleDiscussionView={() => this.props.navigation.goBack()}
          ewpNumber={"1234"}
        />
        <ScrollView
          keyboardShouldPersistTaps="handled" //added this for the ability to press buttons while typing
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
                {!(
                  this.lastDate == "Today" &&
                  this.isMessageDateSameAsToday(message.timestamp)
                ) &&
                  this.lastDate != this.getFormattedDate(message.timestamp) && (
                    <Text style={styles.dateBetweenMessages}>
                      {
                        (this.lastDate = this.isMessageDateSameAsToday(
                          message.timestamp
                        )
                          ? "Today"
                          : this.getFormattedDate(message.timestamp))
                      }
                    </Text>
                  )}
                <ChatBubble
                  key={message.id}
                  messageIndex={index}
                  message={message}
                  user={this.props.user}
                  setReplyingTo={this.setReplyingTo}
                />
                {message.threads &&
                  message.threads.map((messageInThread) => {
                    return messageInThread.type == "text" ? (
                      <ChatBubble
                        key={messageInThread.id}
                        parentMessage={message}
                        message={messageInThread}
                        messageIndex={index}
                        user={this.props.user}
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
                {this.lastDate !=
                  monthNames[new Date(message.timestamp).getMonth()] +
                    " " +
                    new Date(message.timestamp).getDate() +
                    ", " +
                    new Date(message.timestamp).getFullYear() && (
                  <Text style={styles.dateBetweenMessages}>
                    {
                      (this.lastDate =
                        monthNames[new Date(message.timestamp).getMonth()] +
                        " " +
                        new Date(message.timestamp).getDate() +
                        ", " +
                        new Date(message.timestamp).getFullYear())
                    }
                  </Text>
                )}
                <LogsView
                  key={message.id}
                  messageIndex={index}
                  message={message}
                  setReplyingTo={this.setReplyingTo}
                  navigation={this.props.navigation}
                  section={message.section}
                  sectionId={message.sectionId}
                  subSectionId={message.subSectionId}
                />
                {message.thread &&
                  message.thread.map((messageInThread) => {
                    return messageInThread.type == "text" ? (
                      <ChatBubble
                        key={messageInThread.id}
                        parentMessage={message}
                        message={messageInThread}
                        messageIndex={index}
                        user={this.props.user}
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
                {this.lastDate !=
                  monthNames[new Date(message.timestamp).getMonth()] +
                    " " +
                    new Date(message.timestamp).getDate() +
                    ", " +
                    new Date(message.timestamp).getFullYear() && (
                  <Text style={styles.dateBetweenMessages}>
                    {
                      (this.lastDate =
                        monthNames[new Date(message.timestamp).getMonth()] +
                        " " +
                        new Date(message.timestamp).getDate() +
                        ", " +
                        new Date(message.timestamp).getFullYear())
                    }
                  </Text>
                )}
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
                        user={this.props.user}
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
                {this.lastDate !=
                  monthNames[new Date(message.timestamp).getMonth()] +
                    " " +
                    new Date(message.timestamp).getDate() +
                    ", " +
                    new Date(message.timestamp).getFullYear() && (
                  <Text style={styles.dateBetweenMessages}>
                    {
                      (this.lastDate =
                        monthNames[new Date(message.timestamp).getMonth()] +
                        " " +
                        new Date(message.timestamp).getDate() +
                        ", " +
                        new Date(message.timestamp).getFullYear())
                    }
                  </Text>
                )}
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
                        user={this.props.user}
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
        </ScrollView>
        {this.state.replyingToMessageIndex !== "" && (
          <View style={styles.replyingToView}>
            <Text style={styles.replyingToText}>
              <Text style={{ fontWeight: "bold" }}>Replying to</Text>
              {this.state.messages[this.state.replyingToMessageIndex].type ==
              "text"
                ? ": " +
                  this.state.messages[this.state.replyingToMessageIndex].value
                : this.state.messages[this.state.replyingToMessageIndex].type ==
                  "log"
                ? ' a LOG: "' +
                  this.state.messages[this.state.replyingToMessageIndex]
                    .itemChanged +
                  '" by "' +
                  this.state.messages[this.state.replyingToMessageIndex].user +
                  '"'
                : this.state.messages[this.state.replyingToMessageIndex].type ==
                  "request"
                ? ' a REQUEST: "' +
                  this.state.messages[this.state.replyingToMessageIndex].text +
                  '" by "' +
                  this.state.messages[this.state.replyingToMessageIndex].user +
                  '"'
                : this.state.messages[this.state.replyingToMessageIndex].type ==
                  "attachment"
                ? ' an ATTACHMENT: "' +
                  this.state.messages[this.state.replyingToMessageIndex]
                    .fileName +
                  '" by "' +
                  this.state.messages[this.state.replyingToMessageIndex].user +
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
          messages={this.state.messages}
          wpId={this.props.route.params.wpId}
          user={this.props.user}
          replyingToMessageIndex={this.state.replyingToMessageIndex}
          appendThread={this.appendThread}
          peopleInvolved={this.state.peopleInvolved}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  replyingToView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    // marginTop: 10,
    marginBottom: 0,
    borderRadius: 8,
    borderColor: customTheme.borderColorInDiscussionSection,
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
  dateBetweenMessages: {
    backgroundColor: "#4999E9",
    alignSelf: "center",
    borderRadius: 8,
    padding: 8,
    color: "white",
    textTransform: "capitalize",
  },
});
