import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { List, Avatar, Divider } from "react-native-paper";
import AppBar from "../../components/AppBar";
import DiscussionPanel from "../discussion_section/DiscussionPanel";
import { util } from "../../assets/Utility";
import { AutoCompleteTextBox } from "../../components/AutoCompleteTextBox";

export class WorkPackageUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDiscussionView: false,
      editable: true,
    };
  }
  users = [
    {
      id: 1,
      UserName: "raghul",
      DisplayName: "Raghul Krishnan",
      role: "Planner",
    },
    {
      id: 2,
      UserName: "dhiren",
      DisplayName: "Dhiren Chadnani",
      role: "Supervisor",
    },
    {
      id: 3,
      UserName: "nirbhay",
      DisplayName: "Nirbhay Pherwani",
      role: "Worker",
    },
  ];

  // send already selected planners, supervisors and workers from a backend call
  selectedUsers = () => {};

  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  goBackFromUsersToWorkPackage = () => {
    this.props.navigation.navigate("home");
  };

  toggleDiscussionView = () => {
    this.setState(
      {
        showDiscussionView: !this.state.showDiscussionView,
      },
      () => {
        this.state.showDiscussionView
          ? this.props.navigation.navigate("discussion_section", {
              wpId: this.props.route.params.wpId,
            })
          : this.props.navigation.goBack();
      }
    );
  };

  capitalizeName = (name) => {
    return name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}); 
  }

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
                {this.props.route.params.userData.map((user, index) => {
                  return (
                    user.role == 1 && (
                      <View
                        style={styles.accordionContent}
                        key={user.name}
                      >
                        {/* {!this.state.editable && (
                          <Avatar.Image
                            size={30}
                            source={{ uri: util.avatarURL }}
                          />
                        )}
                        {this.state.editable ? (
                          <AutoCompleteTextBox
                            users={this.users}
                            filterRole={"Planner"}
                          />
                        ) : (
                          <Text style={styles.personName}>
                            {capitalizeName(user.name)}
                          </Text>
                        )} */}
                        <Avatar.Image
                          size={30}
                          source={{ uri: util.avatarURL }}
                        />
                        <Text style={styles.personName}>
                          {this.capitalizeName(user.name)}
                        </Text>
                      </View>
                    )
                  );
                })}
              </List.Accordion>
              <Divider style={styles.dividerStyle} />
              <List.Accordion
                key={"Supervisor Details"}
                title={"Supervisor Details"}
                left={(props) => <List.Icon {...props} icon="folder" />}
              >
                {this.props.route.params.userData.map((user, index) => {
                  return (
                    user.role == 2 && (
                      <View
                        style={styles.accordionContent}
                        key={user.name}
                      >
                        <Avatar.Image
                          size={30}
                          source={{ uri: util.avatarURL }}
                        />
                        <Text style={styles.personName}>
                          {this.capitalizeName(user.name)}
                        </Text>
                      </View>
                    )
                  );
                })}
              </List.Accordion>
              <Divider style={styles.dividerStyle} />
              <List.Accordion
                key={"Worker Details"}
                title={"Worker Details"}
                left={(props) => <List.Icon {...props} icon="folder" />}
              >
                {this.props.route.params.userData.map((user, index) => {
                  return (
                    user.role == 3 && (
                      <View
                        style={styles.accordionContent}
                        key={user.name}
                      >
                        <Avatar.Image
                          size={30}
                          source={{ uri: util.avatarURL }}
                        />
                        <Text style={styles.personName}>
                          {this.capitalizeName(user.name)}
                        </Text>
                      </View>
                    )
                  );
                })}
              </List.Accordion>
              <Divider style={styles.dividerStyle} />
            </List.Section>
          </View>
        )}
        <DiscussionPanel
          discussionViewOpen={this.state.showDiscussionView}
          toggleDiscussionView={this.toggleDiscussionView}
          ewpNumber={"1234"}
        />
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
  dividerStyle: {
    marginHorizontal: 10,
  },
});
