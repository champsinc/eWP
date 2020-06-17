// author: nirbhay pherwani | pherwani37@gmail.com  | https://nirbhay.me
import React from "react";
import { View, FlatList, Platform, StyleSheet } from "react-native";
import AppBar from "../../components/AppBar";
import { GridCard } from "../../components/GridCard";
import axios from "axios";
import DiscussionPanel from "../../components/DiscussionPanel";
import DiscussionView from "../../components/DiscussionView";
import { SectionView } from "./SectionView";
import { WarningDialog } from "../action_dialog/ActionDialogs";

let data = [
  {
    key: 1,
    type: "section",
    name: "General",
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
            value: "Lorem Ipsum ...",
            editable: false,
            required: false,
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
    icon: "information",
  },
  {
    key: 2,
    type: "section",
    name: "General-1",
    value: [
      {
        type: "sub_section",
        name: "Permission List",
        value: [
          {
            type: "selectbox",
            name: "fruits",
            value: [
              {
                name: "Allowed",
                value: "selected",
                type: "selectitem",
              },
              {
                name: "Not Allowed",
                value: "not-selected",
                type: "selectitem",
              },
              {
                name: "Not applicable",
                value: "not-selected",
                type: "selectitem",
              },
            ],
            required: true,
            editable: true,
          },
        ],
      },
      {
        name: "Checklist of things required",
        type: "sub_section",
        value: [
          {
            name: "Pipe",
            value: "checked",
            type: "checkitem",
            required: true,
            editable: true,
          },
        ],
      },
    ],
    icon: "information",
  },
  {
    key: 3,
    type: "section",
    name: "General-2",
    value: [],
    icon: "information",
  },
  {
    key: 4,
    type: "section",
    name: "General-3",
    value: [],
    icon: "information",
  },
];

let dataCopy = data;

export class WorkPackageView extends React.Component {
  constructor() {
    super();
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
              renderItem={({ item }) => (
                <View style={styles.gridCardTopView}>
                  <GridCard
                    key={item.key}
                    icon={item.icon}
                    name={item.name}
                    onPress={this.sectionClicked}
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
            <SectionView
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
    flexDirection: "column",
    margin: 1,
  },
});
