import React from "react";
import { View, FlatList, Platform, StyleSheet, Text } from "react-native";
import AppBar from "../../components/AppBar";
import { GridCard } from "../../components/GridCard";
import axios from "axios";
import DiscussionPanel from "../discussion_section/DiscussionPanel";
import { util } from "../../assets/Utility";
import { Button } from "react-native-paper";

let workPackageData = [
  {
    id: "5f0f50b9393970398908c335",
    name: "Details-2",
    section_data: [
      {
        id: "5f0f50b9393970398908c336",
        name: "My Work Order Info Details 2",
        dataitems: [
          {
            value: 123,
            id: "5f0f50b9393970398908c337",
            name: "Work Order Id",
            type: "number",
            editable: true,
            notes: false,
            required: false,
            special_identifier: false,
          },
          {
            value: "Fix waterws",
            id: "5f0f50b9393970398908c338",
            name: "Title",
            type: "text",
            editable: true,
            notes: false,
            required: true,
            special_identifier: false,
          },
          {
            value:
              "Lorem is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u0027s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
            id: "5f0f50b9393970398908c339",
            name: "Description",
            type: "text",
            editable: false,
            notes: true,
            required: false,
            special_identifier: false,
          },
          {
            value: "05/13/2020",
            id: "5f0f50b9393970398908c33a",
            name: "Order Date",
            type: "date",
            editable: true,
            notes: false,
            required: false,
            special_identifier: false,
          },
        ],
      },
      {
        id: "5f0f50b9393970398908c33b",
        name: "Work Order Time Line Details",
        dataitems: [
          {
            value: "05/12/2020",
            id: "5f0f50b9393970398908c33c",
            name: "Order Date",
            type: "date",
            editable: false,
            notes: false,
            required: false,
            special_identifier: false,
          },
          {
            value: "05/12/2020",
            id: "5f0f50b9393970398908c33d",
            name: "Expected Date of Delivery",
            type: "date",
            editable: true,
            notes: false,
            required: true,
            special_identifier: false,
          },
        ],
      },
    ],
  },
  {
    id: "5f0f50b9393970398908c33e",
    name: "Instructions",
    section_data: [
      {
        id: "5f0f50b9393970398908c33f",
        name: "Abstract list",
        dataitems: [
          {
            value: [
              {
                name: "Orange",
                value: "selected",
              },
              {
                name: "Apple",
                value: "not-selected",
              },
              {
                name: "Bananas",
                value: "not-selected",
              },
            ],
            id: "5f0f50b9393970398908c340",
            name: "Fruits",
            type: "selectbox",
            editable: true,
            notes: false,
            required: true,
            special_identifier: false,
          },
          {
            value: [
              {
                name: "Cat",
                value: "selected",
              },
              {
                name: "Lion",
                value: "not-selected",
              },
              {
                name: "Tiger",
                value: "not-selected",
              },
            ],
            id: "5f0f50b9393970398908c341",
            name: "Animals",
            type: "selectbox",
            editable: true,
            notes: false,
            required: false,
            special_identifier: false,
          },
          {
            value: [
              {
                name: "Peacock",
                value: "selected",
              },
              {
                name: "Crow",
                value: "not-selected",
              },
              {
                name: "Pigeon",
                value: "not-selected",
              },
            ],
            id: "5f0f50b9393970398908c342",
            name: "Birds",
            type: "selectbox",
            editable: false,
            notes: false,
            required: false,
            special_identifier: false,
          },
        ],
      },
      {
        id: "5f0f50b9393970398908c343",
        name: "Checklist of things required",
        dataitems: [
          {
            value: "checked",
            id: "5f0f50b9393970398908c344",
            name:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u0027s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            type: "checkitem",
            editable: false,
            notes: false,
            required: false,
            special_identifier: false,
          },
          {
            value: "checked",
            id: "5f0f50b9393970398908c345",
            name:
              "Lorem is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\u0027s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
            type: "checkitem",
            editable: true,
            notes: false,
            required: true,
            special_identifier: false,
          },
          {
            value: "checked",
            id: "5f0f50b9393970398908c346",
            name: "Lorem Ipsum is ",
            type: "checkitem",
            editable: true,
            notes: false,
            required: true,
            special_identifier: false,
          },
        ],
      },
    ],
  },
  {
    id: "5f0f50b9393970398908c347",
    name: "My Attachments",
    section_data: [
      {
        id: "5f0f50b9393970398908c348",
        name: "General Info Documents",
        dataitems: [
          {
            value: "http://www.africau.edu/images/default/sample.pdf",
            fileSize: 2,
            fileType: "application/pdf",
            due_date: "05/12/2020",
            status: 2,
            id: "5f0f50b9393970398908c349",
            name: "Purchase Items - Part List A",
            type: "file",
            editable: true,
            notes: true,
            required: true,
            special_identifier: false,
          },
          {
            value: "https://picsum.photos/700",
            fileSize: 30,
            fileType: "image/jpeg",
            due_date: "06/12/2020",
            status: 2,
            id: "5f0f50ba393970398908c34a",
            name: "Random Picture Q",
            type: "file",
            editable: true,
            notes: false,
            required: true,
            special_identifier: false,
          },
        ],
      },
      {
        id: "5f0f50ba393970398908c34b",
        name: "Equipment Related Documents",
        dataitems: [
          {
            value: "http://www.africau.edu/images/default/sample.pdf",
            fileSize: 2,
            fileType: "application/pdf",
            due_date: "06/12/2020",
            status: 0,
            id: "5f0f50bb393970398908c34c",
            name: "Sampling and Sub-Sampling Results",
            type: "file",
            editable: true,
            notes: true,
            required: false,
            special_identifier: false,
          },
          {
            value: "https://picsum.photos/800",
            fileSize: 115,
            fileType: "image/jpeg",
            status: 0,
            id: "5f0f50bc393970398908c34d",
            name: "Random Equipment X",
            type: "file",
            editable: false,
            notes: false,
            required: false,
            special_identifier: false,
          },
        ],
      },
    ],
  },
];

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
      showSave: false,
    };

    this.props.route.params && this.props.route.params.id
      ? axios
          .get(util.api_url + "/wp/" + this.props.route.params.id, {
            headers: {
              api_key: util.api_key,
            },
          })
          .then((response) => {
            response.data.push({
              id: "123456",
              name: "users",
              section_data: [],
            });
            this.setState({
              dataSource: response.data,
            });
            this.checkForSaveButton();
          })
      : "";
  }

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
                  <Button
                    mode={"text"}
                    onPress={() => {}}
                    style={styles.saveButton}
                  >
                    Save
                  </Button>
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
    paddingBottom: 20,
    flexDirection: "row",
    alignSelf: "center",
  },
});
