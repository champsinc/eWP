import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { List, Avatar } from "react-native-paper";
import AppBar from "../../components/AppBar";
import DiscussionPanel from "../../components/DiscussionPanel";
import DiscussionView from "../../components/DiscussionView";
import { util } from "../../assets/Utility";

export class WorkPackageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDiscussionView: false,
    };
  }
  users = [
    {
      name: "Raghul Krishnan",
      username: "raghulk",
      role: "Planner",
    },
    {
      name: "Raghul Krishnan",
      username: "raghulk",
      role: "Supervisor",
    },
    {
      name: "Raghul Krishnan",
      username: "raghulk",
      role: "Worker",
    },
    {
      name: "Raghul Krishnan",
      username: "raghulk",
      role: "Worker",
    },
    {
      name: "Raghul Krishnan",
      username: "raghulk",
      role: "Planner",
    },
  ];
  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  goBackFromUsersToWorkPackage = () => {
    this.props.navigation.pop();
  };

  toggleDiscussionView = () => {
    this.setState({
      showDiscussionView: !this.state.showDiscussionView,
    });
  };

  render() {
    return (
      <View style={styles.view}>
        {!this.state.showDiscussionView && (
          <View style={styles.view}>
            <AppBar
              toggleNavBar={this.toggleNavBar}
              subTitle="Users"
              searchPlaceHolder="Search in this work package"
              backButton={true}
              backButtonAction={this.goBackFromUsersToWorkPackage}
            />
            <List.Section title={"Users"} titleStyle={styles.titleStyle}>
              <List.Accordion
                key={"Planner Details"}
                title={"Planner Details"}
                left={(props) => <List.Icon {...props} icon="folder" />}
              >
                {this.users.map((user, index) => {
                  return (
                    user.role == "Planner" && (
                      <View style={styles.accordionContent} key={user.name}>
                        <Avatar.Image
                          size={30}
                          source={{ uri: util.avatarURL }}
                        />
                        <Text style={styles.personName}>{user.name}</Text>
                      </View>
                    )
                  );
                })}
              </List.Accordion>
              <List.Accordion
                key={"Supervisor Details"}
                title={"Supervisor Details"}
                left={(props) => <List.Icon {...props} icon="folder" />}
              >
                {this.users.map((user, index) => {
                  return (
                    user.role == "Supervisor" && (
                      <View style={styles.accordionContent} key={user.name}>
                        <Avatar.Image
                          size={30}
                          source={{ uri: util.avatarURL }}
                        />
                        <Text style={styles.personName}>{user.name}</Text>
                      </View>
                    )
                  );
                })}
              </List.Accordion>
              <List.Accordion
                key={"Worker Details"}
                title={"Worker Details"}
                left={(props) => <List.Icon {...props} icon="folder" />}
              >
                {this.users.map((user, index) => {
                  return (
                    user.role == "Worker" && (
                      <View style={styles.accordionContent} key={user.name}>
                        <Avatar.Image
                          size={30}
                          source={{ uri: util.avatarURL }}
                        />
                        <Text style={styles.personName}>{user.name}</Text>
                      </View>
                    )
                  );
                })}
              </List.Accordion>
            </List.Section>
          </View>
        )}
        <DiscussionPanel
          discussionViewOpen={this.state.showDiscussionView}
          toggleDiscussionView={this.toggleDiscussionView}
          ewpNumber={"1234"}
        />
        {this.state.showDiscussionView && <DiscussionView />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  accordionContent: {
    marginBottom: 15,
    flexDirection: "row",
  },
  personName: {
    marginLeft: 10,
    alignSelf: "center",
  },
  titleStyle: {
    fontSize: 19,
  },
});
