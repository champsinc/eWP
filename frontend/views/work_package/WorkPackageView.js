import React from "react";
import { View, FlatList, Platform, StyleSheet, Text } from "react-native";
import AppBar from "../../components/AppBar";
import { GridCard } from "../../components/GridCard";
import axios from "axios";
import DiscussionPanel from "../discussion_section/DiscussionPanel";
import { util } from "../../assets/Utility";
import { Button } from "react-native-paper";

/**
 * This class is used to render the any work package in the app
 * @author Raghul Krishnan
 */
export class WorkPackageView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      showDiscussionView: false,
      section: "",
      sectionClicked: false,
      showDialog: false,
      subSectionData: [],
    };

    this.props.route.params && this.props.route.params.id
      ? axios
          .get(util.api_url + "/wp/" + this.props.route.params.id, {
            headers: {
              api_key: util.api_key,
            },
          })
          .then((response) => {
            response.data.push({ id: "123456", name: "users" });
            this.setState({
              dataSource: response.data,
            });
          })
      : "";
  }

  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  toggleDiscussionView = () => {
    this.setState(
      {
        showDiscussionView: !this.state.showDiscussionView,
      },
      () => {
        this.state.showDiscussionView
          ? this.props.navigation.navigate("discussion_section", {
              wpId: this.props.route.params.id,
            })
          : this.props.navigation.goBack();
      }
    );
  };

  sectionClicked = (section) => {
    this.props.navigation.navigate("section", {
      section,
      sectionId: this.getSectionId(section),
      wpId: this.props.route.params.id,
    });
  };

  // this is the ref of the section view that is used to access a varibale to
  // set if the warning dialog should be shown or not
  // sectionView;

  goBackFromSubsectionToSection = () => {
    this.sectionView.finalChangesMade
      ? this.setState({
          showDialog: true,
        })
      : this.setState({
          sectionClicked: false,
          section: "",
        });
  };

  getSectionId = (section) => {
    return this.state.dataSource.filter((data) => {
      return section == data.name;
    })[0].id;
  };

  onModalClose = () => {
    this.setState({
      showDialog: false,
    });
  };

  usersClicked = () => {
    this.props.navigation.navigate("work_package_users", {
      wpId: this.props.route.params.id,
    });
  };

  warningYesClicked = () => {
    // go back from subsection to section and change all the data in the fields
    // back to how they were before the user entered the screen, and close the dialog
    this.setState({
      sectionClicked: false,
      section: "",
      showDialog: false,
    });
    // TODO: add code to revert the data back to how it was
  };

  render() {
    return (
      <View style={styles.view}>
        {!this.state.showDiscussionView && !this.state.sectionClicked && (
          <View style={styles.view}>
            <AppBar
              toggleNavBar={this.toggleNavBar}
              subTitle="Work Package"
              searchPlaceHolder="Search in this work package"
            />
            {this.props.route.params && this.props.route.params.id ? (
              <FlatList
                data={this.state.dataSource}
                renderItem={({ item, index }) => (
                  <View style={styles.gridCardTopView}>
                    <GridCard
                      key={item.name}
                      label={item.name.trim().substring(0, 1).toUpperCase()}
                      icon={
                        "alpha-" +
                        item.name.trim().substring(0, 1).toLowerCase() +
                        "-box-outline"
                      }
                      name={item.name.trim()}
                      onPress={
                        index == this.state.dataSource.length - 1
                          ? this.usersClicked
                          : this.sectionClicked
                      }
                    />
                  </View>
                )}
                //Setting the number of column
                numColumns={Platform.OS == "web" ? 4 : 2}
                keyExtractor={(item, index) => index}
              />
            ) : (
              <View style={styles.errorTextContainer}>
                <Text style={styles.errorText}>
                  Please select a work package from the dashboard before
                  entering this page
                </Text>
                <Button
                  onPress={() => this.props.navigation.navigate("dashboard")}
                  style={styles.dashboardButton}
                >
                  Dashboard
                </Button>
              </View>
            )}
          </View>
        )}
        {this.props.route.params && this.props.route.params.id && (
          <DiscussionPanel
            discussionViewOpen={this.state.showDiscussionView}
            toggleDiscussionView={this.toggleDiscussionView}
            ewpNumber={"1234"}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  gridCardTopView: {
    flex: 1,
    flexGrow: Platform.OS == "web" ? 0.25 : 0.5,
    flexDirection: "column",
    margin: 1,
  },
  errorTextContainer: {
    alignSelf: "center",
    marginTop: "10%",
  },
  errorText: {
    alignSelf: "center",
  },
  dashboardButton: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
