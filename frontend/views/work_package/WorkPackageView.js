import React from "react";
import { View, FlatList, Platform, StyleSheet, Text } from "react-native";
import AppBar from "../../components/AppBar";
import { GridCard } from "../../components/GridCard";
import axios from "axios";
import DiscussionPanel from "../discussion_section/DiscussionPanel";
import { util } from "../../assets/Utility";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";
import { Paragraph, Dialog, Button, Portal } from "react-native-paper";

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
      showSave: false,
      userData: [],
      showSaveDialog: false,
      saveDialogMessage: "",
      afterSave: false,
    };

    this.getData();
  }

  // componentDidMount () {
  //   const {navigation} = this.props;
  //   navigation.addListener ('focus', () =>
  //     // run function that updates the data on entering the screen
  //     {
  //       console.log("Focussed");
  //       if(this.state.afterSave){
  //         this.setState({afterSave: false})
  //       }
  //       else{
  //         this.setState({afterSave: true})
  //       }
  //     }
  //   );
  // }

  getData = () => {
    this.props.route.params && this.props.route.params.id
      ? // TODO: Add code to check for internet and if not get from AsyncStorage
        Platform.OS == "web"
        ? axios
            .get(util.api_url + "/wp/" + this.props.route.params.id, {
              headers: {
                api_key: util.api_key,
              },
            })
            .then((response) => {
              response.data.all_data.push({
                id: "123456",
                name: "users",
                section_data: [],
              });
              this.setState({
                dataSource: response.data.all_data,
                userData: response.data.user_data,
              });
              // TODO: change to normal json without stringify (just for debugging)
              // CHnage the name of the key to workpackageid so that this works for all WPs
              AsyncStorage.setItem(
                "wpId-" + this.props.route.params.id,
                JSON.stringify(this.state.dataSource)
              );

              console.log("USER DATA: ", this.props.user)
              this.checkForSaveButton();
              // console.log(this.state);
            })
        : NetInfo.addEventListener((state) => {
            state.isConnected
              ? [
                  axios
                    .get(util.api_url + "/wp/" + this.props.route.params.id, {
                      headers: {
                        api_key: util.api_key,
                      },
                    })
                    .then((response) => {
                      response.data.all_data.push({
                        id: "123456",
                        name: "users",
                        section_data: [],
                      });
                      this.setState({
                        dataSource: response.data.all_data,
                        userData: response.data.user_data,
                      });
                      // TODO: change to normal json without stringify (just for debugging)
                      // CHnage the name of the key to workpackageid so that this works for all WPs
                      AsyncStorage.setItem(
                        "wpId-" + this.props.route.params.id,
                        JSON.stringify(this.state.dataSource)
                      );
                      this.checkForSaveButton();
                      // console.log(this.state);
                    }),
                ]
              : AsyncStorage.getItem("wpId-" + this.props.route.params.id).then(
                  (wpData) => {
                    this.setState({ dataSource: JSON.parse(wpData) });
                  }
                );
          })
      : "";
  };

  checkForSaveButton = () => {
    let showSave = true;
    if (this.props.route.params.status != 2) {
      this.state.dataSource.forEach((section) => {
        section.section_data.forEach((subsection) => {
          subsection.dataitems.forEach((dataItem) => {
            // Check for text and date type
            if (
              dataItem.required == true &&
              (dataItem.type == "text" || dataItem.type == "date") &&
              dataItem.value.trim().length == 0
            ) {
              showSave = false;
            }
            // Check for selectbox type
            if (dataItem.required == true && dataItem.type == "selectbox") {
              dataItem.value.some((item) => item.value == "selected")
                ? ""
                : (showSave = false);
            }
            // Check for checkItem type
            if (
              dataItem.required == true &&
              dataItem.type == "checkbox" &&
              dataItem.value != "checked"
            ) {
              showSave = false;
            }
            if (
              dataItem.required == true &&
              dataItem.type == "file" &&
              dataItem.status != 2
            ) {
              showSave = false;
            }
          });
        });
      });
      this.setState({ showSave });
    } else {
      this.setState({ showSave: false });
    }
  };

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

  getSectionData = (section) => {
    return this.state.dataSource.filter((data) => {
      return data.name == section;
    })[0].section_data;
  };

  onModalClose = () => {
    this.setState({
      showDialog: false,
    });
  };

  usersClicked = () => {
    this.props.navigation.navigate("work_package_users", {
      userData: this.state.userData,
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

  saveWorkPackage = () => {
    axios
      .post(
        util.api_url + "/wp/changestatus",
        {
          ewpId: this.props.route.params.id,
          email: this.props.user.email
        },
        {
          headers: {
            api_key: util.api_key,
          },
        }
      )
      .then((response) => {
        if (response.data == "Success") {
          this.setState({
            showSaveDialog: true,
            saveDialogMessage: "Work Package has been saved and closed.",
          });
        } else {
          this.setState({
            showSaveDialog: true,
            saveDialogMessage: "Work Package not saved.",
          });
        }
      });
  };

  hideDialog = () => {
    if (this.state.saveDialogMessage == "Work Package not saved.") {
      this.setState({ showSaveDialog: false });
    } else {
      AsyncStorage.removeItem("workPackageId");
      AsyncStorage.removeItem("wpId-" + this.props.route.params.id);
      this.setState({
        showSaveDialog: false,
        afterSave: true,
      });
      this.props.navigation.navigate("dashboard");
    }
  };

  checkWPId = () => {
    if (this.state.afterSave) {
      return false;
    } else {
      return true;
    }
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
            {this.props.route.params &&
            this.props.route.params.id &&
            !this.state.afterSave ? (
              [
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
                  keyExtractor={(item) => item.id}
                />,
                this.state.showSave && (
                  <View>
                    <Button
                      mode={"contained"}
                      onPress={this.saveWorkPackage}
                      style={styles.saveButton}
                    >
                      Save
                    </Button>
                    <Portal>
                      <Dialog
                        visible={this.state.showSaveDialog}
                        onDismiss={this.hideDialog}
                      >
                        <Dialog.Title>Alert</Dialog.Title>
                        <Dialog.Content>
                          <Paragraph>{this.state.saveDialogMessage}</Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                          <Button onPress={this.hideDialog}>Done</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                  </View>
                ),
              ]
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
  saveButton: {
    marginBottom: 15,
    flexDirection: "row",
    alignSelf: "center",
  },
});
