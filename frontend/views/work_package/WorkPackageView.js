import React from "react";
import { View, FlatList, Platform, StyleSheet } from "react-native";
import AppBar from "../../components/AppBar";
import { GridCard } from "../../components/GridCard";
import axios from "axios";
import DiscussionPanel from "../../components/DiscussionPanel";
import DiscussionView from "../../components/DiscussionView";
import { SubsectionMapper } from "./SubsectionMapper";
import { WarningDialog } from "../action_dialog/ActionDialogs";
import { util } from "../../assets/Utility";

let data = [
  {
    type: "section",
    Details: [
      {
        type: "sub_section",
        "Work Order Info Details": [
          {
            type: "number",
            "Work Order Id": 12,
            editable: true,
            required: false,
          },
          {
            type: "text",
            Title: "Fix water system",
            editable: true,
            required: true,
          },
          {
            type: "text",
            Description:
              "Lorem is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with",
            editable: false,
            required: false,
            notes: true,
            previousNotes: [],
          },

          {
            type: "date",
            "Order Date":
              "Mon May 10 2020 12:00:00 GMT-0400 (Eastern Daylight Time)",
            editable: true,
          },
        ],
      },
      {
        type: "sub_section",
        "Work Order Time Line Details": [
          {
            type: "date",
            "Order Date":
              "Mon May 10 2020 12:00:00 GMT-0400 (Eastern Daylight Time)",
            editable: false,
          },
          {
            type: "date",
            "Expected Date of Delivery": "",
            editable: true,
            required: true,
          },
        ],
      },
    ],
  },
  {
    type: "section",
    Instructions: [
      {
        type: "sub_section",
        "Abstract list": [
          {
            type: "selectbox",
            Fruits: [
              {
                Orange: "selected",
                type: "selectitem",
              },
              {
                Apple: "not-selected",
                type: "selectitem",
              },
              {
                Bananas: "not-selected",
                type: "selectitem",
              },
            ],
            required: true,
            editable: true,
          },
          {
            type: "selectbox",
            Animals: [
              {
                Cat: "selected",
                type: "selectitem",
              },
              {
                Lion: "not-selected",
                type: "selectitem",
              },
              {
                Tiger: "not-selected",
                type: "selectitem",
              },
            ],
            required: false,
            editable: true,
          },
          {
            type: "selectbox",
            Birds: [
              {
                Peacock: "selected",
                type: "selectitem",
              },
              {
                Crow: "not-selected",
                type: "selectitem",
              },
              {
                Pigeon: "not-selected",
                type: "selectitem",
              },
            ],
            required: false,
            editable: false,
          },
        ],
      },
      {
        "Checklist of things required": [
          {
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.":
              "checked",
            type: "checkitem",
            required: false,
            editable: false,
          },
          {
            "Lorem is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with":
              "checked",
            type: "checkitem",
            required: true,
            editable: true,
          },
          {
            "Lorem Ipsum is ": "checked",
            type: "checkitem",
            required: true,
            editable: true,
          },
        ],
        type: "sub_section",
      },
    ],
  },
  {
    type: "section",
    Attachments: [
      {
        type: "sub_section",
        "General Info Documents": [
          {
            "Purchase Items - Part List A":
              "http://www.africau.edu/images/default/sample.pdf",
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
            "Random Picture Q": "https://picsum.photos/700",
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
        "Equipment Related Documents": [
          {
            "Sampling and Sub-Sampling Results":
              "http://www.africau.edu/images/default/sample.pdf",
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
            "Random Equipment X": "https://picsum.photos/800",
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
    type: "section",
    "Parts List": [],
  },
  {
    type: "section",
    "Tool List": [],
  },
  {
    type: "section",
    Route: [],
  },
  {
    type: "section",
    "Time Entry": [],
  },
  {
    type: "section",
    Completion: [],
  },
  {
    type: "section",
    "Add New": [],
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
      subSectionData: [],
    };

    console.log(this.props.wpId);

    axios
      .get(util.api_url + "/wp/5ef26f1efbbc26166d2fcffe", {
        headers: {
          api_key: util.api_key,
        },
      })
      .then((response) => {
        response.data.push({ id: "123456", name: "users" });
        this.setState({
          dataSource: response.data,
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

  getSectionId = () => {
    return this.state.dataSource.filter((data) => {
      return this.state.section == data.name;
    })[0].id;
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
    this.props.navigation.navigate("work_package_users");
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
              sectionId={this.getSectionId()}
              // subSectionsData={this.state.subSectionData}
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
