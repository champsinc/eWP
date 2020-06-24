import React from "react";
import { View, FlatList, Platform, StyleSheet } from "react-native";
import AppBar from "../../components/AppBar";
import { GridCard } from "../../components/GridCard";
import axios from "axios";
import DiscussionPanel from "../../components/DiscussionPanel";
import DiscussionView from "../../components/DiscussionView";
import { SubsectionMapper } from "./SubsectionMapper";
import { WarningDialog } from "../action_dialog/ActionDialogs";

let data = [
  {
    key: 1,
    type: "section",
    name: "Details",
    value: [
      {
        type: "sub_section",
        name: "Work Order Info Details",
        value: [
          {
            type: "number",
            name: "Work Order Id",
            value: 12,
            editable: true,
            required: false,
          },
          {
            type: "text",
            name: "Title",
            value: "Fix water system",
            editable: true,
            required: true,
          },
          {
            type: "text",
            name: "Description",
            value:
              "Lorem is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
            editable: false,
            required: false,
            notes: true,
            previousNotes: [],
          },
          {
            type: "date",
            name: "Order Date",
            value: "Mon May 10 2020 12:00:00 GMT-0400 (Eastern Daylight Time)",
            editable: true,
          },
        ],
      },
      {
        type: "sub_section",
        name: "Work Order Time Line Details",
        value: [
          {
            type: "date",
            name: "Order Date",
            value: "Mon May 10 2020 12:00:00 GMT-0400 (Eastern Daylight Time)",
            editable: false,
          },
          {
            type: "date",
            name: "Expected Date of Delivery",
            value: "",
            editable: true,
            required: true,
          },
        ],
      },
    ],
  },
  {
    key: 2,
    type: "section",
    name: "Instructions",
    value: [
      {
        type: "sub_section",
        name: "Abstract list",
        value: [
          {
            type: "selectbox",
            name: "Fruits",
            value: [
              {
                name: "Orange",
                value: "selected",
                type: "selectitem",
              },
              {
                name: "Apple",
                value: "not-selected",
                type: "selectitem",
              },
              {
                name: "Bananas",
                value: "not-selected",
                type: "selectitem",
              },
            ],
            required: true,
            editable: true,
          },
          {
            type: "selectbox",
            name: "Animals",
            value: [
              {
                name: "Cat",
                value: "selected",
                type: "selectitem",
              },
              {
                name: "Lion",
                value: "not-selected",
                type: "selectitem",
              },
              {
                name: "Tiger",
                value: "not-selected",
                type: "selectitem",
              },
            ],
            required: false,
            editable: true,
          },
          {
            type: "selectbox",
            name: "Birds",
            value: [
              {
                name: "Peacock",
                value: "selected",
                type: "selectitem",
              },
              {
                name: "Crow",
                value: "not-selected",
                type: "selectitem",
              },
              {
                name: "Pigeon",
                value: "not-selected",
                type: "selectitem",
              },
            ],
            required: false,
            editable: false,
          },
        ],
      },
      {
        name: "Checklist of things required",
        type: "sub_section",
        value: [
          {
            name:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            value: "checked",
            type: "checkitem",
            required: false,
            editable: false,
          },
          {
            name:
              "Lorem is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
            value: "checked",
            type: "checkitem",
            required: true,
            editable: true,
          },
          {
            name: "Lorem Ipsum is ",
            value: "checked",
            type: "checkitem",
            required: true,
            editable: true,
          },
        ],
      },
    ],
  },
  {
    key: 3,
    type: "section",
    name: "Attachments",
    value: [
      {
        type: "sub_section",
        name: "General Info Documents",
        value: [
          {
            name: "Purchase Items - Part List A",
            value: "http://www.africau.edu/images/default/sample.pdf",
            type: "file",
            editable: true,
            required: true,
            status: 2,
            fileSize: "4KB",
            notes: true,
            fileType: "pdf",
            dueDate: "13 June 2020",
            previousNotes: [],
          },
          {
            name: "Random Picture Q",
            value: "https://picsum.photos/700",
            type: "file",
            editable: true,
            required: true,
            status: 1,
            fileSize: "2MB",
            notes: false,
            fileType: "jpg",
          },
        ],
      },
      {
        type: "sub_section",
        name: "Equipment Related Documents",
        value: [
          {
            name: "Sampling and Sub-Sampling Results",
            value: "http://www.africau.edu/images/default/sample.pdf",
            type: "file",
            editable: true,
            status: 1,
            required: false,
            fileSize: "128KB",
            notes: true,
            fileType: "pdf",
            previousNotes: [],
          },
          {
            name: "Random Equipment X",
            value: "https://picsum.photos/800",
            type: "file",
            editable: false,
            fileSize: "3MB",
            notes: false,
            fileType: "jpg",
          },
        ],
      },
    ],
  },
  {
    key: 4,
    type: "section",
    name: "Parts List",
    value: [],
  },
  {
    key: 5,
    type: "section",
    name: "Tool List",
    value: [],
  },
  {
    key: 6,
    type: "section",
    name: "Route",
    value: [],
  },
  {
    key: 7,
    type: "section",
    name: "Time Entry",
    value: [],
  },
  {
    key: 8,
    type: "section",
    name: "Completion",
    value: [],
  },
  {
    key: 9,
    type: "section",
    name: "Add New",
    value: [],
  },

  {
    key: 10,
    name: "Users",
  },
];

let dataCopy = data;

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
    };
    axios
      .get(
        "http://ganskop.com/proxy/https://rss.itunes.apple.com/api/v1/us/books/top-paid/all/10/explicit.json"
      )
      .then((response) => {
        this.setState({
          dataSource: data,
        });
      });
  }

  toggleNavBar = () => {
    this.props.navigation.openDrawer();
  };

  toggleDiscussionView = () => {
    this.setState({
      showDiscussionView: !this.state.showDiscussionView,
    });
  };

  sectionClicked = (section) => {
    this.setState({
      sectionClicked: true,
      section,
      showDiscussionView: false,
    });
  };

  // this is the ref of the section view that is used to access a varibale to
  // set if the warning dialog should be shown or not
  sectionView;

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

  getSubSectionsData = () => {
    // TODO: Just pass data after making a backend call since retreiving subsection data is done in a separate call
    const section = data.filter((section) => {
      return section.name == this.state.section;
    });
    return section[0].value;
  };

  setDataCopy = (newData) => {
    dataCopy = newData;
  };

  onModalClose = () => {
    this.setState({
      showDialog: false,
    });
  };

  usersClicked = () => {
    this.props.navigation.push("Work Package Users");
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
            {/* <View style={styles.gridCardTopView}>
              {data.map((item, index) => {
                return (
                  <View>
                    <GridCard
                      key={item.name}
                      label={item.name.trim().substring(0, 1).toUpperCase()}
                      icon={
                        "alpha-" +
                        item.name.trim().substring(0, 1).toLowerCase() +
                        "-box-outline"
                      }
                      name={item.name}
                      onPress={this.sectionClicked}
                    />
                    {index == 0 && (
                      <GridCard
                        key={"Users"}
                        label={"U"}
                        icon={"alpha-u-box-outline"}
                        name={"Users"}
                        onPress={this.sectionClicked}
                      />
                    )}
                  </View>
                );
              })}
            </View> */}

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
                    name={item.name}
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
            {/* <View style={styles.gridCardTopView}>
              <GridCard
                key={"Users"}
                label={"U"}
                icon={"alpha-u-box-outline"}
                name={"Users"}
                onPress={this.usersClicked}
              />
            </View> */}
          </View>
        )}
        {this.state.sectionClicked && !this.state.showDiscussionView && (
          <View style={styles.view}>
            <AppBar
              toggleNavBar={this.toggleNavBar}
              subTitle={this.state.section}
              searchPlaceHolder="Search in this work package"
              backButton={true}
              backButtonAction={this.goBackFromSubsectionToSection}
            />
            <SubsectionMapper
              ref={(ref) => (this.sectionView = ref)}
              section={this.state.section}
              subSectionsData={this.getSubSectionsData()}
            />
            <WarningDialog
              showDialog={this.state.showDialog}
              dialogTitle={"Warning!"}
              dialogContent={
                "There are unsaved changes, are you sure you want to go back?"
              }
              dialogClickAwayAction={this.onModalClose}
              yesAction={this.warningYesClicked}
              noAction={this.onModalClose}
            />
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
  gridCardTopView: {
    flex: 1,
    flexGrow: Platform.OS == "web" ? 0.25 : 0.5,
    flexDirection: "column",
    margin: 1,
  },
});
