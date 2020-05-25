import React from "react";
import { Card, IconButton } from "react-native-paper";
import { theme } from "./../styles/Main";

export default class DiscussionPanel extends React.Component {
  render() {
    return (
      <Card
        elevation={10}
        style={{
          marginBottom: 10,
          marginHorizontal: 10,
          backgroundColor: theme.primaryColor,
        }}
      >
        <Card.Title
          titleStyle={{ color: theme.textColor }}
          title="Discussion Panel"
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
    );
  }
}
