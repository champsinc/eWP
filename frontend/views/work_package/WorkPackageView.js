import React from "react";
import { View, FlatList, Platform, StyleSheet } from "react-native";
import AppBar from "../../components/AppBar";
import { GridCard } from "../../components/GridCard";
import axios from "axios";
import DiscussionPanel from "../discussion_section/DiscussionPanel";
import { util } from "../../assets/Utility";

let data = [
  {
    key: 1,
    type: "section",
    name: "Details",
    value: [
      {
        type: "sub_section",
        name: "Work Order Info Details",
        dataitems: [
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
        dataitems: [
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
        dataitems: [
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
        dataitems: [
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
        dataitems: [
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
        dataitems: [
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

    axios
      .get(util.api_url + "/wp/5f0f50b9393970398908c334", {
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
    this.setState(
      {
        showDiscussionView: !this.state.showDiscussionView,
      },
      () => {
        this.state.showDiscussionView
          ? this.props.navigation.navigate("discussion_section", {
              ewpNumber: 1234,
            })
          : this.props.navigation.goBack();
      }
    );
  };

  sectionClicked = (section) => {
    this.props.navigation.navigate("section", {
      section,
      sectionId: this.getSectionId(section),
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
  gridCardTopView: {
    flex: 1,
    flexGrow: Platform.OS == "web" ? 0.25 : 0.5,
    flexDirection: "column",
    margin: 1,
  },
});
