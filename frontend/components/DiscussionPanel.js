import React from "react";
import { Card, IconButton } from "react-native-paper";
import { theme } from "./../styles/Main";
import { StyleSheet } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

export default class DiscussionPanel extends React.Component {
  render() {
    return (
      <GestureRecognizer
        onSwipeUp={() => this.props.toggleDiscussionView()}
        onSwipeDown={() => this.props.toggleDiscussionView()}
      >
        <Card
          elevation={10}
          style={styles.discussionPanelCard}
          onPress={() => this.props.toggleDiscussionView()}
        >
          <Card.Title
            titleStyle={styles.discussionPanelCardTitle}
            title={"Discussion Panel (eWP#" + this.props.ewpNumber + ")"}
            right={() => (
              <IconButton
                icon={
                  this.props.discussionViewOpen ? "chevron-down" : "chevron-up"
                }
                color={theme.textColor}
                size={30}
                onPress={() => this.props.toggleDiscussionView()}
              />
            )}
          />
        </Card>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  discussionPanelCard: {
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: theme.primaryColor,
  },
  discussionPanelCardTitle: {
    color: theme.textColor,
  },
});
